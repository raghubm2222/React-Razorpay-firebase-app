import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { database } from "../../Firebase/Firebase";
import MaterialTable from "material-table";

function createData(name, email, college, ref_code, total_ref, completed) {
  return { name, email, college, ref_code, total_ref, completed };
}
const columns = [
  { title: "Name", field: "name" },
  { title: "Email", field: "email" },
  { title: "College", field: "college" },
  { title: "Reffer Code", field: "ref_code" },
  { title: "Total Refferal", field: "total_ref" },
  { title: "Completed", field: "completed" },
];

export default function Orders() {
  const [usersData, setUsersData] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    database.ref("ambassador").once("value", function (snapshot) {
      let orders = [];
      snapshot.forEach((snap) => {
        orders.push(
          createData(
            snap.val().name,
            snap.val().email,
            snap.val().college,
            snap.key,
            snap.val().count,
            snap.val().count > 4
          )
        );
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
      title="Refferal Program"
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
