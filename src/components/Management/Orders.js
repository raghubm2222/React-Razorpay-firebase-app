import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { database } from "../../Firebase/Firebase";
import MaterialTable from "material-table";
import moment from "moment";

function createData(
  email_id,
  user_id,
  course,
  enrolled_at,
  order_id,
  valid_upto
) {
  return {
    email_id,
    user_id,
    course,
    enrolled_at,
    order_id,
    valid_upto,
  };
}
const columns = [
  { title: "Email", field: "email_id" },
  { title: "User Id", field: "user_id" },
  { title: "Course", field: "course" },
  {
    title: "Enrolled at",
    field: "enrolled_at",
  },
  { title: "Order Id", field: "order_id" },
  { title: "Valid Upto", field: "valid_upto" },
];

export default function Orders() {
  const [usersData, setUsersData] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    database.ref("users").once("value", function (snapshot) {
      let orders = [];
      snapshot.forEach((snap) => {
        if (snap.val().courses) {
          for (let i in snap.val().courses) {
            orders.push(
              createData(
                snap.val().email,
                snap.key,
                i,
                moment(snap.val().courses[i]["enrolledAt"]).format(
                  "DD-MM-YYYY"
                ),
                snap.val().courses[i]["paymentDetails"]["razorpay_order_id"],
                moment(
                  snap.val().courses[i]["enrolledAt"] + 31536000000
                ).format("DD-MM-YYYY")
              )
            );
          }
        }
      });
      setUsersData(orders);
    });
  }, []);
  useEffect(() => {
    setData(usersData);
  }, [usersData]);
  return data ? (
    <MaterialTable
      style={{ margin: "10px" }}
      data={usersData}
      columns={columns}
      options={{
        exportButton: true,
        exportFileName: "Orders",
        pageSizeOptions: false,
        paging: false,
        headerStyle: {
          fontWeight: "bold",
          fontSize: "17px",
          textJustify: true,
          color: "black",
        },
      }}
      title="ORDERS"
    />
  ) : (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "50vh",
      }}
    >
      <CircularProgress />
    </div>
  );
}
