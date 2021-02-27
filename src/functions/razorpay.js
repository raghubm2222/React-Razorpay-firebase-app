import axios from "axios";
import { database } from "../Firebase/Firebase";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
async function updatePaymentState(payment, uid, course, email) {
  try {
    database.ref("users/" + uid).update({ isMember: true });
    await database.ref("users/" + uid + "/courses/" + course).set({
      paymentDetails: payment,
      enrolledAt: new Date().getTime(),
    });
  } catch (e) {
    alert("unable to set data");
  }
}

export default async function displayRazorpay(uid, course, email) {
  return new Promise(async (resolve) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Please check your Internet");
      return;
    }
    try {
      axios.post("http://localhost:5000/razorpay").then((responce) => {
        const options = {
          key: process.env.REACT_APP_RAZORPAYKEY,
          amount: responce.data.amount,
          currency: responce.data.currency,
          order_id: responce.data.id,
          name: "Rai Jnan",
          description: course + " COURSE PURCHASE",
          image: "http://localhost:5000/logo.png",
          handler: function (response) {
            updatePaymentState(response, uid, course, email);
            resolve(true);
          },
          prefill: {},
          notes: {
            address: "My Address Corporate Office",
          },
          theme: {
            color: "#8b0000",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
    } catch (e) {
      resolve(false);
    }
  });
}
