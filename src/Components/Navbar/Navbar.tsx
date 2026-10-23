import { useContext } from "react";
import { Link, NavLink } from "react-router";
import {
    Dropdown,
    Avatar,
} from "@heroui/react";
import {
    Rss,
    User,
    Bell,
    Settings,
    LogOut,
    Sparkles,
    Menu,
} from "lucide-react";
import type { UserProfileT } from "../../Types";
import { TokenContext } from "../Context/TokenContext";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar({ userData: propUserData }: { userData?: UserProfileT }) {
    const tokenContext = useContext(TokenContext);
    const userData = propUserData || tokenContext?.userData;
    const queryClient = useQueryClient();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        tokenContext?.setToken(null);
        tokenContext?.setUserData(null);
        queryClient.clear();
       
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
            ? "bg-indigo-50 text-indigo-600  shadow-xs shadow-indigo-100"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <NavLink to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <span className="text-lg font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                            SocialSphere
                        </span>
                    </NavLink>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <NavLink to="/feed" className={navLinkClass}>
                            <Rss size={18} />
                            <span className="hidden sm:inline">Feed</span>
                        </NavLink>
                        <NavLink to="/profile" className={navLinkClass}>
                            <User size={18} />
                            <span className="hidden sm:inline">Profile</span>
                        </NavLink>
                        <NavLink to="/notifcation" className={navLinkClass}>
                            <Bell size={18} />
                            <span className="hidden sm:inline">Notification</span>
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-3">
                        <Dropdown>
                            <Dropdown.Trigger className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100/70 transition-colors cursor-pointer outline-none">
                                <Avatar size="sm" className="ring-2 ring-indigo-500/20">
                                    <Avatar.Image src={userData?.photo} />
                                    <Avatar.Fallback>{userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}</Avatar.Fallback>
                                </Avatar>
                                <span title={userData?.name} className="text-sm font-semibold text-slate-700 hidden md:inline">
                                    {userData?.name ? (userData.name.length > 10 ? userData.name.slice(0, 10) + '...' : userData.name) : ''}
                                </span>
                                <Menu size={16} />
                            </Dropdown.Trigger>

                            <Dropdown.Popover className="bg-white border border-slate-200 rounded-2xl shadow-xl min-w-52 p-1.5 z-50">
                                <Dropdown.Menu aria-label="User Menu" className="outline-none">
                                    <Dropdown.Item
                                        id="profile"
                                        textValue="Profile"
                                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer outline-none transition-colors"
                                    >
                                        <User size={16} />
                                        <Link to="/profile" className="size-full"> <span>Profile</span></Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                        id="settings"
                                        textValue="Settings"
                                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer outline-none transition-colors"
                                    >
                                        <Settings size={16} />
                                        <Link to="/settings" className="size-full"> <span>Settings</span></Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item
                                        id="logout"
                                        textValue="Logout"
                                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 rounded-lg hover:bg-rose-50 hover:text-rose-700 cursor-pointer outline-none transition-colors border-t border-slate-100 mt-1"
                                    >
                                        <LogOut size={16} />
                                        <button type="button" onClick={handleLogout} className="cursor-pointer w-full text-left">Logout</button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}
