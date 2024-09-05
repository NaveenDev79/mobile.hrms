import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

const HeadAdminLayout = ({children, bg="#F2F2F2"}) => {
    return (
        <SafeAreaView className="min-h-screen flex-1">
            <ScrollView className="min-h-screen" contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{backgroundColor:bg}} className='flex-1 min-h-screen pt-4 pb-16'>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HeadAdminLayout