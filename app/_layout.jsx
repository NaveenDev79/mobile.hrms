import {StyleSheet, Text, View} from 'react-native'
import {Slot, Stack} from 'expo-router';
import {ProviderStore} from '../redux-store/Provider';

const RootLayout = () => {

    return (   <ProviderStore>
        <Stack >
            <Stack.Screen
                name='index'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(auth)'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(tabs)'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(admin)'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='(employee)'
                options={{
                headerShown: false
            }}/>

        </Stack>
    </ProviderStore>  )
}

export default RootLayout