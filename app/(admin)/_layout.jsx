import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {FontAwesome} from '@expo/vector-icons' 
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center "> 
          {icon}
            {/* <Text
                className={`${focused
                ? "font-bold"
                : "font-normal"} text-sm`}>{name}</Text> */}
        </View>
    )
}

const AdminLayout = () => {
    return (
        <Tabs
            screenOptions={{
            tabBarStyle: {
                padding: 4,
                height: 64
            }
        }}>
            <Tabs.Screen
                name="admin-employee"
                options={{
                title: "Employees",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={<AntDesign name="team" size={24} color={color} />}
                        color={color}
                        name="Employees"
                        focused={focused}
                    />
                )
            }}/>
            <Tabs.Screen
                name="admin-approval"
                options={{
                title: "Approvals",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={<Octicons name="verified" size={24} color={color} />}
                        color={color}
                        name="Approval"
                        focused={focused}
                    />
                )
            }}/>
            <Tabs.Screen
                name="admin-home"
                options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={<FontAwesome size={28} name="home" color={color}/>}
                        color={color}
                        name="Home"
                        focused={focused}
                    />
                )
            }}/>
            <Tabs.Screen
                name="admin-payment"
                options={{
                title: "Requests",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={<MaterialIcons name="pending-actions" size={24} color={color} />}
                        color={color}
                        name="Requests"
                        focused={focused}
                    />
                )
            }}/>
            <Tabs.Screen
                name="admin-profile"
                options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon={<AntDesign name="profile" size={24} color={color} />}
                        color={color}
                        name="Profile"
                        focused={focused}
                    />
                )
            }}/>
        </Tabs>
    )
}

export default AdminLayout