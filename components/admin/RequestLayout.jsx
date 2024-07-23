import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const data = [
    {
        id: '1',
        date: "10-02-2024",
        name: 'Naveend Reddy'
    }, {
        id: '2',
        date: "10-02-2024",
        name: 'John Doe'
    }, {
        id: '3',
        date: "10-02-2024",
        name: 'Jane Smith'
    }, {
        id: '4',
        date: "10-02-2024",
        name: 'Naveend Reddy'
    }, {
        id: '5',
        date: "10-02-2024",
        name: 'John Doe'
    }, {
        id: '6',
        date: "10-02-2024",
        name: 'Jane Smith'
    }
];

const RequestLayout = ({title}) => {
    return (
        <View className='bg-white my-2 shadow-lg p-2 rounded-md'>
            <Text className='text-xl my-2 text-[#243352] font-semibold'>{title}</Text>
            <FlatList
                data={data}
                renderItem={({item}) =>  <Compo name={item.name} date={'12-06-2024'} id={item.id}/>}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}/>
        </View>
    )
}

const Compo = ({name, date, id}) => {

    const router = useRouter()
    let nameParts = name.split(' ');
    let initials = nameParts
        .map(part => part[0])
        .join('');

    return (
        <TouchableOpacity onPress={() => router.push(`/admin-approval/${id}`)}>
            <View className='p-1 w-28 flex items-center justify-center'>
                <View
                    className='bg-[#e4faf5] w-20 my-2 rounded-full h-20 flex justify-center items-center'>
                    <Text className='text-2xl font-black text-[#243352]'>{initials}</Text>
                </View>
                <Text className="text-[#243352] text-center text-base ">{name}</Text>
                <Text className="text-[#252d3e83] text-base ">{date}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RequestLayout