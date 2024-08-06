import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '../../../../components/Layout';
import { NavigateToBack } from '../../../../components/Utils';
import { LeaveData } from '../../../../constants/data';

const LeaveId = () => {
  const { leaveId } = useLocalSearchParams();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const data = LeaveData.find((item) => item.id === leaveId);  
    setLeave(data || {});
  }, [leaveId]);

  return (
    <Container classes='flex-1 p-4 mih-h-screen'>
      <NavigateToBack title='Leave Status' />
      
            <Text className='my-2 text-base font-medium'>Leave Application ID : {leave.id || 3 } has been {leave.status || 'Accepted'}</Text>
            <Text>Applied Date : {leave.type}</Text>
            <Text>Approved Date : {leave.type}</Text>
            <Text>Start Date: {leave.startDate}</Text>
            <Text>End Date: {leave.endDate}</Text>
            <Text>Status: {leave.status}</Text>
        
         
    </Container>
  );
}

export default LeaveId;
