import React, { useEffect, useState } from 'react'; 
import HeadAdminLayout from '../../components/layout/Layout'; 
import { useSelector } from 'react-redux';
import Header from '../../components/admin/Utils'; 
import { ActionCard, ActionPendingCard, DataCard } from '../../components/admin/admin.utils';
import axios from 'axios';

const AdminHome = () => {
    const token = useSelector((state) => state.auth.token);

    const [leaveStats, setLeaveStats] = useState({ Pending: 0, Approved: 0 });
    const [refundStats, setRefundStats] = useState({ Pending: 0, Approved: 0 }); 
    const [refundlist, setrefundlist] = useState([])
    const [leaveList, setleaveList] = useState([])

    async function FetchLeaveNumbers() {
        try {
            const response = await axios.get('/leave/get/stats/', {
                headers: { token} }
            );
            setLeaveStats(response.data.data);
        } catch (error) {
            console.error('Error fetching leave numbers:', error);
        }
    }
    async function FetchLeave() {
        try {
            const response = await axios.get('/leave/admin/leave/', {
                headers: { token} }
            );
            setleaveList(response.data.data);
        } catch (error) {
            console.error('Error fetching leave numbers:', error);
        }
    }

    async function FetchRefundNumbers() {
        try {
            const response = await axios.get('/refund/get/stats/', {
                headers: { token} }
            );
            setRefundStats(response.data.data);
        } catch (error) {
            console.error('Error fetching refund numbers:', error);
        }
    }

    async function FetchRefund() {
        try {
            const response = await axios.get('/refund/admin/refund/', {
                headers: { token} }
            );
            setrefundlist(response.data.data);
        } catch (error) {
            console.error('Error fetching refund numbers:', error);
        }
    }

    useEffect(() => {
        FetchLeaveNumbers();
        FetchRefundNumbers();
        FetchRefund();
        FetchLeave();
    }, []); 

    return (
        <HeadAdminLayout>
            <Header title='Home' />
            <ActionPendingCard
                num={{
                    leave: leaveStats.Pending,
                    refund: refundStats.Pending
                }}
                title={{
                    1: "Leave",
                    2: "Refund"
                }}
            />
            <DataCard item={{num:refundStats.Approved,total:refundStats.Total,title:"Reimburstment "}} />
            <DataCard item={{num:leaveStats.Approved,total:'',title:"Leave "}} />
            
            <ActionCard title='Reimburstment' data={refundlist} />
            <ActionCard title='Leave' data={leaveList}  />
        </HeadAdminLayout>
    );
}

export default AdminHome;
