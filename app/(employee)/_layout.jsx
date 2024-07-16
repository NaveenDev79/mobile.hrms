import {Stack} from 'expo-router'

const EmployeeLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='leave'
                options={{
                headerShown: false
            }}/>
            <Stack.Screen
                name='/reimburstment'
                options={{
                headerShown: false
            }}/>
        </Stack>
    )
}

export default EmployeeLayout
