import React, {  createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'



export const authContext = createContext();
const auth = getAuth(app);

const Authprovider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const provider = new GoogleAuthProvider()

    const googleLogin = () =>{
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    const ProfileUpdate = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo)
    }


    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        });
        return() => unsubscribe();
    },[])


    const authInfo= {createUser, login,user,loading,logOut,ProfileUpdate,googleLogin}
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default Authprovider;