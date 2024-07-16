import {
    Image,
    ScrollView,
    Text,
    Touchable,
    TouchableOpacity,
    View
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ReimburstmentPlans} from '../../constants/data';
import {icons} from '../../constants/index'; 
import {useRouter,useNavigation} from 'expo-router'

const Reimburstment = () => {

    const route = useRouter()
    const navigation = useNavigation();
    navigation.setOptions({ headerShown: false })
    const handleAddClaim = () => {
      navigation.navigate('reimburstmentDetail', { item:{a:1} });
    };

    const handleRaiseClaim = (item) => { 
        navigation.navigate('reimburstmentDetail', item);
    };
    return (
        <SafeAreaView className="min-h-full">
            <ScrollView >
            <View>
               <TouchableOpacity onPress={()=> route.back()}>
                <Text>go back</Text>
               </TouchableOpacity>
            </View>
               
            </ScrollView>
        </SafeAreaView>
    )
}

export default Reimburstment

//  <View className="main p-4">
{/* <View className="flex flex-row justify-between items-center">
<Text className="text-2xl font-semibold">New claims</Text> 
<View className=" flex-row items-center justify-end">
    <TouchableOpacity
        onPress={handleRaiseClaim}
        className="rounded-lg bg-slate-800 p-2 mr-2">
        <Text className="text-white">Add a new claim</Text>
    </TouchableOpacity>
</View>
</View>
<View>
{ReimburstmentPlans.map((item) => { 
    return (
        <View key={item.id} className="flex overflow-hidden max-w-screen flex-row gap-1">
            <View className="basis-3/5">
                <Text className="text-lg font-bold mb-1">{item.title}</Text>
                <Text className="text-sm text-gray-500 mb-2">{item.shortDescription}</Text>
            </View>

            <View className="basis-2/5 flex-row items-center justify-end">
                <TouchableOpacity
                  onPress={() => handleRaiseClaim(item)}
                    className="rounded-lg bg-slate-800 p-2 mr-2">
                    <Text className="text-white">Raise Claim</Text>
                </TouchableOpacity>
                <View className="p-1 ">
                    <Image className="w-6 h-6" source={icons.right}/>
                </View>
            </View>
        </View>
    )
})
}
</View>

</View> */}