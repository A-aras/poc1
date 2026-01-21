import { z } from 'zod';

/**
 * Card interface that all applications must implement
 * Each application exposes cards through this interface
 */
export const CardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  appName: z.string(),
  order: z.number().default(0),
  metadata: z.record(z.any()).optional(),
});

export type Card = z.infer<typeof CardSchema>;

export const CardsResponseSchema = z.object({
  cards: z.array(CardSchema),
});

export type CardsResponse = z.infer<typeof CardsResponseSchema>;

/**
 * Application interface that all micro-apps must implement
 */
export interface IMicroApp {
  name: string;
  version: string;
  getCards(): Promise<Card[]>;
  bootstrap(element: HTMLElement): void;
}

/**
 * Navigation item for left sidebar
 */
export const NavigationItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  path: z.string(),
  children: z.array(z.lazy(() => NavigationItemSchema)).optional(),
});

export type NavigationItem = z.infer<typeof NavigationItemSchema>;

/**
 * Tab interface for tabbed layout
 */
export interface TabItem {
  id: string;
  label: string;
  appName?: string;
  type: 'dashboard' | 'app';
  isDashboard?: boolean;
}

/**
 * Application state interfaces
 */
export interface ApplicationState {
  appName: string;
  isLoading: boolean;
  error: string | null;
}

export interface DashboardState {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
  selectedCard: Card | null;
}

export interface TabsState {
  tabs: TabItem[];
  activeTabId: string;
}

export interface NavigationState {
  items: NavigationItem[];
  selectedItemId: string | null;
}

/**
 * Global app state
 */
export interface RootState {
  dashboard: DashboardState;
  tabs: TabsState;
  navigation: NavigationState;
  [key: string]: any;
}
