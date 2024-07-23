import {View, Text, ScrollView, Image} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import HeadAdminLayout from '../../components/layout/Layout';
import RequestLayout from '../../components/admin/RequestLayout';

//  <Text className='text-xl my-2 text-[#243352] font-semibold'>{title}</Text>

const AdminHome = () => {
    return (
        <HeadAdminLayout bg='#c'>
            <View>
                <Text className='text-xl my-2 text-[#243352] font-semibold'>Your Inbox</Text>

            </View>
            <View>
                <RequestLayout title='Reimbursement requests'/>
                <RequestLayout title='Leave requests'/>
            </View>
        </HeadAdminLayout>
    )
}

export default AdminHome