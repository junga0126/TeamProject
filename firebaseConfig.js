import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb5gReEKJitLYdD-zjiYMtk91f35gmpwc",
  authDomain: "teamproject-4c0d8.firebaseapp.com",
  projectId: "teamproject-4c0d8",
  storageBucket: "teamproject-4c0d8.appspot.com",
  messagingSenderId: "1090193024503",
  appId: "1:1090193024503:web:ae0088fe5d97a251c13af2",
  measurementId: "G-5DEQ9PBBDR"
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, 
  {experimentalForceLongPolling: true,}
);  
export { db }