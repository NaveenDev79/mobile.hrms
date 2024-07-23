import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

const TopLayout = ({
    children,
    bg = "#F4F6F9",
    title = '',
    isTop=true
}) => {
    return (
        <SafeAreaView className="min-h-screen flex-1">
            <ScrollView className="flex-1">
                {isTop &&<View className='px-4 py-4 bg-white'>
                    <Text className='text-3xl  text-[#324467] font-bold'>{title}</Text>
                </View>}
                <View className={`flex-1 min-h-screen px-4 pt-4 pb-12 bg-[${bg}]`}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TopLayout