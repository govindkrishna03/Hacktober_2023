import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import Donate from "./pages/donate";
import Receive from "./pages/recieve";
import Registration from "./pages/auth/regForm";

function App() {
  const { access_token } = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Contact />} />
            <Route path="home" element={<Home />} />
            {access_token ? (
              <Route path="Receive" element={<Receive />} />
            ) : null}
            <Route
              path="login"
              element={!access_token ? <LoginReg /> : <Navigate to="/" />}
            />
            <Route path="/Register" element={<LoginReg />} />
            <Route
              path="sendpasswordresetemail"
              element={<SendPasswordResetEmail />}
            />
            <Route
              path="api/user/reset/:id/:token"
              element={<ResetPassword />}
            />
            <Route
              path="dashboard"
              element={access_token ? <Dashboard /> : <Navigate to="/login" />}
            />
          </Route>
          <Route path="*" element={<h1>Please Login First!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
