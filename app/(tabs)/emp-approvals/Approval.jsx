import {useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LeaveData, ReimbursementData} from '../../../constants/data';
import LeaveComponent from '../../../components/LeaveComponent';
import ReimbursementComponent from '../../../components/ReimbursementComponent';
import TopLayout from '../../../components/employee/TopLayout';

const getLeaveData = (data, type) => {
    return data.filter((item) => item.status === type);
};

const Approvals = () => {
    const [selectedType,
        setSelectedType] = useState('Leaves');
    const [type,
        setType] = useState('Approved');
    const [dataLeave,
        setLeaveData] = useState([]);
    const [reimbursementData,
        setReimbursementData] = useState([])

    useEffect(() => {
        setLeaveData(getLeaveData(LeaveData, type));
        setReimbursementData(getLeaveData(ReimbursementData, type))
    }, [type]);

    return (

        <TopLayout bg='#3399' title='Approval tab'>
            <View className="flex flex-row justify-between">
                <TouchableOpacity
                    className={`w-2/4 mr-1 bg-slate-200 p-2 rounded-md ${selectedType === 'Leaves'
                    ? 'bg-slate-400'
                    : ''}`}
                    onPress={() => setSelectedType('Leaves')}>
                    <Text className='text-base text-center'>Leaves</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`w-2/4 mr-1 bg-slate-200 p-2 rounded-md ${selectedType === 'Reimbursement'
                    ? 'bg-slate-400'
                    : ''}`}
                    onPress={() => setSelectedType('Reimbursement')}Reimbursement >
                    <Text className='text-base text-center'>Reimbursement</Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-between  p-2">
                {['Approved', 'Rejected'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        className={`flex-1 py-2 ${type === item
                        ? 'border-b-2 border-gray-800'
                        : ''}`}
                        onPress={() => setType(item)}>
                        <Text
                            className={`text-base italic text-center font-medium ${type === item
                            ? 'text-black'
                            : 'text-gray-800'}`}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View className="">
                {selectedType === 'Leaves'
                    ? (
                        <View>
                            {dataLeave.map((item) => <LeaveComponent key={item.id} item={item}/>)}
                        </View>
                    )
                    : (
                        <View>
                            {reimbursementData.map((item) => <ReimbursementComponent key={item.id} item={item}/>)}
                        </View>
                    )}
            </View>
        </TopLayout>
    );
};

export default Approvals;
