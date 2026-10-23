import { Spinner } from "@heroui/react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16 absolute top-3 right-1/2  ">
      <Spinner size="lg" color="current" />
    </div>
  );
}
