import React, {useEffect } from 'react';
import axios from 'axios';

const Cookietest: React.FC = () => {
    
    useEffect(() => {
        cookie();
    },[])

    const cookie = async():Promise<any> => {
        //const setcookie = await setCookie();
        //console.info(setcookie);

        const getcookie = await getCookie();
    }

    const setCookie = async() => { 
        return await axios.get('http://localhost:3001/api/setcookie', {withCredentials: true})
    }

    const getCookie = async() => {
        await axios.get('http://localhost:3001/api/getcookie', {withCredentials: true})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <></>
        </div>
    )
}

export default Cookietest;
