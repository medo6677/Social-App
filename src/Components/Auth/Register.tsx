import { useState } from "react";
import {
  TextField,
  Label,
  Input,

  FieldError,
  Button,
  Select,
  ListBox,
  Spinner,
} from "@heroui/react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../../Lib/Schemas/Auth";

import toast from "react-hot-toast";
import axios from "axios";
import { registerApi } from "../../Services/Auth.service";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

export default function Register() {
  useDocumentTitle('Register');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()
  const { register, handleSubmit, control, formState: { isSubmitting, errors } } = useForm<RegisterFormData>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      rePassword: ""
    }
  })


  async function handleUserData(data: RegisterFormData) {
    try {
      const response = await registerApi(data);
      toast.success(response.message);
      setTimeout(() => {
        navigate("/auth/login")
      }, 500)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || error.message
        );
      }
    }
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 font-['Poppins',sans-serif]">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Create account
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Join SocialSphere to connect with friends and community.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(handleUserData)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <TextField isInvalid={Boolean(errors.name?.message)} name="name" className="w-full flex flex-col gap-1.5">
            <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Full Name</Label>
            <Input
              {...register("name")}
              placeholder="John Doe"
              autoComplete="name"
              className="w-full h-10.5 px-3.5 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
            <FieldError className="text-xs text-rose-500 font-medium">
              {errors.name?.message}
            </FieldError>
          </TextField>

          <TextField name="username" className="w-full flex flex-col gap-1.5" isInvalid={Boolean(errors.username?.message)}>
            <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Username</Label>
            <Input
              {...register("username")}
              placeholder="johndoe"
              autoComplete="username"
              className="w-full h-10.5 px-3.5 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
            <FieldError className="text-xs text-rose-500 font-medium">
              {errors.username?.message}
            </FieldError>
          </TextField>
        </div>

        <TextField name="email" type="email" className="w-full flex flex-col gap-1.5" isInvalid={Boolean(errors.email?.message)}>
          <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Email Address</Label>
          <Input
            {...register("email")}
            placeholder="name@example.com"
            autoComplete="email"
            className="w-full h-10.5 px-3.5 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
          />
          <FieldError className="text-xs text-rose-500 font-medium">
            {errors.email?.message}
          </FieldError>
        </TextField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
          <Controller
            control={control}
            name="gender"
            render={({ field }) => {
              return <div className="w-full flex flex-col gap-1.5">
                <Select {...field} className="w-full flex flex-col gap-1.5" isInvalid={Boolean(errors.gender?.message)}>
                  <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Gender</Label>
                  <Select.Trigger className="w-full h-10.5 flex items-center justify-between px-3.5 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 cursor-pointer">
                    <Select.Value />
                    <Select.Indicator className="w-4 h-4 text-slate-400" />
                  </Select.Trigger>
                  <Select.Popover className="bg-white border border-slate-200 rounded-xl shadow-xl p-1 w-(--trigger-width) z-50">
                    <ListBox className="outline-none">
                      <ListBox.Item id="male" textValue="Male" className="px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer outline-none transition-colors">
                        Male
                      </ListBox.Item>
                      <ListBox.Item id="female" textValue="Female" className="px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer outline-none transition-colors">
                        Female
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.gender?.message && (
                  <span className="text-xs text-rose-500 font-medium">{errors.gender.message}</span>
                )}
              </div>
            }}
          />

          <TextField name="date" className="w-full flex flex-col gap-1.5" isInvalid={Boolean(errors.dateOfBirth?.message)}>
            <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Date of Birth</Label>
            <Input
              {...register("dateOfBirth")}
              type="date"
              autoComplete="birthdate"
              className="date-input w-full h-10.5 px-3.5 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800"
            />
            <FieldError className="text-xs text-rose-500 font-medium">
              {errors.dateOfBirth?.message}
            </FieldError>
          </TextField>
        </div>

        <TextField name="password" className="w-full flex flex-col gap-1.5" isInvalid={Boolean(errors.password?.message)}>
          <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Password</Label>
          <div className="relative flex items-center">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full h-10.5 px-3.5 pr-11 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FieldError className="text-xs text-rose-500 font-medium">
            {errors.password?.message}
          </FieldError>
        </TextField>

        <TextField name="rePassword" className="w-full flex flex-col gap-1.5" isInvalid={Boolean(errors.rePassword?.message)}>
          <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Confirm Password</Label>
          <div className="relative flex items-center">
            <Input
              {...register("rePassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full h-10.5 px-3.5 pr-11 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors focus:outline-none cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FieldError className="text-xs text-rose-500 font-medium">
            {errors.rePassword?.message}
          </FieldError>
        </TextField>

        <Button
          isPending={isSubmitting}
          type="submit"
          className="w-full h-12 bg-linear-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white font-medium text-sm rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer mt-2"
        >
          {isSubmitting ? <><Spinner className="text-white" /> Creating your Account...</> : "Create Account"}
        </Button>
      </form>

      <div className="mt-5 pt-5 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
