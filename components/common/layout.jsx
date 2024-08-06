import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

const PageLayout = ({
    children,
    bgColor = '#FAFAFA',classname
}) => {
    return (
        <SafeAreaView className="min-h-screen">
            <ScrollView className="flex-1 min-h-screen">
                <View
                    style={{
                    backgroundColor: bgColor
                }}
                    className={classname}>
                    <View >
                        {children}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PageLayout