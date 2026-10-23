import { useContext } from "react";
import { Link } from "react-router";
import { ShieldCheck, ChevronRight, Lock, User, ArrowLeft } from "lucide-react";
import { Avatar } from "@heroui/react";
import ChangePassword from "../../Components/Settings/ChangePassword";
import { TokenContext } from "../../Components/Context/TokenContext";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

export default function Settings() {
  useDocumentTitle('Settings');
  const tokenContext = useContext(TokenContext);
  const userData = tokenContext?.userData || JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-['Poppins',sans-serif]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1.5">
            <Link to="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              <ArrowLeft size={13} />
              Home
            </Link>

            <ChevronRight size={12} />
            <span className="text-indigo-600 font-semibold">Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your account security, credentials, and preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center gap-3.5">
              <Avatar size="lg" className="ring-2 ring-indigo-500/20">
                <Avatar.Image src={userData?.photo} alt={userData?.name} />
                <Avatar.Fallback className="bg-indigo-600 text-white font-semibold">
                  {userData?.name ? userData.name[0]?.toUpperCase() : "U"}
                </Avatar.Fallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 truncate">
                  {userData?.name || "User"}
                </h3>
                <p className="text-xs text-slate-500 truncate">
                  {userData?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-3 shadow-xs space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Preferences
            </div>
            <button
              type="button"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-indigo-50/80 text-indigo-700 font-semibold text-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-indigo-100/80 text-indigo-600">
                  <Lock size={16} />
                </div>
                <span>Password & Security</span>
              </div>
              <ChevronRight size={16} className="text-indigo-400" />
            </button>

            <Link
              to="/profile"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500">
                  <User size={16} />
                </div>
                <span>Profile Info</span>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </Link>
          </div>

          <div className="bg-linear-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
            <div className="flex items-center gap-2.5 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck size={16} />
              <span>Security Recommendation</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-1.5">
              Protect your account
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              We recommend using a unique password that you do not use for any other service. Regularly updating your password helps keep your profile safe.
            </p>
          </div>
        </aside>

        <main className="lg:col-span-8">
          <ChangePassword />
        </main>
      </div>
    </div>
  );
}
