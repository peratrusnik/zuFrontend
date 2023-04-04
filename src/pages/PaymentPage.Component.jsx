import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ShopService from "../services/shop.service";
import {toast} from "react-toastify";
import {CardElement, Elements} from "@stripe/react-stripe-js";
import PaymentElementsComponent from "../components/payment/PaymentElements.Component";
// public key
const pk = 'pk_test_51MtBuXEdr6WugQ8Xxoo4cIuemWTiLd7acHptY6wHPUVRmcv3j9NzzI06axbfJYMnUUvQakPQlfSupDsC5tNXezMT00gO5vWEvB'
const stripeObj = loadStripe(pk)
const PaymentPageComponent = () => {
    // client key
    const [ck, setCk] = useState('')
    const totalPrice = useSelector(state => state.cartStore.totalPrice)
    // todo: add logic for switching curr in nav bar component
    const cur = "eur"
    const stripeOption = {clientSecret: ck}

    useEffect(() => {
        console.log(ck);
    }, [ck])
    useEffect(() => {
        console.log(totalPrice);

        totalPrice && ShopService
            .InitPayment({amount: totalPrice, currency: cur})
            .then(response => {
                console.log(response);
                setCk(response.data.client_secret)
            })
            .catch(error => {
                console.log(error);
                toast.error("Error on init payment. Please try later.")
            })
    }, [totalPrice])
    return <>
        {
            ck && <Elements stripe={stripeObj} options={stripeOption}>
                <PaymentElementsComponent ck={ck}/>
            </Elements>
        }
    </>
}

export default PaymentPageComponent