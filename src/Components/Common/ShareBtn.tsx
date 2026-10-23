import { useState } from 'react';
import { Button } from '@heroui/react';
import { Share2 } from 'lucide-react';
import type { PostCardI, User } from '../../Types/api.type';
import ShareModal from '../Feed/ShareModal';

interface ShareBtnProps {
  post: PostCardI;
  className?: string;
  hideText?: boolean;
  userData: User;
  iconSize?: number;
}

export default function ShareBtn({
  post,
  className,
  hideText = false,
  userData,
  iconSize = 16,
}: ShareBtnProps) {
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setIsShareOpen(true)}
        variant="ghost"
        size="sm"
        className={
          className ??
          'flex-1 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 gap-2 text-xs font-medium rounded-xl h-9 cursor-pointer'
        }
      >
        <Share2 size={iconSize} />
        {!hideText && <span>Share</span>}
      </Button>

      <ShareModal
      userData={userData}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        post={post}
      />
    </>
  );
}
