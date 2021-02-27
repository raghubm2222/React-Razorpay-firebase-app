import { CircularProgress } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import { auth, signInProvider, database } from "../Firebase/Firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
function isExists(uid) {
  return new Promise((resolve) => {
    database.ref("users/" + uid).on("value", function (snapshot) {
      resolve(snapshot.exists());
    });
  });
}
async function uploadData(res, refferalcode) {
  const userID = res.user.uid;
  const isexists = await isExists(userID);
  if (!isexists) {
    const userData = {
      email: res.user.email,
      userName: res.user.displayName,
      photoURL: res.user.photoURL,
      refferedBy: refferalcode.length === 6 ? refferalcode : null,
      isMember: false,
    };
    database.ref("users/" + userID).set(userData);
    database
      .ref("ambassador/" + refferalcode + "/count")
      .once("value", function (snap) {
        const count = snap.val();
        database.ref("ambassador/" + refferalcode).update({
          count: count + 1,
        });
      });
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function googlesignup(refferalcode) {
    const res = await auth.signInWithPopup(signInProvider);
    uploadData(res, refferalcode);
    return res;
  }
  function loginwithemail(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  async function signupwithemail(email, password, refferalcode) {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    uploadData(res, refferalcode);
    return res;
  }

  function signout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unSubscribe;
  }, []);
  const value = {
    currentUser,
    googlesignup,
    signout,
    loginwithemail,
    signupwithemail,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
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
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
