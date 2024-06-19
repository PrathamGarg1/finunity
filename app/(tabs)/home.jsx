import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, Button, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/GlobalProvider'
import ChatList from '../../components/ChatList';
import { usersRef } from '../../firebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const home = () => {
  const {logout,user} =useAuthContext();
  const [users,setUsers]=useState([])
  
  const handleLogout=async () => {
    await logout();
  }
  useEffect(()=>{
    if(user?.uid){
        getUsers();   
    }
  },[])

  const getUsers=async () => {
    const q=query(usersRef,where('userId','!=',user?.uid))
    const qsnapshot=await getDocs(q)
    let data=[];
    qsnapshot.forEach(doc => {
      data.push({...doc.data()})
    })
    setUsers(data)
  }
  return (
    <GestureHandlerRootView >
    <View className="bg-black flex-1 bg-blue">
      {
        users.length? <ChatList  currentUser={user} users={users} /> : <View className='flex items-center' style={{top:hp(30)}}><ActivityIndicator size={'large'}/></View>
      }
    </View>
    </GestureHandlerRootView>
  )
}

export default home