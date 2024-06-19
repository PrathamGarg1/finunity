import { View, Text, Pressable, Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import React from 'react'
import { Stack } from 'expo-router'
import { Entypo } from '@expo/vector-icons'

const ChatRoomHeader = ({user,router}) => {
    return (
        <Stack.Screen options={{ title: '', headerShadowVisible: false, headerLeft: () => ( <View className="flex-row items-center gap-4" ><Pressable onPress={() => router.back()}><Entypo name="chevron-left" size={hp(4)} /></Pressable>
        <View className="flex-row items-center gap-3"><Image source={{uri : user?.profile}} style={{height:hp(4.5),aspectRatio:1,borderRadius:100}} /><Text style={{fontSize:hp(2.5)}} className="text-neutral-700 " >{user?.username}</Text></View>
        </View> )}} />
    )
}

export default ChatRoomHeader