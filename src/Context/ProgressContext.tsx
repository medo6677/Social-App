import { createContext, useContext, useState, useRef, type ReactNode } from 'react';

export interface ProgressContextType {
  progress: number;
  isProgressing: boolean;
  startProgress: () => void;
  updateProgress: (loaded: number, total?: number) => void;
  finishProgress: () => void;
}

export const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressContextProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<number>(0);
  const [isProgressing, setIsProgressing] = useState<boolean>(false);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startProgress = () => {
    if (finishTimeoutRef.current) {
      clearTimeout(finishTimeoutRef.current);
    }
    setIsProgressing(true);
    setProgress(20);
  };

  const updateProgress = (loaded: number, total?: number) => {
    if (total && total > 0) {
      const percent = Math.min(95, Math.max(20, Math.round((loaded * 100) / total)));
      setProgress(percent);
    } else {
      setProgress((prev) => Math.min(85, prev + 15));
    }
  };

  const finishProgress = () => {
    setProgress(100);
    finishTimeoutRef.current = setTimeout(() => {
      setIsProgressing(false);
      setProgress(0);
    }, 450);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isProgressing,
        startProgress,
        updateProgress,
        finishProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useUploadProgress() {
  return useContext(ProgressContext);
}
