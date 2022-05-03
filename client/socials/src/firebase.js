import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAju4t1fAcpCFZQHHs1f8oVqcPLUxYXfhM",
    authDomain: "moment-5f905.firebaseapp.com",
    projectId: "moment-5f905",
    storageBucket: "moment-5f905.appspot.com",
    messagingSenderId: "806180168736",
    appId: "1:806180168736:web:a87c2d8341872ca5ef0845"
  };
  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);