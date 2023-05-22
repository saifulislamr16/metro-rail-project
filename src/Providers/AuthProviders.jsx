
import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config'

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);

    }
    const signWithGoogle = (googleProvider) => {
       return signInWithPopup(auth, googleProvider)
    }
    const signWithGithub = (githubProvider) =>{
        return signInWithPopup(auth, githubProvider)
    }

    const updateProfileData = (name) => 
    {   
        updateProfile(auth.currentUser,{
            displayName:name
          }).then(() => {
            // Update successful
          }).catch((error) => {
            // An error occurred
          });
    }
    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        loading,
        updateProfileData,
        signWithGoogle,
        googleProvider,
        githubProvider,
        signWithGithub
    }
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, loggedUser => {
            console.log('logged in user inside auth state observer', loggedUser)
            setUser(loggedUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        } 
    },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;