import { View, Text, TextInput } from 'react-native'
import React from 'react'
 
const FormField = ({title}) => {
  return (
    <View className="m-2">
      <Text className="my-1 font-semibold">{title} </Text>
      <View>
        <TextInput className="border-2 bg-white rounded-lg border-slate-900 p-2" />
      </View>
    </View>
  )
}

export default FormField