import { useState, useEffect } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import HeadAdminLayout from '../../../components/layout/Layout';
import { NavigateBack } from '../../../components/admin/Utils'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { LeaveItem } from '../../../components/admin/admin.leave';

const Leave = () => {
    const { id } = useLocalSearchParams();
    const [dataLeave, setLeaveData] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const fetchLeaves = async () => {
        try {
            const { data } = await axios.get(`/leave/get/user/${id}`, {
                headers: {
                    token: token,
                },
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
        if (id) {
            fetchLeaves();
        }
    }, [id]);

    return (
        <HeadAdminLayout>
            <NavigateBack title="Employee Leave" /> 
                {dataLeave.length > 0 ? (
                    dataLeave.map((item) => (
                        <LeaveItem key={item._id} item={item} />
                    ))
                ) : (
                    <View className="flex items-center justify-center mt-8">
                        <Text className="text-gray-500">No leave data available.</Text>
                    </View>
                )} 
        </HeadAdminLayout>
    );
};

export default Leave;
