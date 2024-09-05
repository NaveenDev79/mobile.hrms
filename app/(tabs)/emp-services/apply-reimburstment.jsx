import {View, Text, Alert} from 'react-native'
import {Container} from '../../../components/Layout'
import {NavigateToBack} from '../../../components/Utils'
import {FormInput, showSuccess} from '../../../components/Inputs'
import {useState} from 'react'
import {ActionButtons} from '../../../components/Buttons'
import {useRouter} from 'expo-router'
import { useSelector } from 'react-redux';
import axios from 'axios'


const ApplyReimburstment = () => {
    const [fund,
        setFund] = useState({amount: "", title: "", desc: ""});
    const router = useRouter();

    function changeHandler(name, value) {
        setFund({
            ...fund,
            [name]: value
        })

    };

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    async function HandleSubmit() {
        const {title, desc, amount} = fund;
        if (!title || !desc || !amount) {
            Alert.alert('Plese enter all the fields');
            return;
        }
        const FundData = {
            userId: user._id,
            title,
            desc,
            amount,
            AppliedOn: new Date()
        };

        try {
            const {data} = await axios.post('/refund', FundData, {
                headers: {
                    token: token
                }
            });
            if (data.success) {
                showSuccess(message = data.message, () => {
                    router.push('emp-services/Service')
                });
                setFund({amount: "", title: "", desc: ""})
            }
            Alert.alert('Error', data.message);
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    return (
        <Container classes="flex-1 h-screen px-2 py-4">
            <NavigateToBack title='Add Reimburstment'/>
            <View>
                <FormInput
                    placeholder="Enter the title"
                    value={fund.title}
                    onChange={(value) => changeHandler('title', value)}
                    type="text"
                    label="Title"/>
                <FormInput
                    placeholder="Desc.."
                    value={fund.desc}
                    onChange={(value) => changeHandler('desc', value)}
                    type="text"
                    label="Desc"/>
                <FormInput
                    placeholder="Enter the Amount"
                    value={fund.amount}
                    onChange={(value) => changeHandler('amount', value)}
                    type="Number"
                    label="Amount"/>
            </View>
            <ActionButtons
                title='Apply'
                textClasses='text-base text-white text-center font-medium'
                classes='p-4 mx-2 rounded-lg '
                changeHandler={HandleSubmit}/>

        </Container>
    )
}

export default ApplyReimburstment