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


export const {setCheckIn,setCheckOut} = attendenceSlice.actions;
export default attendenceSlice.reducer;