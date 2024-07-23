import {View, Text} from 'react-native'
import React from 'react'
import {useLocalSearchParams, useRouter} from 'expo-router'

const PaymentId = () => {
    const router = useRouter();
    const {paymentId} = useLocalSearchParams();
    console.log(paymentId);
    return (
        <View>
            <Text>PaymentId</Text>
        </View>
    )
}

export default PaymentId