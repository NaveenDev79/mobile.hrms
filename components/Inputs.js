import {View, Text, TextInput, Alert} from 'react-native'
import React from 'react'


export const InputField = ({
    title,
    Icon="",
    name,
    value,
    read=false,
    onInputChange = () => {}
}) => {
    return (
        <View className="flex flex-row my-1 overflow-hidden gap-2">
            <View className='bg-[#5C63D6] p-1 rounded-lg'>
                {Icon}
            </View>
            <View className="">
                <Text className='text-base  font-medium'>{title}</Text>
                <TextInput
                    name={name}
                    readOnly={read}
                    placeholder={title}
                    className="border-b-2 text-[#5C63D6] min-w-full text-base border-slate-300	"
                    onChangeText={(text) => onInputChange(name, text)}
                    value={value}/>
            </View>
        </View>
    )
}

export const DateInputField = ({title, Icon, name, value, onInputChange}) => {
    return (
        <View className="flex flex-row my-1 overflow-hidden gap-2">
            <View className='bg-[#5C63D6] p-1 rounded-md'>
                {Icon}
            </View>
            <View className="">
                <Text className='text-base font-black'>{title}</Text>
                <TextInput
                    name={name}
                    className="border-b-2 min-w-full border-slate-300	"
                    onChangeText={(text) => onInputChange(name, text)}
                    value={value}/>
            </View>
        </View>
    )
}

export const FormInput = ({label, placeholder, value, type, onChange=()=>{}}) => {
    return (
        <View className="my-0 p-2">
            <Text className="my-1 font-light text-base">{label}</Text>
            <TextInput
                onChangeText={onChange}
                keyboardType={type === "Number"
                ? "numeric"
                : "default"}
                placeholder={placeholder}
                value={value}
                className="text-base font-light bg-slate-200 p-2 rounded-md"/>
        </View>
    )
}

export const showSuccess = (message,onOkay) => {
    Alert.alert(
      "Submission Successful",
      message,
      [
        {
          text: "OK",
          onPress: onOkay
        }
      ],
      { cancelable: false }
    );
  };