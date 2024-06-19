import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const Formfield = ({title,value,placeholder,handleChangetext,otherStyle}) => {
  const [showpwd,setshow]=useState(false)
  return (
    <View className={`space-y-2 ${otherStyle} `}>
      <Text className="text-gray-100 font-medium">{title}</Text>
      <View className=" bg-gray-800    border-2 flex-row w-full h-16 px-4 bg-black-100 rounded-2xl items-center focus:border-[#FFA001]">
        <TextInput className="  flex-1 text-white font-semibold " value={value} placeholder={placeholder} placeholderTextColor="#7b7b8b" onChangeText={handleChangetext } secureTextEntry={title === 'Password' && !showpwd}/>
        {title==='Password' && <TouchableOpacity onPress={()=>setshow(!showpwd)}><Image className="w-6 h-6" resizeMode='contain' source={showpwd ? icons.eyeHide: icons.eye}/></TouchableOpacity> }
      </View>
    </View>
  )
}

export default Formfield