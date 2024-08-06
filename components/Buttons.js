import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const ActionButtons = ({classes,textClasses='',bg='#5F66E1', title, changeHandler}) => {
    return (
        <View style={{backgroundColor:bg}} className={classes}>
            <TouchableOpacity onPress={changeHandler}>
                <Text className={textClasses}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export {ActionButtons}