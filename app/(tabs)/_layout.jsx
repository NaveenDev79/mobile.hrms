import {Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {icons} from '../../constants'

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"/>
            <Text
                className={`${focused
                ? "font-bold"
                : "font-normal"} text-sm`}>{name}</Text>
        </View>
    )
}

const MainLayout = () => {
    return (
        <Tabs
            screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                padding: 1,
                height: 74
            }
        }}>
            <Tabs.Screen
                name="emp-home"
                options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={icons
                    ?.home}
                    color={color}
                    name="Home"
                    focused={focused}/>)
            }}/>
            <Tabs.Screen
                name="emp-services"
                options={{
                title: "Service",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={icons
                    ?.service}
                    color={color}
                    name="Service"
                    focused={focused}/>)
            }}/>
            <Tabs.Screen
                name="emp-approvals"
                options={{
                title: "Approval",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={icons
                    ?.approval}
                    color={color}
                    name="Approval"
                    focused={focused}/>)
            }}/>
            <Tabs.Screen
                name="emp-profile"
                options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (<TabIcon
                    icon={icons
                    ?.profile}
                    color={color}
                    name="Profile"
                    focused={focused}/>)
            }}/>
        </Tabs>
    )
}

export default MainLayout
