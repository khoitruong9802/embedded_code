import LoginPage from "../page/LoginPage/Login";
import SignupPage from "../page/SignupPage/Signup";
import HomePage from "../page/HomePage/Home";
import StaticPage from "../page/StaticPage/Static";
import ProfilePage from "../page/ProfilePage/Profile";
import SupportPage from "../page/SupportPage/Support";
import SettingPage from "../page/SettingsPage/Setting";
import NotFoundPage from "../page/NotFoundPage/NotFound";

export const routes = [
  {
    path: "/",
    page: LoginPage,
  },
  {
    path: "/signup",
    page: SignupPage,
  },
  {
    path: "/home",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/static",
    page: StaticPage,
    isShowHeader: true,
  },
  {
    path: "/support",
    page: SupportPage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/setting",
    page: SettingPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
