import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

const HeadAdminLayout = ({children, bg="#F4F6F9"}) => {
    return (
        <SafeAreaView className="min-h-screen flex-1">
            <ScrollView className="flex-1">
                <View className={`flex-1 min-h-screen px-4 pt-4 pb-10 bg-[${bg}]`}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HeadAdminLayout