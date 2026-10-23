import { useState } from 'react';
import { Button } from '@heroui/react';
import { Bookmark, FileText, Rss, Users } from 'lucide-react';
import type { FeedFilter, SidebarItem } from '../../Types';
export type { FeedFilter };

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'feed', label: 'Feed', icon: Rss },
  { id: 'my-posts', label: 'My Posts', icon: FileText },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'saved', label: 'Saved', icon: Bookmark },
];

export default function FeedSidebar() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('feed');

  return (
    <aside className="bg-white rounded-2xl border border-slate-100 p-2 flex flex-col gap-1">
      {SIDEBAR_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeFilter === item.id;

        return (
          <Button
            key={item.id}
            onPress={() => setActiveFilter(item.id)}
            className={`w-full justify-start h-11 px-3.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              isActive
                ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-xs'
                : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </Button>
        );
      })}
    </aside>
  );
}
