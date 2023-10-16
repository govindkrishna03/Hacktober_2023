import {
  Button,
  CssBaseline,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unSetUserToken } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
import ChangePassword from "./auth/ChangePassword";
import Nav from "../components/Navbar";
import "./dashboard.css";

const Dashboard = () => {
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.email,
          name: data.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <CssBaseline />
      <Nav />
      <div className="total">
        <div className="dash">
          <div className="da-cover">
            <div className="da">
              <h1 className="board">DASHBOARD</h1>
              <Typography variant="h5" className="email">
                Email: {userData.email}
              </Typography>
              <Typography variant="h6">Name: {userData.name}</Typography>
              <Button
                className="but"
                variant="contained"
                color="warning"
                size="large"
                onClick={handleLogout}
                sx={{ mt: 8 }}
              >
                Logout
              </Button>
              <Button
                className="but-2"
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <ChangePassword onClose={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
