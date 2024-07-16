import { ImageBackground, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const ServiceCard = ({ title, image,path }) => {
    return (
        <View className=" m-2 shadow-lg overflow-hidden bg-white">
            <ImageBackground source={image} resizeMode="contain" className="h-40">
                <View className="p-4 flex-1 justify-between bg-opacity-30">
                    <Text className="text-xl font-semibold italic text-black">{title}</Text>
                    <Link href={`/${path}`}>
                        <Text className="text-lg font-bold text-black mt-2">
                            Apply for <Text className="underline">{path}</Text>
                        </Text>
                    </Link>
                </View>
            </ImageBackground>
        </View>
    );
};

export default ServiceCard;
