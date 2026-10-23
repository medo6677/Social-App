import { useUploadProgress } from '../../Context/ProgressContext';

export default function TopProgressBar() {
  const progressState = useUploadProgress();

  if (!progressState) return null;

  const { progress, isProgressing } = progressState;
  const isVisible = isProgressing || progress > 0;

  if (!isVisible) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[9999] h-1 w-full bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative shadow-[0_0_12px_rgba(99,102,241,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[2px] opacity-80" />
      </div>
    </div>
  );
}
