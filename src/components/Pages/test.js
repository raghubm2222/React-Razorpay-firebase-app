import React, { useEffect, useState } from "react";
import { database } from "../../Firebase/Firebase";

function createData(
  email_id,
  user_id,
  course,
  enrolled_at,
  order_id,
  payment_id
) {
  return { email_id, user_id, course, enrolled_at, order_id, payment_id };
}

export default function Management() {
  const [usersData, setUsersData] = useState();
  useEffect(() => {
    database.ref("users").once("value", function (snapshot) {
      let orders = [];
      snapshot.forEach((snap) => {
        //console.log(snap.key);
        //console.log(snap.val().email);
        if (snap.val().courses) {
          for (let i in snap.val().courses) {
            orders.push(
              createData(
                snap.val().email,
                snap.key,
                i,
                snap.val().courses[i]["enrolledAt"],
                snap.val().courses[i]["paymentDetails"]["razorpay_order_id"],
                snap.val().courses[i]["paymentDetails"]["razorpay_payment_id"]
              )
            );
            // console.log(i);
            // console.log(snap.val().courses[i]["enrolledAt"]);
            // console.log(
            //   snap.val().courses[i]["paymentDetails"]["razorpay_order_id"]
            // );
            // console.log(
            //   snap.val().courses[i]["paymentDetails"]["razorpay_payment_id"]
            // );
            // for (let j in snap.val().courses[i]["paymentDetails"]) {
            //   // console.log(snap.val().courses[i]["paymentDetails"][j]);
            // }
          }
        }
      });
      setUsersData(orders);
    });
  }, []);

  return usersData ? <div>{console.log(usersData)}</div> : <p>Loading....</p>;
}
