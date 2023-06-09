import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {activateAccount} from "../services/user.service";
import {toast} from "react-toastify";


const ActivationAccountPageComponent = () => {
    const [message, setMessage] = useState('')
    const {userId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('user id..', userId);
        if (userId) {
            activateAccount(userId)
                .then(response => {
                    console.log(response);
                    setMessage('Successfully activated account. Redirecting to login page.')
                    setTimeout(() => {
                        navigate('/login')
                    }, 5000)
                })
                .catch(error => {
                    console.log(error);
                    toast.error(error.status === 410 ? error?.response?.data : error.message)
                })
        } else {
            toast.error('Not valid user for activation.')
            navigate('/')
        }
    }, [userId])

    return <>
        <div className="text-center m-5">
            <h1 className="m-5">Activate account page</h1>
            <p>
                {message}
            </p>
        </div>
    </>
}

export default ActivationAccountPageComponent