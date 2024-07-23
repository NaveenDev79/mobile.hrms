import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import TopLayout from '../../../components/employee/TopLayout'
import {Ionicons} from '@expo/vector-icons'
import {useRouter} from 'expo-router'
import {MaterialIcons} from '@expo/vector-icons';
import {ReimburstmentPlans} from '../../../constants/data'

const Reimburstment = () => {

    const router = useRouter();
    return (
        <TopLayout bg='#3399' title='' isTop={false}>
            <View className='flex flex-row justify-between gap-1 my-2 items-center'>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={34} color="#3399"/>
                </TouchableOpacity>
                <Text className='text-xl font-black'>Reimbursement claim</Text>
                <TouchableOpacity onPress={() => console.log('added')}>
                    <MaterialIcons name="add-box" size={34} color="#3399"/>
                </TouchableOpacity>
            </View>
            {/* Body */}
            <View>
                {ReimburstmentPlans.map((item) =>< Compo item = {
                    item
                }
                key = {
                    item.id
                } />)
}
            </View>
        </TopLayout>
    )
}

export const Compo = ({item}) => {
    return (
        <View className='flex flex-row my-2 p-2 bg-white rounded-md justify-between'>
            <View className='flex-3/4 '>
                <Text className='text-lg font-semibold'>{item.title}</Text>
                <Text className='text-base'>Claim upto $ {item.cost}</Text>
            </View>
            <View className='flex-1/4 items-center  flex flex-row gap-2 '>
                <Text className='p-2 bg-slate-900 text-white  rounded-md text-base '>Raise claim</Text>
                <TouchableOpacity
                    className="bg-slate-950 rounded-md "
                    onPress={() => console.log('1')}>
                    <Ionicons name="arrow-forward-outline" size={34} color="#FFF"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Reimburstment