// import * as firebase from "firebase";

// const uploadFile = (imageFile, callback) => {
//   const fileName = imageFile.name;
//   const storageRef = firebase.storage().ref();
//   const uploadTask = storageRef.child(`images/${fileName}`).put(imageFile);

//   uploadTask.on(
//     "state_changed",
//     snapshot => {
//       const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
//       callback({ progress });
//     },
//     error => {
//       callback({ error });
//     },
//     () => {
//       const downloadURL = uploadTask.snapshot.downloadURL;
//       callback({ downloadURL });
//     }
//   );
// };

// export { uploadFile };

// const urls = [];

// urls.forEach(url => {
//   uploadFile(url, result => {
//     if (result.progress) {
//       console.log(result.progress);
//     }
//     if (result.downloadURL) {
//       this.setState({
//         imageurl: result.downloadURL,
//         imageUploaded: true
//       });
//     }
//     if (result.error) {
//       console.log(result.error);
//     }
//   });
// });

// const config = {
//   apiKey: "AIzaSyCKdrWsvmJfsTQV_7jSv1VA5OZbjHNq-qg",
//   authDomain: "pic1-e8468.firebaseapp.com",
//   databaseURL: "https://pic1-e8468.firebaseio.com",
//   projectId: "pic1-e8468",
//   storageBucket: "pic1-e8468.appspot.com",
//   messagingSenderId: "860600730005"
// };
// firebase.initializeApp(config);
