import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLogInFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */

      // This gives you a Google Access Token. You can use it to access the Google API.

      // The signed-in user info.
      var user = result.user;
      const { displayName, photoURL, email } = user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        photo: photoURL,
        email: email,
        success: true,
      };
      return signInUser;

      // ...
    })
    .catch((error) => {
      console.log("error");
    });
};

export const handleFbSignIn = () => {
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      var user = result.user;
      user.success = true;
      return user;
    })
    .catch((error) => {});
};

export const handleGoogleSignOut = () => {
  console.log("SignOut Clicked...");
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signInUser = {
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
      };
      return signInUser;
    })
    .catch((err) => {
      console.log("signOut Error");
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
      // ...
    })
    .catch((error) => {
      var errorMessage = error.message;
      // ..
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
};
export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      const newUserInfo = { ...user };
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      var errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};
