import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '../../../components/Layout';
import { NavigateToBack } from '../../../components/Utils';

const RefundId = () => {
  const { refundId } = useLocalSearchParams();
  console.log(refundId);

  return (
    <Container classes='flex-1 p-4 mih-h-screen'>
      <NavigateToBack title='Reimbursement Status' />
      <View>
        <Text>Refund ID: {refundId}</Text>
      </View>
    </Container>
  );
}

export default RefundId;
