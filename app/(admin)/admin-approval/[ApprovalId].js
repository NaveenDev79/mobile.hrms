import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import HeadAdminLayout from '../../../components/layout/Layout';

const ApprovalId = () => {
    const router = useRouter();
    const {ApprovalId} = useLocalSearchParams();
    console.log(ApprovalId);
  return (
    <HeadAdminLayout>
      <View>
      <Text>ApprovalId {ApprovalId}</Text>
    </View>
    </HeadAdminLayout>
  )
}

export default ApprovalId