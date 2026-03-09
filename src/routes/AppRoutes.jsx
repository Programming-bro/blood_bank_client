import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Activate from "../pages/Activate"; // নতুন ইমপোর্ট
import PrivateRoute from "../components/PrivateRoute";
import RequestBlood from "../pages/RequestBlood";
import DonorList from "../pages/DonorList";
import ForgotPassword from "../pages/ForgotPassword";
import ResendActivation from "../pages/ResendActivation";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate/:uid/:token" element={<Activate />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
      <Route path="/resend-activation" element={<ResendActivation />} />
      <Route
        path="/donor-list"
        element={
          <PrivateRoute>
            <DonorList />
          </PrivateRoute>
        }
      />
      <Route
        path="/request-blood"
        element={
          <PrivateRoute>
            <RequestBlood />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
