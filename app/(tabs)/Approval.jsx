import { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LeaveData, ReimbursementData } from '../../constants/data';
import LeaveComponent from '../../components/LeaveComponent';
import ReimbursementComponent from '../../components/ReimbursementComponent';



const getLeaveData = (data, type) => {
  return data.filter((item) => item.status === type);
};



const Approvals = () => {
    const [selectedType, setSelectedType] = useState('Leaves');
    const [type, setType] = useState('Approved'); // review, rejected
    const [dataLeave, setLeaveData] = useState([]);
    const [reimbursementData, setReimbursementData] = useState([])

    useEffect(() => {
        setLeaveData(getLeaveData(LeaveData, type));
        setReimbursementData(getLeaveData(ReimbursementData,type))
    }, [type]);

    return (
        <SafeAreaView className="min-h-screen bg-gray-100">
            <ScrollView>
                <View className="pb-16">
                    <Text className="text-3xl text-white bg-gray-800 p-4 font-bold">
                        Approval tab
                    </Text>
                    <View className="flex flex-row bg-gray-800 overflow-hidden">
                        <TouchableOpacity
                            className={`flex-1 py-4 ${selectedType === 'Leaves' ? 'bg-gray-700' : ''}`}
                            onPress={() => setSelectedType('Leaves')}>
                            <Text className="text-xl text-white text-center font-medium">Leaves</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 py-4 ${selectedType === 'Reimbursement' ? 'bg-gray-700' : ''}`}
                            onPress={() => setSelectedType('Reimbursement')}>
                            <Text className="text-xl text-white text-center font-medium">Reimbursement</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-row justify-between bg-gray-600 p-2">
                        {['Approved', 'In-review', 'Rejected'].map((item) => (
                            <TouchableOpacity
                                key={item}
                                className={`flex-1 py-2 ${type === item ? 'border-b-2 border-white' : ''}`}
                                onPress={() => setType(item)}>
                                <Text className={`text-lg text-center font-medium ${type === item ? 'text-white' : 'text-gray-300'}`}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="p-4">
                        {selectedType === 'Leaves' ? (
                            <View>
                                {dataLeave.map((item) =>  <LeaveComponent key={item.id} item={item}/>)}
                            </View>
                        ) : (
                          <View>
                                {reimbursementData.map((item) =>  <ReimbursementComponent key={item.id} item={item}/>)}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Approvals;
