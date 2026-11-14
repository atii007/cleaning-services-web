# Phase 6: Email option on Contact, spam protection, chat assistant

**Status:** Done (2026-11-15). Branch: `feat/phase-06-enquiries-chat`.

## Context

Since Phase 2, enquiry forms validate and then open WhatsApp with a pre-filled message. WhatsApp is the primary contact channel. Phase 6 adds email as an **opt-in channel on the Contact page only**, protects it against spam, and adds a guided chat assistant that answers common questions and hands off to WhatsApp.

**Decisions (confirmed in chat)**

- **Email only on `/contact`.** The form there lets the visitor choose "Send on WhatsApp" or "Send by email". Every other form stays WhatsApp-only.
- **The floating WhatsApp button stays on every page, unchanged.** It remains the primary contact button.
- **Nodemailer (SMTP)** sends the email. It is free and works with any mailbox.
- **Spam protection uses invisible checks only:**
  - a honeypot field
  - a minimum fill time
  - server-side re-validation
  - a per-IP rate limit

  There is no third-party CAPTCHA.

- **Chat assistant:** a guided quick-reply chat with no AI, opened from a small secondary button stacked above the WhatsApp button. Every answer ends with a WhatsApp handoff.

## Plan

### 1. Email option on the Contact form

- **`EnquiryForm` gains `allowEmail`.** Only `/contact` passes it, and only when SMTP is configured on the server (`isEmailConfigured()`). With no settings, the Contact form is WhatsApp-only, so visitors never see a fake success.
- **New optional `email` field** (used as the reply-to address). It is shown only when email is allowed.
- **Two buttons:**
  - "Send on WhatsApp" (primary, green)
  - "Send by email" (secondary)
- **Outcomes:**
  - On success, show an inline confirmation with a "Also chat on WhatsApp" link.
  - On failure, show an error with a one-tap "Send on WhatsApp instead", so the enquiry is never lost.

### 2. Server side

- **New dependencies:** `nodemailer` and `@types/nodemailer` (dev).
- **`lib/env.ts`** gets optional server-only variables:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` and `CONTACT_FORM_RECIPIENT`
  - all must be set, or none, and the build fails on a partial set
  - documented in `.env.example`
- **`lib/mail.ts`** (`server-only`): creates the transport and builds the email (plain text plus escaped HTML).
- **`actions/enquiry.ts`** (`'use server'`), a new folder that is added to the folder map:
  - re-validates the input with the shared Zod schema
  - runs the spam checks
  - sends the email
  - returns `{ status: 'sent' | 'error', message? }`
- **Email subject:** "New enquiry: {service} – {name}". The body includes the page it was sent from.

### 3. Spam checks (email path only)

- **Honeypot field:** visually hidden, `tabIndex={-1}`, `autoComplete="off"`. When it is filled, the action returns a success response but sends nothing.
- **Minimum fill time:** 3 seconds from render to submit.
- **Per-IP rate limit:** an in-memory sliding window of 5 per 10 minutes. On Vercel this applies per server instance, which is documented as a known limitation.

### 4. Chat assistant

- **`ChatAssistant`** (client): a small launcher above the WhatsApp button, which opens a panel labelled for screen readers.
- **Topics** come from `content/chat.ts`. The answers are derived from existing content:

  | Topic            | Shows                                            |
  | ---------------- | ------------------------------------------------ |
  | Our services     | Each service, its starting price and a page link |
  | Prices           | Starting prices                                  |
  | Areas we cover   | The number of areas and a link                   |
  | Common questions | The contact FAQs                                 |
  | Talk to a person | WhatsApp or call                                 |

- **Handoff:** every answer ends with a WhatsApp button whose message names the topic.
- **Privacy:** no data is collected and there is no AI. The conversation exists only in the browser.
- **Accessibility:**
  - Esc closes the panel, and focus moves into it and back to the launcher.
  - New answers are announced to screen readers.
  - Animations respect reduced motion.
  - The layout works from 360px.

### 5. Docs

- `docs/CONTENT-GUIDE.md`: the chat content and the email setup.
- `README.md` and `.env.example`: the new settings.
- `docs/CODE-BEST-PRACTICES.md`: add `actions/` to the folder map.

## Verification

1. Run `yarn check` and `yarn build`.
2. **Without SMTP settings:** the Contact form has no email button and the other forms are unchanged.
3. **With an Ethereal test mailbox:**
   - an email arrives with the right fields and reply-to address
   - the honeypot, fill-time and rate-limit checks work
   - a broken SMTP setting shows the WhatsApp fallback
4. **Headless Chrome at 360px and 1440px:**
   - the chat opens and every topic works using only the keyboard
   - the WhatsApp links carry the right message
   - nothing overflows and the console is clean
5. **Dev mode:** the console is clean, including on client navigations.

## Outcome

### Delivered

- **Email option on `/contact` only.**
  - `EnquiryForm` and `EnquirySection` gained `allowEmail`. The Contact page passes `isEmailConfigured()`, so without SMTP settings the form stays WhatsApp-only, as on every other page.
  - With email on, the form adds an optional Email field (used as reply-to) and two buttons: "Send on WhatsApp" (primary) and "Send by email".
  - Outcomes:
    - success shows a confirmation panel with a WhatsApp link
    - failure shows an alert with "Send on WhatsApp instead", which re-uses the typed values
- **Server side:**
  - `actions/enquiry.ts` is the Server Action. It re-validates both Zod schemas (`enquirySchema` and the new `enquirySpamSchema`).
  - `lib/mail.ts` (`server-only`) sends through Nodemailer with plain-text and escaped HTML versions. The subject has its line breaks removed, and the email shows the page it was sent from.
  - `lib/env.ts` validates the optional SMTP variables, all or none. A partial set fails the build with a list of what is missing.
- **Spam protection** (email path only):
  - honeypot (bots get a success response and nothing is sent)
  - 3-second minimum fill time
  - in-memory per-IP rate limit, 5 per 10 minutes (`lib/rate-limit.ts`)
- **Chat assistant:**
  - `components/shared/chat/ChatAssistant` (server) passes a small data snapshot to `ChatPanel` (client).
  - A small launcher sits above the unchanged floating WhatsApp button on every page.
  - The panel is a non-modal dialog with WhatsApp pinned at the top. Topics come from `content/chat.ts`: services, prices, areas, FAQs (as follow-up questions) and "Talk to a person".
  - Every answer has a "Continue on WhatsApp" handoff with a topic-specific message.
  - Accessibility: Esc and the close button return focus to the launcher, focus moves to the new quick replies after each choice, and answers are in a live log.
- **Docs:**
  - README: an environment variables table, plus a note to redeploy after setting the SMTP variables
  - `.env.example`
  - `docs/CONTENT-GUIDE.md`: email option and chat assistant sections
  - folder map: `actions/`
- **Verified:**
  - `yarn check` and `yarn build` pass.
  - Without SMTP settings, there is no email button or honeypot anywhere.
  - With a local SMTP sink, the email option appears only on `/contact`, and:
    - a valid send arrives with the correct from, to, reply-to and subject, and with the HTML escaped
    - the honeypot shows success but sends nothing
    - a submit after about 1.6 s is rejected
    - the 6th send within the window is rate-limited
    - with SMTP down, the visitor sees the WhatsApp fallback and the server logs the error
  - Headless Chrome at 360px and 1440px, keyboard only: every chat topic answers correctly with the right WhatsApp links, Esc closes and restores focus, nothing overflows and the console is clean.
  - Dev mode (`:3000`): a clean console on page loads, client navigations and the chat flow.

### Changes from the plan

- **The footer's bottom padding on mobile** grew (`pb-24` to `pb-36`), so the stacked chat and WhatsApp buttons never cover the legal links.
- **Chat focus management:** after a quick reply is chosen, focus moves to the new options, because the chosen button can disappear. Testing found this.
- **Fill-time start:** the timer starts after mount (`useEffect`), not during render, so prerendering never reads the clock.

### Still open

- **Rate limit:** it is per server instance on Vercel. If spam gets through, move it to a shared store (for example Upstash Redis).
- **Real mail account:** set the SMTP variables on Vercel (Gmail needs an app password), then redeploy so the prerendered Contact page shows the email button.
- **Deliverability:** a sending domain with SPF and DKIM improves it. With Gmail SMTP, set `MAIL_FROM` to the same Gmail address.
