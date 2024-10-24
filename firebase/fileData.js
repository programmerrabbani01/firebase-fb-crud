// import { getStorage } from "firebase/storage";
// import { firebaseApp } from "./app.js";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// // export Initialize Storage
// export const firebaseStorage = getStorage(firebaseApp);

// /**
//  * Upload File To Firebase Storage
//  */

// export const uploadFile = async (file) => {
//   // code for image upload

//   const filEData = await uploadBytesResumable(
//     ref(firebaseStorage, file.name),
//     file
//   );

//   const fileLink = await getDownloadURL(filEData.ref);

//   // return file link
//   return fileLink;
// };

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firebaseApp } from "./app.js";

// Initialize Storage
export const firebaseStorage = getStorage(firebaseApp);

/**
 * Upload File To Firebase Storage
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The download URL of the uploaded file
 */
export const uploadFileToStorage = async (file) => {
  const storageRef = ref(firebaseStorage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optionally, handle progress updates here
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      async () => {
        // Handle successful uploads on complete
        const fileLink = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(fileLink);
      }
    );
  });
};

/**
 * Delete File From Firebase Storage
 * @param {string} filePath - The path to the file in storage
 * @returns {Promise<void>}
 */
export const deleteFileFromStorage = async (filePath) => {
  const fileRef = ref(firebaseStorage, filePath);
  try {
    await deleteObject(fileRef);
    console.log(`File ${filePath} deleted successfully`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
