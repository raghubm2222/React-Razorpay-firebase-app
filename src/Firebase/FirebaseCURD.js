import React, { useState } from "react";
import { database } from "./Firebase";

const uid = "9108276851sd";

export default function FirebaseCURD() {
  const [loading, setLoading] = useState(false);
  async function sendData() {
    try {
      setLoading(true);
      await database
        .ref("users/" + uid)
        .set({
          username: "Raghu",
          email: "raghu22222@gmail.com",
          phone_number: "973748787878",
        })
        .then((_) => {
          setLoading(false);
          readData();
        });
    } catch (e) {
      setLoading(false);
      alert("unable to set data");
    }
  }
  async function update() {
    try {
      setLoading(true);
      await database
        .ref("users/" + uid)
        .update({
          username: "@@@@@@@@@@@@@@@@@@@@@",
          email: "##############",
          phone_number: "&&&&&&&&&&&&&&&&&",
        })
        .then((_) => {
          setLoading(false);
          readData();
        });
    } catch (e) {
      setLoading(false);
      alert("unable to set data");
    }
  }
  function readData() {
    database.ref("users").once("value", function (snapshot) {
      snapshot.forEach((snap) => {
        console.log(snap.key);
        console.log(snap.val().username);
        console.log(snap.val().email);
        console.log(snap.val().phone_number);
      });
    });
  }
  function deleteData() {
    database
      .ref("users/" + uid)
      .remove()
      .then((_) => {
        readData();
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        {!loading && (
          <button style={{ margin: "10px" }} onClick={sendData}>
            Send Data
          </button>
        )}
        {!loading && (
          <button style={{ margin: "10px" }} onClick={update}>
            Update
          </button>
        )}
        <button style={{ margin: "10px" }} onClick={readData}>
          Read
        </button>
        <button style={{ margin: "10px" }} onClick={deleteData}>
          Delete
        </button>
      </header>
    </div>
  );
}

export default FirebaseCURD;

axios
  .post(
    "https://auth-app-a67be-default-rtdb.firebaseio.com/users/-MROEfTW-kXfORnYsosz/payments.json",
    { paymentData: response, course: course }
  )
  .then(() => history.push("/dashboard"));
