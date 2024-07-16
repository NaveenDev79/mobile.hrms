import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({title, onPressHandle, styleClass}) => {
    return (
        <TouchableOpacity onPress={onPressHandle} className={styleClass}>
            <Text className="text-center text-xl font-black text-white ">{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton