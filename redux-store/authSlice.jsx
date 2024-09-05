import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedIn:false,
        user:null,
        token:"",
    },
    reducers:{
        setLoggedIn(state,action){
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;

        },
        setLoggedOut(state){
            state.isLoggedIn=false;
            state.user = null;
            state.token="";

        }
    }
});


export const {setLoggedIn,setLoggedOut} = authSlice.actions;
export default authSlice.reducer;

export const loadLocalStorageData = () => async dispatch => {
    try {
        let data = await AsyncStorage.getItem('@data');
        let loginData = JSON.parse(data);
        if (loginData) {
            dispatch(setLogin({ user: loginData.user, token: loginData.token }));
        }
    } catch (error) {
        console.error("Failed to load data from AsyncStorage", error);
    }
};
