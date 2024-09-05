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
                name='home-emp'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='monthly-emp'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='yearly-emp'
                options={{
                headerShown: false
            }}/> 
        </Stack>
    )
}

export default Layout