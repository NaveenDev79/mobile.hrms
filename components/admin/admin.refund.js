import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const RefundItem = ({ item }) => {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'teal';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'orange';
      default:
        return 'black';
    }
  };

  function handleNext() {
    router.push(`admin-payment/${item._id}`);
  }

  return (
    <View className='bg-sky-100 rounded-sm  p-2 my-1'>
      <View className="flex flex-row justify-between">
        <Text
          className="p-2 text-md font-light text-white rounded-lg"
          style={{
            backgroundColor: getStatusColor(item.status),
          }}
        >
          Status: {item.status}
        </Text>
        <IconLink
          onTouch={handleNext}
          Icon={<Feather name="arrow-right-circle" size={30} color="black" />}
        />
      </View>
      <View className='my-1'>
        <Text className='font-medium text-md'>For : {item.title}</Text>
        <Text className='font-medium text-md'>Cause : {item.desc}</Text>
        <Text className='text-base font-light'>Total Amount $: {item.amount}</Text>
      </View>
      <View className='my-1'>
        <Text className='text-base font-light'>Applied on {item.AppliedOn.slice(0,10)} by employee {item.userId.name}</Text>
      </View>
    </View>
  );
};

export const IconLink = ({ Icon, onTouch }) => (
  <TouchableOpacity onPress={onTouch}>
    {Icon}
  </TouchableOpacity>
);

export default RefundItem;
