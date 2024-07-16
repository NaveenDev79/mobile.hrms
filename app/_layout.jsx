import {StyleSheet, Text, View} from 'react-native'
import {Slot, Stack} from 'expo-router'
import { useFonts } from 'expo-font' 

const RootLayout = () => {

    const [fontsLoaded, error] = useFonts({
        "name":"path"

    })
    return ( <> 
    <Stack >
        <Stack.Screen name='index' options={{
            headerShown:false
        }} />
        <Stack.Screen name='(auth)' options={{
            headerShown:false
        }} />
         <Stack.Screen name='(tabs)' options={{
            headerShown:false
        }} />
         {/* <Stack.Screen name='(employee)' options={{
            headerShown:false
        }} /> */}
          
    </Stack>
     </>)
}

export default RootLayout
