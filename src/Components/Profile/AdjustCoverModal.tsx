import { useState, useCallback, useContext } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import { Loader2, X, ZoomIn, RotateCcw } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePut from '../../Hooks/usePut';
import toast from 'react-hot-toast';
import { TokenContext } from '../Context/TokenContext';
import { getCroppedImg } from '../../Lib/cropImage';

interface AdjustCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  originalFile: File;
}

export default function AdjustCoverModal({
  isOpen,
  onClose,
  imageSrc,
  originalFile,
}: AdjustCoverModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const queryClient = useQueryClient();
  const tokenContext = useContext(TokenContext);

  const uploadCover = usePut('/users/upload-cover');

  const onCropComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const croppedFile = croppedAreaPixels
        ? await getCroppedImg(imageSrc, croppedAreaPixels, 'cover.jpg')
        : originalFile;

      const formData = new FormData();
      formData.append('cover', croppedFile);

      return await uploadCover(formData);
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Cover photo updated successfully!');

      try {
        const saved = localStorage.getItem('userData');
        if (saved) {
          const user = JSON.parse(saved);
          if (data?.user?.cover) {
            user.cover = data.user.cover;
            localStorage.setItem('userData', JSON.stringify(user));
            tokenContext?.setUserData(user);
          }
        }
      } catch (err) {
        console.error(err);
      }

      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });

      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update cover photo');
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-7 flex flex-col gap-5 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Adjust Cover Photo
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag to reposition and zoom to frame your banner.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={3 / 1}
            cropShape="rect"
            showGrid={true}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className="flex flex-col gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <ZoomIn size={14} className="text-slate-500" />
              <span>Zoom</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-indigo-600 font-bold">{zoom.toFixed(1)}x</span>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-700 cursor-pointer"
                title="Reset crop"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => mutate()}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-70 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            <span>Save Cover</span>
          </button>
        </div>
      </div>
    </div>
  );
}
