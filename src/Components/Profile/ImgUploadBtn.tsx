import { Camera } from 'lucide-react';
import React, { useState, useRef } from 'react';
import AdjustProfilePhotoModal from './AdjustProfilePhotoModal';

export default function ImgUploadBtn() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <label
        aria-label="Change profile photo"
        className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full ring-2 ring-white shadow-md transition-all cursor-pointer flex items-center justify-center active:scale-95"
      >
        <Camera size={14} />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {isModalOpen && selectedFile && (
        <AdjustProfilePhotoModal
          isOpen={isModalOpen}
          onClose={handleClose}
          imageSrc={previewUrl}
          originalFile={selectedFile}
        />
      )}
    </>
  );
}
