import { Route, Routes } from "react-router-dom";
import DashBoard from "../pages/DashBoard";
import ErrorPage from "../pages/ErrorPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Stats from "../components/Stats";
import Alljobs from "../components/Alljobs";
import Addjob from "../components/Addjob";
import Profile from "../components/Profile";
import { useAuth } from "../context/authContext";
import AppLayout from "../layout/AppLayout";
import LandingLayout from "../layout/LandingLayout";
function Router() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <AppLayout /> : <LandingLayout />}>
        <Route path="" element={<LandingPage />} />
        <Route
          path="dashboard"
          element={user ? <DashBoard /> : <LoginPage />}
        />
        <Route path="register" element={<RegisterPage />} />
        <Route path="stats" element={user ? <Stats /> : <LoginPage />} />
        <Route path="all-jobs" element={user ? <Alljobs /> : <LoginPage />} />
        <Route path="add-job" element={user ? <Addjob /> : <LoginPage />} />
        <Route path="profile" element={user ? <Profile /> : <LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
export default Router;
