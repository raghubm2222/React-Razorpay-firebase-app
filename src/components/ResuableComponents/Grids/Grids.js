import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import razorpay from "../../../functions/razorpay";
import { useAuth } from "../../../Context/AuthContext";
import "./Grids.css";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function RecipeReviewCard(props) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isPurchased, setPurchased] = useState(false);

  async function payNow() {
    try {
      setLoading(true);
      const isPaid = await razorpay(
        currentUser.uid,
        props.label,
        currentUser.email
      );
      if (isPaid) {
        setPurchased(true);
      } else {
        setError("Opps! Something went Wrong");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }
  let element = (
    <>
      {error && (
        <>
          <h4 style={{ color: "red" }}>{error}</h4>
          <strong style={{ color: "red" }}>
            If you paid contact us with Transaction id
          </strong>
        </>
      )}
      <h3>{props.label}</h3>
      <img
        style={{ height: "200px", width: "300px" }}
        src={props.image}
        alt="courseImages"
      />
      <Typography style={{ margin: "10px" }} align="justify">
        {props.details}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : currentUser ? (
        <button className="pay-button" onClick={payNow}>
          BUY NOW
        </button>
      ) : (
        <Link
          style={{ padding: "10px", margin: "10px" }}
          className="pay-button"
          to="/login"
        >
          LOGIN TO ENROLL
        </Link>
      )}
    </>
  );
  if (isPurchased) {
    element = (
      <>
        <h2>CONGRAJULATIONS !!!</h2>
        <h5>Payment Sucessfull</h5>
        <img
          src={
            "https://media.tenor.com/images/6f9a8a727bf911637d7c88560a4e9313/tenor.gif"
          }
          alt="images"
        />
        <h4>Thank you for Purchase</h4>
        <p>Shortly your Team Contact you</p>
        <strong> Ready to Learn</strong>
      </>
    );
  }
  return (
    <div
      className="card"
      style={{ margin: "10px auto", padding: "10px", textAlign: "center" }}
    >
      {element}
    </div>
  );
}
