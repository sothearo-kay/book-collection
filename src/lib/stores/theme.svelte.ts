export type Theme = 'light' | 'dark' | 'system';
export const theme = $state<{ value: Theme }>({ value: 'system' });
