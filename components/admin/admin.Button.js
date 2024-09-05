import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

export const ActionButton = ({onHandle, title,bg}) => {
    return (
        <View className="p-2 rounded-md my-1" style={{backgroundColor:bg}}>
            <TouchableOpacity onPress={onHandle}>
                <Text className="text-center p-2 text-white font-medium">{title}</Text>
            </TouchableOpacity>
        </View>
    ); 
};
