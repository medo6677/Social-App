import { Link, useNavigate } from "react-router";
import { ArrowLeft, Home, Compass, Sparkles, User, Settings as SettingsIcon } from "lucide-react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

export default function Notfound() {
  useDocumentTitle("404 - Page Not Found");
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col justify-between overflow-hidden font-['Poppins',sans-serif] selection:bg-indigo-500 selection:text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-indigo-500/15 to-violet-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top minimal bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Social<span className="text-indigo-600">Pulse</span>
          </span>
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white/80 hover:bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft size={14} />
          Go Back
        </button>
      </header>

      {/* Main hero card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl text-center flex flex-col items-center">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold mb-6 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span>Error 404 • Lost in Cyberspace</span>
          </div>

          {/* Large Stylized 404 text */}
          <div className="relative mb-2 select-none">
            <h1 className="text-8xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-indigo-600 via-indigo-500 to-violet-700 bg-clip-text text-transparent drop-shadow-sm">
              404
            </h1>
            <div className="absolute -top-3 -right-3 sm:-right-5 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center text-indigo-600 rotate-12 hover:rotate-0 transition-transform">
              <Compass size={24} className="animate-[spin_10s_linear_infinite]" />
            </div>
          </div>

          {/* Title & Description */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Oops! Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
            The link you clicked might be broken, or the post/page may have been moved, deleted, or never existed in the first place.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center mb-10">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Home size={17} />
              <span>Back to Feed</span>
            </Link>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold text-sm shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <ArrowLeft size={17} />
              <span>Previous Page</span>
            </button>
          </div>

          {/* Quick Destination Pill Cards */}
          <div className="w-full max-w-md p-4 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/70 shadow-xs">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Helpful Destinations
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Link
                to="/feed"
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-600 text-xs font-medium transition-colors"
              >
                <Compass size={18} className="text-indigo-500" />
                <span>Feed</span>
              </Link>
              <Link
                to="/profile"
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-600 text-xs font-medium transition-colors"
              >
                <User size={18} className="text-violet-500" />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl hover:bg-indigo-50/70 text-slate-700 hover:text-indigo-600 text-xs font-medium transition-colors"
              >
                <SettingsIcon size={18} className="text-purple-500" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-400">
        SocialPulse © {new Date().getFullYear()} • Need help? Check your connection or contact support.
      </footer>
    </div>
  );
}
