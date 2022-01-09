import React, {useEffect } from 'react';
import axios from 'axios';

const Cookietest: React.FC = () => {
    
    useEffect(() => {
        cookie();
    },[])

    const cookie = async():Promise<any> => {
        const setcookie = await setCookie();
        console.info(setcookie);

        const getcookie = await getCookie();
        console.info(getcookie);
    }

    const setCookie = async() => { 
        return await axios.get('http://localhost:3001/api/setcookie', {withCredentials: true})
    }

    const getCookie = async() => {
        return await axios.get('http://localhost:3001/api/getcookie', {withCredentials: true})
    }

    return (
        <div>
            <></>
        </div>
    )
}

export default Cookietest;
