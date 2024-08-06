import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { icons } from '../constants';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const ReimbursementComponent = ({ item }) => {
  // Determine status color
  let statusColor = '';
  if (item.status === 'Approved') {
    statusColor = 'bg-green-500';
  } else if (item.status === 'Rejected') {
    statusColor = 'bg-red-500';
  } else {
    statusColor = 'bg-blue-500';
  }

  
  function handleTouch(){
    router.push(`emp-approvals/${item.id}`)
}

  return (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Text className={`text-base font-medium mb-2 `}>
        Claim for $ {item.cost}
      </Text>
      <Text className="text-base text-gray-500 mb-1">NDF8909{item.id}</Text>

      <View className="flex flex-row items-center   mb-2">
        <Image
          className="w-6 h-6 mr-2"
          source={icons.reason}  
        />
        <Text className="text-sm ">{item.title}</Text>
      </View>

      <View className="flex flex-row items-centermb-2">
        <Image
          className="w-6 h-6 mr-2"
          source={icons.date}  
        />
        <Text className="text-sm">{item.claimedDate}</Text> 
      </View>

      <View className="border-b-2 border-gray-200 my-2"></View>

      <View className="flex flex-row items-center justify-between">
        <Text className={`text-sm p-2 rounded-lg text-white ${statusColor}`}>
          {item.status === 'In-review' ? 'In Progress' : item.status}
        </Text>
        <TouchableOpacity onPress={handleTouch} className="flex flex-row items-center p-2 border-2 border-gray-400 rounded-full">
          <Text className="text-sm mr-1 ">View Details</Text>
          <AntDesign name="rightcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};




export default ReimbursementComponent;
