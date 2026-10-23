import { Button } from "@heroui/react";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorMessage({
    message = "Something went wrong. Please try again.",
    onRetry,
}: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="text-red-500" size={28} />
            </div>

            <div>
                <h3 className="text-base font-bold text-slate-800">
                    Oops! Something went wrong
                </h3>
                <p className="mt-1 text-sm text-slate-500">{message}</p>
            </div>

            {onRetry && (
                <Button
                    onPress={() => onRetry()}
                    className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"


                >
                    Try again
                </Button>
            )}
        </div>
    );
}
