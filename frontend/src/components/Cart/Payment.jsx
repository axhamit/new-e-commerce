import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { post } from '../../utils/paytmForm';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Payment = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [payDisable, setPayDisable] = useState(false);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        setPayDisable(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                '/api/v1/payment/process',
                paymentData,
                config,
            );

            let info = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: data.paytmParams
            }

            post(info)

        } catch (error) {
            setPayDisable(false);
            enqueueSnackbar(error, { variant: "error" });
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);


    return (
        <>
            <MetaData title="ELARA: Secure Payment" />

            <main className="w-full mt-16 bg-gray-50 min-h-screen">

                {/* Header Section */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center gap-3 mb-2">
                            <PaymentIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Secure Payment</h1>
                        </div>
                        <p className="text-gray-600">Complete your purchase with secure payment methods</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Main Content Grid */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Payment Form Column */}
                        <div className="flex-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                
                                {/* Stepper Header */}
                                <div className="border-b border-gray-200">
                                    <Stepper activeStep={3} />
                                </div>

                                {/* Payment Section */}
                                <div className="p-6 lg:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                                            <LockIcon sx={{ fontSize: 24, color: 'white' }} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                                            <p className="text-gray-600 text-sm">Choose your preferred payment option</p>
                                        </div>
                                    </div>

                                    <form onSubmit={(e) => submitHandler(e)} autoComplete="off" className="space-y-6">
                                        
                                        {/* Payment Methods */}
                                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                            <FormControl component="fieldset" className="w-full">
                                                <RadioGroup
                                                    aria-labelledby="payment-radio-group"
                                                    defaultValue="paytm"
                                                    name="payment-radio-button"
                                                    className="space-y-4"
                                                >
                                                    <FormControlLabel
                                                        value="paytm"
                                                        control={
                                                            <Radio 
                                                                sx={{
                                                                    color: '#8b5cf6',
                                                                    '&.Mui-checked': {
                                                                        color: '#8b5cf6',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300">
                                                                <img 
                                                                    draggable="false" 
                                                                    className="h-8 w-8 object-contain" 
                                                                    src="https://rukminim1.flixcart.com/www/96/96/promos/01/09/2020/a07396d4-0543-4b19-8406-b9fcbf5fd735.png" 
                                                                    alt="Paytm Logo" 
                                                                />
                                                                <div className="flex-1">
                                                                    <span className="font-semibold text-gray-900">Paytm</span>
                                                                    <p className="text-gray-500 text-sm">Pay securely with Paytm Wallet, UPI or Net Banking</p>
                                                                </div>
                                                            </div>
                                                        }
                                                        className="m-0"
                                                    />
                                                    
                                                    {/* Additional payment methods can be added here */}
                                                    <FormControlLabel
                                                        value="card"
                                                        control={
                                                            <Radio 
                                                                sx={{
                                                                    color: '#8b5cf6',
                                                                    '&.Mui-checked': {
                                                                        color: '#8b5cf6',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300">
                                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                                    <CreditCardIcon sx={{ fontSize: 18, color: 'white' }} />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <span className="font-semibold text-gray-900">Credit/Debit Card</span>
                                                                    <p className="text-gray-500 text-sm">Pay with Visa, Mastercard, or Rupay</p>
                                                                </div>
                                                            </div>
                                                        }
                                                        className="m-0"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

                                        {/* Security Assurance */}
                                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                            <div className="flex items-center gap-3">
                                                <SecurityIcon sx={{ fontSize: 20, color: '#10b981' }} />
                                                <div>
                                                    <p className="text-green-800 font-medium text-sm">Secure & Encrypted Payment</p>
                                                    <p className="text-green-600 text-xs mt-1">Your payment information is protected with 256-bit SSL encryption</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <button 
                                                type="submit" 
                                                disabled={payDisable}
                                                className={`${
                                                    payDisable 
                                                        ? "bg-gray-400 cursor-not-allowed" 
                                                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl transform hover:scale-105"
                                                } text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 flex-1`}
                                            >
                                                <PaymentIcon sx={{ fontSize: 24 }} />
                                                {payDisable ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
                                            </button>
                                            
                                            <button 
                                                type="button"
                                                onClick={() => window.history.back()}
                                                className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300"
                                            >
                                                Back to Review
                                            </button>
                                        </div>
                                    </form>

                                    {/* Payment Benefits */}
                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="text-blue-600 text-lg">🔒</span>
                                            </div>
                                            <p className="font-semibold text-gray-900">Secure Payment</p>
                                            <p className="text-gray-600 text-xs mt-1">256-bit SSL encryption</p>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="text-green-600 text-lg">⚡</span>
                                            </div>
                                            <p className="font-semibold text-gray-900">Instant Confirmation</p>
                                            <p className="text-gray-600 text-xs mt-1">Immediate order processing</p>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="text-purple-600 text-lg">🛡️</span>
                                            </div>
                                            <p className="font-semibold text-gray-900">Buyer Protection</p>
                                            <p className="text-gray-600 text-xs mt-1">30-day return policy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Sidebar */}
                        <div className="lg:w-96">
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Payment;