import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";





const firebaseConfig = {
    apiKey: "AIzaSyDsOgpLuHfdHQPdXOAcVVxmkn5O3r7mits",
    authDomain: "x-cite-db.firebaseapp.com",
    projectId: "x-cite-db",
    storageBucket: "x-cite-db.appspot.com",
    messagingSenderId: "693242153026",
    appId: "1:693242153026:web:aad71819fd14e68a3485db",
    measurementId: "G-7ZN2ZSC3ZB"
  };
// const firebaseConfig = {
//   apiKey: "AIzaSyDzKdGN1Lx8nmG-jSGZXmaGo8z6X0jsKys",
//   authDomain: "x-cite-2.firebaseapp.com",
//   projectId: "x-cite-2",
//   storageBucket: "x-cite-2.appspot.com",
//   messagingSenderId: "827024114042",
//   appId: "1:827024114042:web:aea2f3e81e3039c4dd96c3"
// };




const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
// export default getFirestore(app)