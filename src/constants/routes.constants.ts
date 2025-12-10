export const PATHNAME_HEADER = 'x-pathname';

export const PUBLIC_PAGES_URLS = {
  HOME: '/',
  QUESTS: '/quests',
  LEADERBOARD: '/leaderboard',
  LEARN: '/learn',
};

export const PUBLIC_PAGES_URLS_ARRAY = Object.values(PUBLIC_PAGES_URLS);

export const PROTECTED_PAGES_URLS = {
  DASHBOARD: '/dashboard',
  CREATE_QUEST: '/quests/new',
  PROFILE: '/profile',
  PROFILE_REWARDS: '/profile/rewards',
  PROFILE_ACTIVITY: '/profile/activity',
  DISCONNECT: '/disconnect',
};

export const PROTECTED_PAGES_URLS_ARRAY = Object.values(PROTECTED_PAGES_URLS);

export const AUTH_PAGES_URLS = {
  LOGIN: '/log-in',
  SIGN_UP: '/sign-up',
};

export const AUTH_PAGES_URLS_ARRAY = Object.values(AUTH_PAGES_URLS);
