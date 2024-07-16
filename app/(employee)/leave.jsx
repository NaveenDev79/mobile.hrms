import {Text, ScrollView, View, TextInput, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { icons } from '../../constants'


const Leave = () => {
    return (
        <SafeAreaView className="min-h-full">
            <ScrollView >
                <View className="p-2 mx-2 border-2 border-slate-300 rounded-lg ">
                    <Text className="text-3xl mb-4">New Leave</Text>
                     
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Leave
