import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { View, Text, Image, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { formatDate, getRoomId } from '../utils';

const ChatItem = ({item,router,currentUser}) => {
    const [lastmessage,setLastMessage]=useState(undefined)

    useEffect(()=>{
        let roomId=getRoomId(currentUser?.userId,item?.userId);
        const docRef=doc(db,"rooms",roomId);
        const messagesRef=collection(docRef,"messages")
        const q=query(messagesRef,orderBy('createdAt','desc'));
        let unsub=onSnapshot(q,(snapshot)=>{
            let allMessages=snapshot.docs.map(doc =>{
                return doc.data();
            })
            setLastMessage(allMessages[0]?allMessages[0]:null);
        })
        return unsub
      },[])


    const openChatRoom = ()=>{
        router.push({pathname:'/(tabs)/chatRoom',params:item})
        // router.push({ pathname: '/chatRoom', params: { userId: item.userId } });
        // router.replace('/(tabs)/chatRoom');

    }
    const renderTime = () => {
        if(lastmessage){
            let date=lastmessage?.createdAt;
            return formatDate(new Date(date?.seconds * 1000))
        }
    }
    const renderLastMessage=()=>{
        if(typeof lastmessage==='undefined') return 'Loading ..'
        if(lastmessage){
            if(currentUser?.userId === lastmessage.userId) return "You :"+lastmessage?.text;
            return lastmessage?.text;
        }
        else{
            return   "Say Hi!"
        }
    }
  return (
    <Pressable  onPress={openChatRoom} className=" bg-gray-200  rounded-2xl px-4   flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 borderb border-b-neutral-300 ">
        <Image source={{uri:item?.profile}} style={{height:hp(6),aspectRatio:1}} className="rounded-full" />
        <View className="flex-1 gap-1">
            <View className="flex-row justify-between">
                <Text style={{fontSize:hp(1.8)}} className="font-semibold text-neutral-800">{item?.username}</Text>
                <Text style={{fontSize:hp(1.5)}} className="font-semibold text-neutral-800">{renderTime()}</Text>

            </View>
            <Text style={{fontSize:hp(1.6)}} className="font-medium text-neutral-500 ">{renderLastMessage()} </Text>
        </View>
    </Pressable>
  )
}

export default ChatItem