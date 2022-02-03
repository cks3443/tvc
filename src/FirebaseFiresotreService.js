import { db } from "./FirebaseConfig";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

const createDocument = async (collect, document) => {
  const docRef = await addDoc(collection(db, collect), document);
};

const readAllDocument = async (collect) => {
  const vc = [];
  try {
    const q = query(collection(db, collect));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      vc.push(doc.data());
    });
  } catch (err) {
    alert(err.message);
  }
  return vc;
};

const FirebaseFirestoreService = {
  createDocument,
  readAllDocument,
};

export default FirebaseFirestoreService;
