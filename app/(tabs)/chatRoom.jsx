import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { View, Text, Pressable, TextInput, Alert, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import  CustomKeyboardView from '../../components/customKeyboardView';

import MessageList from '../../components/MessageList';
import { getRoomId } from '../../utils';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Feather } from '@expo/vector-icons';
import { useAuthContext } from '../../context/GlobalProvider';

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const {user} =useAuthContext();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef=useRef('');
  const inputRef=useRef(null);
  const scrollViewref=useRef(null);

  useEffect(()=>{
    updateScrollView();
  },[messages])
  const updateScrollView = () =>{
    setTimeout(()=>{
        scrollViewref?.current?.scrollToEnd({animated:true})
    },100)
  }
  

  const creatRoomIfNotExists= async () =>{
    let roomId=getRoomId(user?.userId,item?.userId);
    await setDoc(doc(db,"rooms",roomId),{
        roomId,createdAt:Timestamp.fromDate(new Date())
    })
  }

  useEffect(()=>{
    creatRoomIfNotExists();
    let roomId=getRoomId(user?.userId,item?.userId);
    const docRef=doc(db,"rooms",roomId);
    const messagesRef=collection(docRef,"messages")
    const q=query(messagesRef,orderBy('createdAt','asc'));
    let unsub=onSnapshot(q,(snapshot)=>{
        let allMessages=snapshot.docs.map(doc =>{
            return doc.data();
        })
        setMessages([...allMessages]);
    })


    const KeyBoardDidShowListener=Keyboard.addListener('keyboardDidShow',updateScrollView)
    return () =>{
         unsub();
         KeyBoardDidShowListener.remove();
    }
  },[])

  const handleSendMsg = async () => {

    let msg=textRef.current.trim();

    if(!msg) return;
    try{
        let roomid=getRoomId(user?.userId,item?.userId);
        const docRef=doc(db,'rooms',roomid);
        const messagesRef=collection(docRef,"messages")
        textRef.current="";
        if(inputRef)inputRef?.current?.clear();
        const newDoc=await addDoc(messagesRef,{
            userId:user?.userId,
            text:msg,
            profile:user?.profile,
            senderName:user?.username,
            createdAt:Timestamp.fromDate(new Date())

        })

    }catch(e){
        Alert.alert('Message',e.message)
    }
  }


  return (
    <CustomKeyboardView>
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300"></View>
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList scrollViewref={scrollViewref} messages={messages} currentUser={user} />
        </View>
        <View style={{ marginBottom: hp(2.7) }} className="pt-2">
          <View className="flex-row justify-between items-center mx-3">
            <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-xl px-4">
              <TextInput
              ref={inputRef}
              onChangeText={value => textRef.current=value}
                placeholder="Type message..."
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <Pressable onPress={handleSendMsg} className="bg-neutral-200 p-2 mr-1 rounded-full">
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
    </CustomKeyboardView>

  );
}