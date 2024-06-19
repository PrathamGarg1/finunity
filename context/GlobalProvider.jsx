import {onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, updateCurrentUser} from 'firebase/auth'
import {auth, db} from "../firebaseConfig"
import { doc,getDoc,setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);

    const updateUserData=async (userId)=>{
        const docRef=doc(db,'users',userId);
        const docnapshot=await getDoc(docRef);
        if(docnapshot.exists()){
            let data=docnapshot.data();
            setUser({...user,username:data.username,profile:data.profile,userId:data.userId})
        }
    }

    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid)
            }
            else{
                setIsAuthenticated(false);
                setUser(null);
            }
        })
        return unsub
    },[])

    const login=async (email,password)=>{
        try{
            const response = await signInWithEmailAndPassword(auth,email,password);
            return {success:true}
        }catch(e){
            return {success:false,msg:e.message}
        }
    }
    const logout=async (email,password)=>{
        try{
            await signOut(auth);
            return {success:true};
        }catch(e){
            return {success:false,msg:e.message,error:e}
            
        }
    }
    const register=async (email,password,username,profile)=>{
        try{
            const response=await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,"users",response?.user?.uid),{
                username,
                profile,
                userId:response?.user?.uid
            });
            return {success:true,data:response?.user};
        }catch(e){
            return {success:false,msg:e.message};
        }
    }

    return <AuthContext.Provider value={{user,isAuthenticated,login,register,logout}}>
        {children}
    </AuthContext.Provider>
}