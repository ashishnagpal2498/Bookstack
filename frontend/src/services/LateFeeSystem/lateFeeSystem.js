export const createLateFee = async ( user_id, book_id, reserved_date) => {
    try {
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id, book_id, reserved_date})
        }
        // const response = await fetch(`https://book-stack-q5ux.onrender.com/late-fees/create`, postOptions);
        const response = await fetch(`http://localhost:8080/late-fees/create`, postOptions);
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const checkActiveLateFee = async(user_id) => {
    try{
        // const response = await fetch(`https://book-stack-q5ux.onrender.com/late-fees/check-restriction/${user_id}`);
        const response = await fetch(`http://localhost:8080/late-fees/check-restriction/${user_id}`);
        const data = await response.json();
        return data; 
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const getActiveLateFeesUsers = async() => {
    try{
        // const response = await fetch(`https://book-stack-q5ux.onrender.com/late-fees/active-users`);
        const response = await fetch(`http://localhost:8080/late-fees/active-users`);
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const getUserDetails = async(user_id) => {
    try{
        // const response = await fetch(`https://book-stack-q5ux.onrender.com/late-fees/user-details/${user_id}`);
        const response = await fetch(`http://localhost:8080/late-fees/user-details/${user_id}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const getActiveLateFeeDetails = async(user_id) => {
    try{
        // const response = await fetch(`https://book-stack-q5ux.onrender.com/late-fees/active-fee-details/${user_id}`);
        const response = await fetch(`http://localhost:8080/late-fees/active-fee-details/${user_id}`);
        const data = await response.json();
        return data; 
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const getPastLateFees = async(user_id) => {
    try{
        // const response = await fetch(`https://book-stack-q5ux.onrender.com/late-fees/past-fee-details/${user_id}`);
        const response = await fetch(`http://localhost:8080/late-fees/past-fee-details/${user_id}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const clearActiveLateFee = async(user_id) => {
    try{
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id})
        }
        // const response = await fetch(`https://book-stack-q5ux.onrender.com/late-fees/clear-fee`, postOptions);
        const response = await fetch(`http://localhost:8080/late-fees/clear-fee`, postOptions);
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}