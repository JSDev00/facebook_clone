import axios from 'axios';
export const loginCall = async (userCredianiatils,dispatch)=>{
    dispatch({type:'LOGIN_START'});
    try {
        const res =  await axios.post('/api/auth/login',userCredianiatils);
        dispatch({type:'LOGIN_SUCCESS',payload:res.data});
        
    } catch (error) {
        dispatch({type:'LOGIN_FAILURE',payload:error});
        
    }
}