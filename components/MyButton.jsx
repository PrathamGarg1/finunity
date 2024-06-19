import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { isLoading } from 'expo-font'

const MyButton = ({title,handlePress,extrastyle,textStyles,isSubmitting}) => {     
  return (<>
    <TouchableOpacity onPress={handlePress}    className={`bg-[#FFA001] rounded-xl min-h-[62px] w-full  justify-center items-center  ${isSubmitting?'opacity-25':''}  ${extrastyle} `} >
        <Text className={`text-bold text-black text-lg ${textStyles}`}  >{title}</Text>
    </TouchableOpacity>
        </>
  )
}

export default MyButton