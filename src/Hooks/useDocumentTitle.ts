import { useEffect } from 'react';

export default function useDocumentTitle(title?: string) {
  useEffect(() => {
    const baseTitle = 'SocialPulse';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} — Connect, Share & Inspire`;
  }, [title]);
}
