import type { Icon } from '../types/Mdi';
import type { Navigation } from '../types/Translations';

type WebPath = {
  title: keyof Navigation;
  href: string;
  icon: Icon;
  navPos: 'top' | 'bottom';
  enabled: boolean;
  external: boolean;
  permissions: string[];
  customs: Record<string, any>;
  children: WebPath[];
};

export const webPaths: Array<WebPath> = [
  {
    title: 'home',
    href: '/',
    icon: 'mdiHome',
    navPos: 'top',
    enabled: true,
    external: false,
    permissions: [],
    customs: {},
    children: [],
  },
  {
    title: 'settings',
    href: '/settings',
    icon: 'mdiCog',
    navPos: 'top',
    enabled: true,
    external: false,
    permissions: [],
    customs: {},
    children: [],
  },
] as const;
