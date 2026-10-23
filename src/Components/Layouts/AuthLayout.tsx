import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex font-['Poppins',sans-serif] bg-slate-50 text-slate-800">
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 flex-col justify-between text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-2xl shadow-inner border border-white/30">
            S
          </div>
          <span className="text-2xl font-bold tracking-tight">SocialSphere</span>
        </div>

        <div className="relative z-10 max-w-md space-y-4">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight">
            Connect, share, and inspire every day.
          </h1>
          <p className="text-lg text-white/80 font-normal leading-relaxed">
            Join millions of creators and friends sharing moments, stories, and ideas across the globe.
          </p>
        </div>

        <div className="relative z-10 text-sm text-white/60">
          © {new Date().getFullYear()} SocialSphere Inc. All rights reserved.
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
