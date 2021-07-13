import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    token: null,
    isLoggedIn: false,
    user:null
    
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            
            
            const token=action.payload.token
            localStorage.setItem("token", token)
            state.token = token
            state.isLoggedIn = true;
            state.user=action.payload.user
        },
        logout(state, action) {
            localStorage.clear()
            return initialState
        }

    },
});

export const authActions = authSlice.actions;

export default authSlice;