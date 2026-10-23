import { Button, Modal } from '@heroui/react';
import { X, ExternalLink, Download } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  alt?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageUrl,
  alt = 'Image preview',
}: ImageModalProps) {
  if (!imageUrl) return null;

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        isDismissable
        variant="blur"
        className="bg-black/85"
      >
        <Modal.Container placement="center" className="p-3 sm:p-6">
          <Modal.Dialog
            aria-label={alt}
            className="w-auto max-w-[95vw] border-none bg-transparent p-0 shadow-none outline-none sm:max-w-[95vw]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 shadow-2xl sm:rounded-3xl">
              <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open original image"
                  title="Open in new tab"
                  className="rounded-xl bg-black/60 p-2 text-white shadow-md backdrop-blur-md transition-colors hover:bg-black/80"
                >
                  <ExternalLink size={16} />
                </a>

                <a
                  href={imageUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download image"
                  title="Download image"
                  className="rounded-xl bg-black/60 p-2 text-white shadow-md backdrop-blur-md transition-colors hover:bg-black/80"
                >
                  <Download size={16} />
                </a>

                <Button
                  isIconOnly
                  size="sm"
                  aria-label="Close image preview"
                  onPress={onClose}
                  className="rounded-xl bg-black/60 text-white backdrop-blur-md hover:bg-rose-600"
                >
                  <X size={18} />
                </Button>
              </div>

              <img
                src={imageUrl}
                alt={alt}
                draggable={false}
                className="block h-auto max-h-[85vh] w-auto max-w-[95vw] select-none object-contain"
              />
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
