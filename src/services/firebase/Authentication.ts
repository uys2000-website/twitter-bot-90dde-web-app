import { app } from "./App";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const auth = getAuth(app);

export const isAuthenticated = function () {
  return getUserAuth() != null;
};

export const getUserAuth = function () {
  return auth.currentUser;
};

export const getUserAuthToken = function () {
  return getUserAuth()?.getIdToken(true);
};

export const registerToAuth = function (username: string, password: string) {
  return createUserWithEmailAndPassword(auth, username, password);
};

export const loginToAuth = function (username: string, password: string) {
  return signInWithEmailAndPassword(auth, username, password);
};

export const logoutFromAuth = function () {
  return signOut(auth);
};
