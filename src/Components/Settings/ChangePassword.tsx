import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  Lock,
  Check,
  X,
  ShieldCheck,
  KeyRound,
  Loader2,
} from "lucide-react";
import { TextField, Label, Input, FieldError, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../../Lib/Schemas/Auth";
import usePatch from "../../Hooks/usePatch";
import { TokenContext } from "../Context/TokenContext";
import { useNavigate } from "react-router";

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const queryClient = useQueryClient()
  const tokenContext = useContext(TokenContext);
  const patchChangePassword = usePatch("/users/change-password");
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const newPasswordValue = watch("newPassword") || "";

  // Password requirements
  const requirements = [
    { label: "At least 8 characters", test: newPasswordValue.length >= 8 },
    {
      label: "One uppercase letter (A-Z)",
      test: /[A-Z]/.test(newPasswordValue),
    },
    {
      label: "One lowercase letter (a-z)",
      test: /[a-z]/.test(newPasswordValue),
    },
    { label: "One number (0-9)", test: /[0-9]/.test(newPasswordValue) },
    {
      label: "One special character (#?!@$%^&*-)",
      test: /[#?!@$%^&*-]/.test(newPasswordValue),
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ChangePasswordFormData) => patchChangePassword(data),
    retry: 2,
    onSuccess: (res) => {
      toast.success((res?.message || "Password changed successfully!") + " You will be redirected to the login page in 2 seconds", {
        duration: 2000,
      });

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        tokenContext?.setToken(null);
        tokenContext?.setUserData(null);
        queryClient.clear();
        navigate("/auth/login")
      }, 2000);

      reset();
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
          "Failed to update password. Please try again.",
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    mutate(data);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-indigo-50/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 shadow-xs">
            <KeyRound size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Change Password
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Keep your account secure by choosing a strong, unique password
              that you do not use on other sites.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
        <TextField
          name="password"
          className="w-full flex flex-col gap-1.5"
          isInvalid={Boolean(errors.password?.message)}
        >
          <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase flex items-center gap-1.5">
            <Lock size={14} className="text-slate-400" />
            Current Password
          </Label>
          <div className="relative flex items-center">
            <Input
              {...register("password")}
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              autoComplete="current-password"
              className="w-full h-11 px-3.5 pr-11 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              aria-label={
                showCurrentPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors focus:outline-none cursor-pointer"
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FieldError className="text-xs text-rose-500 font-medium">
            {errors.password?.message}
          </FieldError>
        </TextField>

        <TextField
          name="newPassword"
          className="w-full flex flex-col gap-1.5"
          isInvalid={Boolean(errors.newPassword?.message)}
        >
          <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-slate-400" />
            New Password
          </Label>
          <div className="relative flex items-center">
            <Input
              {...register("newPassword")}
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              autoComplete="new-password"
              className="w-full h-11 px-3.5 pr-11 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              aria-label={
                showNewPassword ? "Hide new password" : "Show new password"
              }
              className="absolute right-3 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors focus:outline-none cursor-pointer"
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FieldError className="text-xs text-rose-500 font-medium">
            {errors.newPassword?.message}
          </FieldError>
        </TextField>

        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
            Password Requirements
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {requirements.map((req, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 text-xs font-medium transition-colors ${req.test ? "text-emerald-600" : "text-slate-500"
                  }`}
              >
                <div
                  className={`size-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${req.test
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-slate-200 text-slate-400"
                    }`}
                >
                  {req.test ? (
                    <Check size={11} strokeWidth={3} />
                  ) : (
                    <X size={10} />
                  )}
                </div>
                <span>{req.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="ghost"
            onClick={() => reset()}
            isDisabled={isPending}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </Button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Lock size={16} />
                <span>Update Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
