import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import HeadAdminLayout from '../../../components/layout/Layout';
import Header from '../../../components/admin/Utils';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { LeaveItem } from '../../../components/admin/admin.leave';

const getLeaveData = (data, type) => {
    return data.filter((item) => item.status == type);
};



const AdminApproval = () => {
    const [type, setType] = useState('Pending');
    const [leaveData, setLeaveData] = useState([]); 

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    const fetchLeaves = async () => {
        try {
            const { data } = await axios.get(`/leave/get/all`, {
                headers: { token }
            }); 
            
            if (data.success) {
                setLeaveData(data.data);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [type]);

    return (
        <HeadAdminLayout bg='#F4F6F9'>
            <Header title='Leave Approvals' />
            <View className="flex flex-row justify-between p-2">
                {['Pending', 'Approved', 'Rejected'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        className={`flex-1 p-2 ${type === item ? 'border-b-2 border-sky-400' : ''}`}
                        onPress={() => setType(item)}>
                        <Text
                            className={`text-base text-center font-medium ${type === item ? 'text-black' : 'text-gray-800'}`}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Body */}
            <View className="p-2">
            {getLeaveData(leaveData, type).length==0 && <Text className="text-base text-orange-500">No data for {type} leaves.</Text> }
                {getLeaveData(leaveData, type).map((item) => (
                    <LeaveItem key={item._id} item={item} />
                ))}
            </View>
        </HeadAdminLayout>
    );
};

export default AdminApproval;

