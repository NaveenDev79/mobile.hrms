import {View, Text, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadAdminLayout from '../../../components/layout/Layout'
import Header  from '../../../components/admin/Utils';
import { useSelector } from 'react-redux';
import axios from 'axios'; 
import RefundItem from '../../../components/admin/admin.refund';

const getLeaveData = (data, type) => {
    return data.filter((item) => item.status == type);
};

const AdminPayment = () => {
    const [type, setType] = useState('Pending');
    const [refundData, setRefundData] = useState([]); 
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    const fetchRefund = async () => {
        try {
            const { data } = await axios.get(`/refund/get/all`, {
                headers: { token }
            }); 
            
            if (data.success) {
                setRefundData(data.data);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        fetchRefund();
    }, [type]);


    return (
        <HeadAdminLayout bg='#F4F6F9'>
            <Header title='Refund Portal'/>
            {/*  */}
            <View className="flex flex-row justify-between p-2">
                {['Pending', 'Approved', 'Rejected'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        className={`flex-1 p-2 ${type === item ? 'border-b-2 bg-sky-400   border-sky-400' : ''}`}
                        onPress={() => setType(item)}>
                        <Text
                            className={`text-base text-center font-medium ${type === item ? 'text-white' : 'text-black'}`}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/*  */}
            <View className="p-2">
            {getLeaveData(refundData, type).length==0 && <Text className="text-base text-orange-500">No data for {type} Refund.</Text> }
                {getLeaveData(refundData, type).map((item) => (
                    <RefundItem key={item._id} item={item} />
                ))}
            </View>
        </HeadAdminLayout>
    )
}

export default AdminPayment