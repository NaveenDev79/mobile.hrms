import { createSlice } from '@reduxjs/toolkit'


const attendenceSlice = createSlice({
    name:'attendence',
    initialState:{
        isChecked:false,
        checkinTime:"",
        checkoutTime:"",
        checkInForToday:false,
    },
    reducers:{
        setAttendenceInitial(state,action){ 
            const { checkinTime, checkoutTime ,isChecked} = action.payload;
            state.checkInForToday = !!checkinTime;  
            state.isChecked = isChecked;  
            state.checkinTime = checkinTime;  
            state.checkoutTime = checkoutTime;
        },
        setCheckIn(state,action){ 
            state.isChecked = true;
            state.checkInForToday=true,
            state.checkinTime = action.payload;
},
        setCheckOut(state,action){
            state.isChecked = false;
            state.checkoutTime = action.payload;
        }
    }
});


export const {setCheckIn,setCheckOut,setAttendenceInitial} = attendenceSlice.actions;
export default attendenceSlice.reducer;