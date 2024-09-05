import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const ReimburstmentDetail = ( ) => { 
  const params = useLocalSearchParams()
  console.log(params);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>okay</Text> 
      {/* Render other details of 'item' as needed */}
    </View>
  );
};

export default ReimburstmentDetail;
