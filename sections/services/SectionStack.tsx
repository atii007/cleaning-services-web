import * as React from 'react'

export type StackSection = {
  key: string
  render: (className: string | undefined) => React.ReactNode
}

/**
 * Renders optional page sections in order and alternates their backgrounds
 * over whichever ones are present. Pass `null` for a section with no data.
 */
export const SectionStack = ({
  sections,
}: {
  sections: (StackSection | null)[]
}) => {
  const present = sections.filter(
    (section): section is StackSection => section !== null
  )
  return present.map((section, index) => (
    <React.Fragment key={section.key}>
      {section.render(index % 2 === 1 ? 'bg-surface' : undefined)}
    </React.Fragment>
  ))
}
