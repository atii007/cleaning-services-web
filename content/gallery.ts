import { unsplashBeforeAfter } from '@/content/images'
import type { BeforeAfterItem } from '@/types/content'

/** Before/after results — PLACEHOLDER CONTENT (simulated "before" shots). */
export const BEFORE_AFTER_ITEMS = [
  {
    id: 'villa-kitchen',
    title: 'Villa kitchen deep clean',
    location: 'Khalifa City',
    service: 'deep-cleaning',
    ...unsplashBeforeAfter('1556911220-bff31c812dba', 'Villa kitchen'),
  },
  {
    id: 'master-bathroom',
    title: 'Master bathroom descaling',
    location: 'Al Reem Island',
    service: 'deep-cleaning',
    ...unsplashBeforeAfter('1620626011761-996317b8d101', 'Master bathroom'),
  },
  {
    id: 'open-plan-office',
    title: 'Open-plan office',
    location: 'Downtown',
    service: 'deep-cleaning',
    ...unsplashBeforeAfter('1497366811353-6870744d04b2', 'Open-plan office'),
  },
  {
    id: 'family-lounge',
    title: 'Weekly lounge refresh',
    location: 'Al Raha',
    service: 'maid-services',
    ...unsplashBeforeAfter('1493809842364-78817add7ffb', 'Family lounge'),
  },
  {
    id: 'guest-bedroom',
    title: 'Guest bedroom turnover',
    location: 'Saadiyat',
    service: 'maid-services',
    ...unsplashBeforeAfter('1631049307264-da0ec9d70304', 'Guest bedroom'),
  },
  {
    id: 'apartment-living',
    title: 'Apartment living room',
    location: 'Al Khalidiyah',
    service: 'maid-services',
    ...unsplashBeforeAfter(
      '1505691938895-1758d7feb511',
      'Apartment living room'
    ),
  },
  {
    id: 'restaurant-kitchen',
    title: 'Kitchen pest treatment',
    location: 'Mussafah',
    service: 'pest-control',
    ...unsplashBeforeAfter('1484154218962-a197022b5858', 'Kitchen'),
  },
  {
    id: 'office-corridor',
    title: 'Office corridor treatment',
    location: 'Al Maryah',
    service: 'pest-control',
    ...unsplashBeforeAfter('1497366216548-37526070297c', 'Office corridor'),
  },
] as const satisfies readonly BeforeAfterItem[]
