import { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import HeadAdminLayout from '../../../components/layout/Layout';
import { NavigateBack } from '../../../components/admin/Utils';
import RefundItem from '../../../components/admin/admin.refund';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Refund = () => {
    const [refundData, setRefundData] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const fetchRefunds = async () => {
        try {
            const { data } = await axios.get('/refund/get/all', {
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
        fetchRefunds();
    }, []);

    return (
        <HeadAdminLayout>
            <NavigateBack title='Employee Reimbursement' />
            <View className="p-4">
                {refundData.length > 0 ? (
                    refundData.map((item) => (
                        <RefundItem key={item._id} item={item} />
                    ))
                ) : (
                    <View className="flex items-center justify-center mt-8">
                        <Text className="text-gray-500">No reimbursement data available.</Text>
                    </View>
                )}
            </View>
        </HeadAdminLayout>
    );
}

export default Refund;
