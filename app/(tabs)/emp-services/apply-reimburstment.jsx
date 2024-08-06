import {View, Text, Alert} from 'react-native'
import {Container} from '../../../components/Layout'
import {NavigateToBack} from '../../../components/Utils'
import {FormInput, showSuccess} from '../../../components/Inputs'
import {useState} from 'react'
import {ActionButtons} from '../../../components/Buttons'
import { useRouter } from 'expo-router'

const ApplyReimburstment = () => {
    const [fund,
        setFund] = useState({amount: "", title: "", desc: ""});
        const router = useRouter();

    function changeHandler(name, value) {
        setFund({
            ...fund,
            [name]: value
        })

    }

    async function HandleSubmit() {
        const {title, desc, amount} = fund;
        if (!title || !desc || !amount) {
            Alert.alert('Plese enter all the fields');
            return;
        }

        try {
            console.log('fund data added');
            showSuccess(()=>{
                router.push('/emp-services/Service'); 
                
            })
            
        } catch (error) {
            Alert.error(error.message)
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