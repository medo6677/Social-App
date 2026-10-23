import React, { useState, useRef, useContext } from 'react';
import { Camera, Trash2, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AdjustCoverModal from './AdjustCoverModal';
import useDelete from '../../Hooks/useDelete';
import { TokenContext } from '../Context/TokenContext';

interface CoverUploadProps {
  cover?: string;
  hasCover?: boolean;
}

export default function CoverUpload({ cover, hasCover }: CoverUploadProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tokenContext = useContext(TokenContext);
  const queryClient = useQueryClient();
  const deleteCoverApi = useDelete('/users/cover');

  const profileQuery = queryClient.getQueriesData<any>({ queryKey: ['userProfile'] });
  const queryData = profileQuery?.[0]?.[1];
  const queryCover = queryData?.data?.user?.cover || queryData?.cover;

  const localUserData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userHasCover =
    hasCover ?? Boolean(cover || queryCover || tokenContext?.userData?.cover || localUserData?.cover);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsModalOpen(true);
    }
    e.target.value = '';
  };

  const handleClose = () => {
    setIsModalOpen(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    setSelectedFile(null);
  };

  const { mutate: deleteCover, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteCoverApi(),
    onSuccess: (data) => {
      toast.success(data?.message || 'Cover photo deleted successfully!');
      try {
        const saved = localStorage.getItem('userData');
        if (saved) {
          const user = JSON.parse(saved);
          delete user.cover;
          localStorage.setItem('userData', JSON.stringify(user));
          tokenContext?.setUserData(user);
        }
      } catch (err) {
        console.error(err);
      }

      // Clear cover in cache
      queryClient.setQueriesData({ queryKey: ['userProfile'] }, (old: any) => {
        if (!old) return old;
        if (old?.data?.user) {
          return {
            ...old,
            data: {
              ...old.data,
              user: {
                ...old.data.user,
                cover: undefined,
              },
            },
          };
        }
        return {
          ...old,
          cover: undefined,
        };
      });

      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to delete cover photo');
    },
  });

  return (
    <>
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <label
          aria-label="Change cover photo"
          className="bg-white/60 hover:bg-white text-slate-800 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all duration-200 cursor-pointer select-none active:scale-95"
        >
          <Camera size={14} className="text-slate-700" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <span>Change Cover</span>
        </label>

        {userHasCover && (
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => deleteCover()}
            aria-label="Delete cover photo"
            className="bg-white/60 hover:bg-rose-50 text-rose-600 hover:text-rose-700 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all duration-200 cursor-pointer select-none active:scale-95 disabled:opacity-60"
            title="Delete cover photo"
          >
            {isDeleting ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Trash2 size={13} />
            )}
            <span className="hidden sm:inline">Delete Cover</span>
          </button>
        )}
      </div>

      {isModalOpen && selectedFile && (
        <AdjustCoverModal
          isOpen={isModalOpen}
          onClose={handleClose}
          imageSrc={previewUrl}
          originalFile={selectedFile}
        />
      )}
    </>
  );
}
