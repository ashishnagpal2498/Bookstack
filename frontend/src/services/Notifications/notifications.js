// Author - Abhinav Acharya Tirumala Vinjamuri
import {backend_url} from '../../util/config';

export const remindUserLateFee = async(user_id) => {
    try{
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
         }
        const response = await fetch(`${backend_url}/notify/late-fee-reminder-user/${user_id}`, postOptions); 
        // const response = await fetch(`http://localhost:8080/notify/late-fee-reminder-user/${user_id}`, postOptions); 
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const disputeLateFeeCharge = async(user_id) => {
    try{
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
         }
        const response = await fetch(`${backend_url}/notify/late-fee-dispute-charge/${user_id}`, postOptions);
        // const response = await fetch(`http://localhost:8080/notify/late-fee-dispute-charge/${user_id}`);
        const data = await response.json();
        // console.log(data);
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }    
}