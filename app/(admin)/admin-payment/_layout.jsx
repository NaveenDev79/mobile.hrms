import { Stack} from 'expo-router'

const Layout = () => {
    return (
        // <Slot/>
        <Stack
            screenOptions={{
            tabBarShowLabel: false,
            headerShown: false
        }}>
            <Stack.Screen
                name='payment'
                options={{
                headerShown: false
            }}/>
            {/* <Stack.Screen
                name='admin-payment'
                options={{
                headerShown: false
            }}/> */}
        </Stack>
    )
}

export default Layout