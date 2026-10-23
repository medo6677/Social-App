import type { LucideIcon } from 'lucide-react';

export type FeedFilter = 'feed' | 'my-posts' | 'community' | 'saved';

export interface SidebarItem {
  id: FeedFilter;
  label: string;
  icon: LucideIcon;
}
