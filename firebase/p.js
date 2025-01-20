// import {
//     createUserWithEmailAndPassword,
//     deleteUser,
//     getAuth,
//     GoogleAuthProvider,
//     signInWithEmailAndPassword,
//     signInWithPopup,
//     updateProfile,
// } from "firebase/auth";
// import { FirebaseAuth } from "./config";
// import { FirebaseError } from "firebase/app";
// import {
//     registerUserWithEmailPasswordProps,
//     ResultProps,
//     signInWithEmailPasswordProps,
// } from "./types/providerProps";
// const googleProvider = new GoogleAuthProvider();

// // !types

// //* Login
// export const signInWithGoogle = async () => {
//     try {
//         const result = await signInWithPopup(FirebaseAuth, googleProvider);
//         const { displayName, photoURL, uid, email } = result.user;
//         return {
//             ok: true,
//             displayName,
//             photoURL,
//             uid,
//             errorMessage: null,
//             email,
//         };
//     } catch (error) {
//         if (error instanceof FirebaseError) {
//             return {
//                 ok: false,
//                 errorMessage: `${error.message}| code:${error.code}`,
//             };
//         }
//     }
//     return {
//         ok: false,
//         errorMessage: "An unknown error has occurred",
//     };
// };
// // export const signInWithEmailPassword = async ({

// //     email,
// //     password,
// // }) => {
// //     try {
// //         const result = await signInWithEmailAndPassword(
// //             FirebaseAuth,
// //             email,
// //             password
// //         );
// //         const { uid, photoURL, displayName } = result.user;
// //         return {
// //             ok: true,
// //             displayName,
// //             photoURL,
// //             uid,
// //             errorMessage: null,
// //             email,
// //         };
// //     } catch (error) {
// //         if (error instanceof FirebaseError) {
// //             return {
// //                 ok: false,
// //                 errorMessage: `Invalid username or password & ${error.message}`,
// //             };
// //         }
// //     }
// //     return {
// //         ok: false,
// //         errorMessage: "An unknown error has occurred",
// //     };
// // };

// // //? Register
// // export const registerUserWithEmailPassword = async ({
// //     email,
// //     password,
// //     displayName,
// // }) => {
// //     try {
// //         const result = await createUserWithEmailAndPassword(
// //             FirebaseAuth,
// //             email,
// //             password
// //         );
// //         const { uid, photoURL, email: email2 } = result.user;
// //         await updateProfile(FirebaseAuth.currentUser, { displayName });
// //         return {
// //             ok: true,
// //             uid,
// //             photoURL,
// //             displayName,
// //             email: email2,
// //             errorMessage: null,
// //         };
// //     } catch (error) {
// //         if (error instanceof FirebaseError) {
// //             return {
// //                 ok: false,
// //                 errorMessage: `${error.message}| code:${error.code}`,
// //             };
// //         }
// //     }
// //     return {
// //         ok: false,
// //         errorMessage: "An unknown error has occurred",
// //     };
// // };

// // export const deleteCurrentUser = async () => {
// //     const auth = getAuth();
// //     const user = auth.currentUser;
// //     if (user) {
// //         await deleteUser(user);
// //         console.log("deleted");
// //     }
// // };
// const registerWithUsernamePassword = async ()=>{
//     try {
//         // const 
//     } catch (error) {
        
//     }
// }