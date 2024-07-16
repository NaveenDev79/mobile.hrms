import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import profileImg from '../../assets/icons/profile.png'
import CustomButton from '../../components/CustomButton';

const Profile = () => {
  return (
    <SafeAreaView className="min-h-screen bg-gray-100">
      <ScrollView>
        <View className="pb-16">
          <Text className="text-3xl text-white bg-gray-800 p-4 font-bold  ">
            Profile Tab
          </Text>
          <View className="min-h-screen p-4">
            <View className="profile    rounded-lg shadow-lg  ">
              <View className="image items-center mb-6">
                <Image
                  className="w-36 h-36 rounded-full"
                  source={profileImg}
                  alt="user profile"
                />
              </View>
              <View className="space-y-4">
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Name"
                  value="username"
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Email"
                  value="Email"
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Employee Id"
                  value="Employee Id"
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Department"
                  value="Department"
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="..others"
                  value="..others"
                />
              </View>
              <View className="mt-6 space-y-4">
                <CustomButton title="Update Profile" />
                <CustomButton title="Logout" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
