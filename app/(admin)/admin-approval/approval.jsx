import {View, Text} from 'react-native'
import React from 'react'
import HeadAdminLayout from '../../../components/layout/Layout'
import { Link } from 'expo-router'

const AdminApproval = () => {
    return (
        <HeadAdminLayout bg='#F4F6F9'>
            <Text>AdminApprovalsd</Text>
            <Link href={'/admin-approval/123'}>dsf</Link>
        </HeadAdminLayout>
    )
}

export default AdminApproval