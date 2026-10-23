import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AuthLayout from "./Components/Layouts/AuthLayout";
import MainLayout from "./Components/Layouts/MainLayout";
import { Toaster } from "react-hot-toast";
import AuthProtectedRouts from "./Components/ProtectedRoutes/AuthProtectedRouts";
import MainProtectedRouts from "./Components/ProtectedRoutes/MainProtectedRouts";
import { lazy, Suspense } from "react";
import ScrollToTop from "./Components/Common/ScrollToTop";
import PageLoading from "./Components/Common/PageLoading";
import TopProgressBar from "./Components/Common/TopProgressBar";
const Feed = lazy(() => import("./Pages/Feed/Feed"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Notifcation = lazy(() => import("./Pages/Notifcation/Notifcation"));
const Notfound = lazy(() => import("./Pages/Notfound/Notfound"));
const PostDetails = lazy(() => import("./Pages/Post/PostDetails"));
const UserProfile = lazy(() => import("./Pages/UserProfile/UserProfile"));
const Settings = lazy(() => import("./Pages/Settings/Settings"));

export default function App() {
  const router = createBrowserRouter([
    {
      element: <ScrollToTop />,
      children: [
        {
          path: "auth",
          element: (
            <AuthProtectedRouts>
              <AuthLayout />
            </AuthProtectedRouts>
          ),
          children: [
            { index: true, element: <Navigate to="login" /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
        {
          path: "/",
          element: (
            <MainProtectedRouts>
              <MainLayout />
            </MainProtectedRouts>
          ),
          children: [
            { index: true, element: <Feed /> },
            { path: "feed", element: <Feed /> },
            { path: "profile", element: <Profile /> },
            { path: "notifcation", element: <Notifcation /> },
            { path: "settings", element: <Settings /> },
            { path: "post/:id", element: <PostDetails /> },
            { path: "user/:id", element: <UserProfile /> },
          ],
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
  return (
    <>
      <TopProgressBar />
      <Suspense fallback={<PageLoading />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}
