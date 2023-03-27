import {CardElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect} from "react";
import {toast} from "react-toastify";

const PaymentElementsComponent = ({ck}) => {
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        console.log(ck);
    }, [ck])

    const onPay = () => {
        if (!stripe || !elements || !ck) {
            return toast.error("Error while paying.")
        }
        stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/order'
            }
        })
    }
    return <>
        <div className="payment-wrapper d-flex justify-content-center">
            <div className="payment col-8 text-center">
                {stripe && <div>
                    <PaymentElement />
                    <button  className="btn btn-dark m-4" onClick={onPay}>Pay</button>
                </div>}
            </div>
        </div>
    </>
}

export default PaymentElementsComponent