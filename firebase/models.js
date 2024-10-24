import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { fireBaseApp } from "./app.js";

// create fireStore database

const database = getFirestore(fireBaseApp);

/**
 * Get All Post Data From FireStore Database
 */

export const getAllPosts = async (colName) => {
  // get all posts data
  const posts = await getDocs(collection(database, colName));

  // process posts data

  const postsDataList = [];

  posts.forEach((post) => {
    postsDataList.push({ ...post.data(), id: post.id });
  });

  return postsDataList;
};
/**
 * Get All Post Data From FireStore Database
 * Realtime Data Get
 */

export const getAllPostsRealTime = async (colName, updateState) => {
  onSnapshot(
    query(collection(database, colName), orderBy("createdAt", "desc")),
    (snapShot) => {
      const postsDataList = [];
      snapShot.docs.forEach((post) => {
        postsDataList.push({ ...post.data(), id: post.id });
      });
      updateState(postsDataList);
    }
  );
};

/**
 * Get A Single Post Data From FireStore Database
 */

export const getASinglePost = async (colName, id) => {
  // get a single post data
  const post = await getDoc(doc(database, colName, id));

  //   return post data
  return post.data();
};

/**
 * Delete A Single post Data From FireStore Database
 */

export const getDeleteAPost = async (colName, id) => {
  // // delete a single post data
  // const deleteAPost = await deleteDoc(doc(database, colName, id));

  // //   return post data
  // return deleteAPost.data();
  const docRef = doc(database, colName, id);
  await deleteDoc(docRef);
};

/**
 * Create A New Post Data For FireStore Database
 * docId  create with id
 * otherwise create with autoId
 */

export const createAPost = async (colName, data, docId = null) => {
  // create a new Post

  if (docId) {
    await setDoc(doc(database, colName, docId), data);
  } else {
    await addDoc(collection(database, colName), data);
  }
};

/**
 * Update A Post Data For FireStore Database
 */

export const updateAPost = async (colName, id, data) => {
  // update a post
  await updateDoc(doc(database, colName, id), data);
};
