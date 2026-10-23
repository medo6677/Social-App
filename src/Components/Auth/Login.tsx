import { useContext, useState } from "react";
import { TextField, Label, Input, FieldError, Button, Spinner } from "@heroui/react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../Lib/Schemas/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "../../Services/Auth.service";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { TokenContext } from "../Context/TokenContext";
import { useNavigate } from "react-router";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

export default function Login() {
  useDocumentTitle('Login');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const tokenContext = useContext(TokenContext);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema)
    ,
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function handelLogin(data: LoginFormData) {
    try {
      const response = await loginApi(data);
      toast.success(response.message);
      localStorage.setItem("token", response.data.token)
      tokenContext?.setToken(response.data.token)
      tokenContext?.setUserData(response.data.user)
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      setTimeout(() => {
        navigate("/")
      }, 1000)

    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Something went wrong");
      }
    }
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 font-['Poppins',sans-serif]">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Please enter your credentials to access your account.
        </p>
      </div>

      <form noValidate onSubmit={handleSubmit(handelLogin)} className="space-y-5">
        <TextField name="email" type="email" isRequired className="w-full flex flex-col gap-1.5" isInvalid={Boolean(errors.email?.message)}>
          <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Email Address</Label>
          <Input
            {...register("email")}
            placeholder="name@example.com"
            autoComplete="email"
            className="w-full h-11 px-4 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
          />
          <FieldError className="text-xs text-rose-500 font-medium">
            {errors.email?.message}
          </FieldError>
        </TextField>

        <TextField name="password" isRequired className="w-full flex flex-col gap-1.5" isInvalid={Boolean(errors.password?.message)}>
          <div className="flex items-center justify-between">
            <Label className="text-slate-700 font-semibold text-xs tracking-wide uppercase">Password</Label>
          </div>
          <div className="relative flex items-center">
            <Input
              type={isVisible ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              {...register("password")}
              className="w-full h-11 px-4 pr-11 text-sm bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 rounded-xl outline-none transition-all text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors focus:outline-none cursor-pointer"
            >
              {isVisible ?
                <EyeOff size={16} />
                :
                <Eye size={16} />
              }
            </button>
          </div>
          <FieldError className="text-xs text-rose-500 font-medium">
            {errors.password?.message}
          </FieldError>
        </TextField>

        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="w-full h-12 bg-linear-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white font-medium text-sm rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer mt-2"
        >
          {isSubmitting ? <>
            <Spinner size="md" /> loading...
          </> : "Sign In"}
        </Button>
      </form>

      <div className="mt-5 pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
