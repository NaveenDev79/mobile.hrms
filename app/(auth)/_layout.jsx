import {View, Text, SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import {Slot, Stack} from 'expo-router' 

const AuthLayout = () => {
    return ( <> 
    <Stack
        screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
    }} >
        <Stack.Screen
            name='login'
            options={{
            headerShown: false
        }}/>
        <Stack.Screen
            name='Register'
            options={{
            headerShown: false
        }}/>
    </Stack> 
    {/* <StatusBar backgroundColor='#323232' style='light' />  */}
    </>)
}

export default AuthLayout