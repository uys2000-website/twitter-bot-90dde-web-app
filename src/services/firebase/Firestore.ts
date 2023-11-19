import { app } from "./App";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  deleteDoc,
} from "firebase/firestore";
import { getFirebaseObject } from "@/services/utils/Object";
const db = getFirestore(app);

export const getDocuments = function (
  col: string,
  direction: "asc" | "desc",
  timestamp: number
) {
  const colRef = collection(db, col);
  const q = query(
    colRef,
    orderBy("fdata.ctimestamp", direction),
    startAfter(timestamp)
  );
  return getDocs(q);
};

export const getDocument = function (col: string, document: string) {
  const docRef = doc(db, col, document);
  return getDoc(docRef);
};

export const setDocument = function (
  col: string,
  document: string,
  data: object
) {
  const docRef = doc(db, col, document);
  return setDoc(docRef, getFirebaseObject(data));
};

export const addDocument = function (col: string, data: object) {
  const colRef = collection(db, col);
  return addDoc(colRef, getFirebaseObject(data));
};

export const deleteDocument = function (col: string, document: string) {
  const colRef = doc(db, col, document);
  return deleteDoc(colRef);
};
export const collectionListener = function (
  col: string,
  callback: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void,
  order = false
) {
  const colRef = collection(db, col);
  return onSnapshot(
    order
      ? query(colRef, orderBy("timestamp", "desc"), startAfter(Date.now()))
      : colRef,
    callback
  );
};
