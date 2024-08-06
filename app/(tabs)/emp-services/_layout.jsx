import {View, Text} from 'react-native'
import React from 'react'
import {Slot, Stack} from 'expo-router'

const Layout = () => {
    return (
        <Stack
            screenOptions={{
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Stack.Screen
                name='Service'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='leave'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='reimburstment'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='apply-reimburstment'
                options={{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default Layout