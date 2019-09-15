import { ImagePicker } from "react-file-picker";
import React, { useState } from "react";
import { storage, db } from "../../store";
import firebase from "firebase";
import Loader from "../../components/Loader";
export default props => {
  const [state, setState] = useState({ loaded: true });
  const handleChange = image => {
    setState({ loaded: false });
    // Points to the root reference
    var storageRef = storage.ref();

    // Points to 'images'
    var imagesRef = storageRef.child("images");

    // Points to 'images/user email'
    // Note that you can use variables to create child values
    var fileName = firebase.auth().currentUser.email.split("@")[0];
    var spaceRef = imagesRef.child(fileName);

    // File path is 'images/user email'
    var path = spaceRef.fullPath;
    var uploadTask = storageRef.child(path).putString(image, "data_url");

    uploadTask.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            console.log("loading");
        }
      },
      error => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          const collection = db.collection("users");
          collection
            .doc(firebase.auth().currentUser.email.split("@")[0])
            .update({
              profilePhoto: downloadURL
            })
            .then(() => {
              firebase
                .auth()
                .currentUser.updateProfile({
                  photoURL: downloadURL
                })
                .then(() => {
                  console.log("File available at", downloadURL);
                  setState({ loaded: true });
                  props.history.push("/home");
                });
            });
        });
      }
    );
  };
  return (
    <div>
      {state.loaded ? (
        <div className="divContainerImageUploader">
          <h1 style={{ color: "white" }}>Upload Profile Photo</h1>
          <div className="imagePickerContainer">
            <ImagePicker
              extensions={["jpg", "jpeg", "png"]}
              onChange={handleChange}
              dims={{
                minWidth: 0,
                maxWidth: 5000,
                minHeight: 0,
                maxHeight: 5000
              }}
              onError={errMsg => alert(errMsg)}
            >
              <button className="btn btn-blow">
                <span>Click me</span>
              </button>
            </ImagePicker>
          </div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
