import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

const Container = ({
    children,
    bg = "#FFFFFF",
    classes
}) => {
    return (
        <SafeAreaView className="min-h-screen flex-1">
            <ScrollView className="flex-1">
                <View
                    className={classes}
                    style={{
                    backgroundColor: bg
                }}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export {Container}