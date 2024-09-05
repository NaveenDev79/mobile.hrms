import {useState, useEffect} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import LeaveComponent from '../../../components/LeaveComponent';
import ReimbursementComponent from '../../../components/ReimbursementComponent';
import TopLayout from '../../../components/employee/TopLayout';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Approvals = () => {
    const [selectedType, setSelectedType] = useState('Leaves');
    const [type, setType] = useState('Pending');
    const [dataLeave, setLeaveData] = useState([]);
    const [reimbursementData, setReimbursementData] = useState([]);
    const {user, token} = useSelector((state) => state.auth);
     
    const fetchLeaves = async() => {
        try {
            const {data} = await axios.get(`/leave/get/user/${user?._id}`, {
                headers: { token: token }
            });
            if (data.success) {
                setLeaveData(data.data);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'An error occurred');
        }
    };

    const fetchReimbursements = async() => {
        try {
            const {data} = await axios.get(`/refund/get/user/${user?._id}`, {
                headers: { token: token }
            }); 
            
            if (data.success) {
                setReimbursementData(data.data);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        if (selectedType === 'Leaves') {
            fetchLeaves();
        } else {
            fetchReimbursements();
        }
    }, [selectedType]);

    const filteredData = selectedType === 'Leaves' 
        ? dataLeave.filter(item => item.status === type)
        : reimbursementData.filter(item => item.status === type);
 
        
        

    return (
        <TopLayout bg='#3399' title='Approval tab'>
            <View className="flex flex-row justify-between">
                <TouchableOpacity
                    className={`w-2/4 mr-1 bg-slate-200 p-2 rounded-md ${selectedType === 'Leaves' ? 'bg-slate-400' : ''}`}
                    onPress={() => setSelectedType('Leaves')}>
                    <Text className='text-base text-center'>Leaves</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`w-2/4 mr-1 bg-slate-200 p-2 rounded-md ${selectedType === 'Reimbursement' ? 'bg-slate-400' : ''}`}
                    onPress={() => setSelectedType('Reimbursement')}>
                    <Text className='text-base text-center'>Reimbursement</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between p-2">
                {['Pending', 'Approved', 'Rejected'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        className={`flex-1 py-2 ${type === item ? 'border-b-2 border-gray-800' : ''}`}
                        onPress={() => setType(item)}>
                        <Text className={`text-base italic text-center font-medium ${type === item ? 'text-black' : 'text-gray-800'}`}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView>
            {
                filteredData.length == '0' && <Text>No data available to show.</Text>
            }
                {filteredData.map((item) => (
                    selectedType === 'Leaves' 
                        ? <LeaveComponent key={item._id} item={item}/>
                        : <ReimbursementComponent key={item._id} item={item}/>
                ))}
            </ScrollView>
        </TopLayout>
    );
};

export default Approvals;