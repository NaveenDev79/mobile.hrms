import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import TopLayout from '../../../components/employee/TopLayout'
import {Ionicons} from '@expo/vector-icons'
import {useRouter} from 'expo-router'
import {MaterialIcons} from '@expo/vector-icons';
import {ReimburstmentPlans} from '../../../constants/data'
import {NavigateToBack} from '../../../components/Utils'

const Reimburstment = () => {

    const router = useRouter();
    function handleNavigate(id){ 
        router.push(
            {
                pathname: `emp-services/${id}`,
                params: {
                  id:id
                }
             }
        ) 
    }
    return (
        <TopLayout bg='#3399' title='' isTop={false}>
            <NavigateToBack
                title="Reimbursement claim"
                onNext={() => router.push('emp-services/apply-reimburstment')}
                Icon={<MaterialIcons name = "add-box" size={32} color="#5F66E1"/>}/> 
            {/* Body */}
            <View>
                {ReimburstmentPlans.map((item) =><ReimburstmentItem item={item}
                key={item.id} onNavigate={()=>handleNavigate(item.id)} />)}
            </View>
        </TopLayout>
    )
}

export const ReimburstmentItem = ({item,onNavigate}) => {
    
    return (
        <View className='flex flex-row my-2 p-2 bg-white rounded-md justify-between'>
            <View className='flex-3/4 '>
                <Text className='text-lg font-medium'>{item.title}</Text>
                <Text className='text-base font-light'>Claim upto $ {item.amount}</Text>
            </View>
            <View className='flex-1/4 items-center  flex flex-row gap-2 '>
                <Text className='p-1 bg-[#5F66E1] text-white font-light  rounded-md text-base '>Raise claim</Text>
                <TouchableOpacity
                    className="bg-[#5F66E1] rounded-md "
                    onPress={onNavigate}>
                    <Ionicons name="arrow-forward-outline" size={30} color="#FFF"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Reimburstment