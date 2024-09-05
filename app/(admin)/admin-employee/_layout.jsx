
import {Stack} from 'expo-router'

const Layout = () => {
    return (

        <Stack
            screenOptions={{
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Stack.Screen
                name='employee'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='attendence'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='overallAttendence'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='refund'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='leave'
                options={{
                headerShown: false
            }}/>
             <Stack.Screen
                name='admin'
                options={{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default Layout;
