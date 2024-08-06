import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import {View, Text, TouchableOpacity} from 'react-native';

const NavigateToBack = ({
    title,
    Icon = "",
    onNext
}) => {
    const router = useRouter();
    return (
        <View className="flex my-4 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-sharp" size={32} color="#5F66E1"/>
            </TouchableOpacity>
            <Text className="text-xl font-medium text-[#5F66E1]">{title}</Text>
            {Icon
                ? (
                    <TouchableOpacity onPress={onNext}>
                       {Icon}
                    </TouchableOpacity>
                )
                : <Text></Text>}
        </View>
    )
}


export const HRLINE = ({ classes }) => <View className={classes} />;
export {NavigateToBack}