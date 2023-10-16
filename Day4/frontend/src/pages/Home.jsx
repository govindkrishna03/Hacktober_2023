import React from "react";
import "./Home.css";
import bloodLogo from "../images/hosp.svg";
import bloodBag from "../images/blood.jpg";
import donor from "../images/blood1.jpg";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BloodtypeSharpIcon from "@mui/icons-material/BloodtypeSharp";
import video from "../images/red-blood-cells-national-geographic.mp4";

const BloodDonation = () => {
  return (
    <div className="outer">
      <div className="opacity">
        <div className="video-container">
          <video className="video" muted autoPlay loop>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="container">
        <div>
          <div className="out">
            <h1 className="heading">Blood Donation</h1>
          </div>
          <h3 className="h3" style={{ textAlign: "center" }}>
            Blood donation is a voluntary procedure that can help save the lives
            of others. Donated blood is used to help people who have lost blood
            due to injury or surgery, people with blood disorders such as anemia
            or sickle cell disease, and those undergoing cancer treatments. One
            donation can save up to three lives
          </h3>
          <div className="button-container">
            <Link to="/donate">
              <Button
                variant="contained"
                size="large"
                className="donate-button"
              >
                Donate
              </Button>
            </Link>
            <Link to="/recieve">
              <Button
                variant="contained"
                size="large"
                className="recieve-button"
              >
                Receive
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonation;
