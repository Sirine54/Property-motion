import {  Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import AuthenticationLayout from './pages/Authentication';
import LoginPage from './features/Auth/Login';
import SignUpPage from './features/Auth/SignUp';
import ForgetPassword from './features/Auth/ForgetPassword';
import DashboardLayout from './pages/DashboardLayout';
import DashboardPage from './features/Dashboard/DashboardPage';
import PropertyPage from './features/Dashboard/PropertyPage';
import CreateProperty from './features/Dashboard/CreateProperty';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="login"
        element={
          <AuthenticationLayout>
            <LoginPage />
          </AuthenticationLayout>
        }
      />
      <Route
        path="signup"
        element={
          <AuthenticationLayout>
            <SignUpPage />
          </AuthenticationLayout>
        }
      />
      <Route
        path="forget-password"
        element={
          <AuthenticationLayout>
            <ForgetPassword />
          </AuthenticationLayout>
        }
      />
      {/* <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}> */}
      <Route
        path="dashboard"
        element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />
      <Route
        path="properties"
        element={
          <DashboardLayout>
            <PropertyPage />
          </DashboardLayout>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
