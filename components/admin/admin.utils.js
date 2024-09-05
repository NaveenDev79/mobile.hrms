import { useRouter } from "expo-router";
import {FlatList, Text, TouchableOpacity, View} from "react-native"

export const ActionPendingCard = ({title, num}) => { 

    return (
        <View className='bg-white my-1 p-2 mx-2 rounded-md'>
            <Text className='text-base my-2 font-normal'>
                Todays Pending Action</Text>
            <View className="flex flex-row items-center justify-between">
                <View className="bg-slate-100 w-1/2 p-2 mr-1 rounded-md">
                    <Text className='text-5xl text-center font-medium'>{num['leave']}</Text>
                    <Text className='text-base text-center font-light'>{title[1]}{" "}
                        Approval</Text>
                </View>
                <View className="bg-slate-100 w-1/2 p-2 rounded-md">
                    <Text className='text-5xl text-center font-medium'>{num['refund']}</Text>
                    <Text className='text-base text-center font-light'>{title[2]}{" "}
                        Request</Text>
                </View>
            </View>
        </View>
    )
}

export const DataCard = ({item}) => { 
    return (
        <View className='bg-white my-1 p-2 mx-2 rounded-md'>
            <Text className='text-base my-2 font-400'>
                In this month</Text>
            <View className="">
                <View className="bg-slate-100 p-2 rounded-md">
                    <Text className='text-base font-light'>A total of {item.num}{ " "}
                        {item.title}
                        has been approved.
                    </Text>
                    {item.title == "Reimburstment" &&<Text className='text-base font-medium'>{`sum of ${item.total} has been refunded succesfully.`}
                    </Text>}
                </View>
            </View>
        </View>
    )
} 
export const ActionCard = ({title,data}) => { 
    const router = useRouter()

    function onHandle(id) { 
        if(title == 'Leave'){ 
            router.push({pathname:'/admin-employee/leave',
                params:{
                    id:id
                }})
            
        }else{ 
            router.push({pathname:'/admin-employee/refund',
                params:{
                    id:id
                }})
        }
        
        
    }
   
    return (
        <View className='bg-white my-1 p-2 mx-2 rounded-md'>
            <Text className='text-base my-2 font-400'>{title} Request</Text>
            <View>
            <FlatList
                data={data}
                renderItem={({item}) =>  <Compo onHandle={onHandle} name={item.userId?.name} date={item?.createdAt?.slice(0,10)} id={item._id}/>}
                keyExtractor={item => item._id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}/>
            </View>
        </View>
    )
}
const Compo = ({name, date, id,onHandle}) => { 
    // let nameParts = name.split(' ');
    let initials = name[0]+name[1];

    return (
        <TouchableOpacity onPress={()=>onHandle(id)}>
            <View className='p-1 w-28 flex items-center justify-center'>
                <View
                    className='bg-[#e4faf5] w-20 my-2 rounded-full h-20 flex justify-center items-center'>
                    <Text className='text-2xl uppercase font-black text-[#243352]'>{initials}</Text>
                </View>
                <Text className="text-[#243352] text-center text-base ">{name}</Text>
                <Text className="text-[#252d3e83] text-base ">{date}</Text>
            </View>
        </TouchableOpacity>
    )
}