import { PROTECTED_PAGES_URLS, PUBLIC_PAGES_URLS } from './routes.constants';

export const HEADER_NAV_ITEMS = [
  {
    href: PUBLIC_PAGES_URLS.QUESTS,
    label: 'Explore Quests',
  },
  {
    href: PROTECTED_PAGES_URLS.CREATE_QUEST,
    label: 'Create Quest',
  },
];
