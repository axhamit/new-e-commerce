import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const OrderConfirm = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <MetaData title="ELARA: Order Confirmation" />

            <main className="w-full mt-16 bg-gray-50 min-h-screen">

                {/* Header Section */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center gap-3 mb-2">
                            <VerifiedIcon sx={{ fontSize: 32, color: '#10b981' }} />
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Order Confirmation</h1>
                        </div>
                        <p className="text-gray-600">Review your items before proceeding to payment</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Main Content Grid */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Order Items Column */}
                        <div className="flex-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                
                                {/* Stepper Header */}
                                <div className="border-b border-gray-200">
                                    <Stepper activeStep={2} />
                                </div>

                                {/* Order Items Section */}
                                <div className="p-6 lg:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                                            <VerifiedIcon sx={{ fontSize: 24, color: 'white' }} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                                            <p className="text-gray-600 text-sm">Review your selected items</p>
                                        </div>
                                    </div>

                                    {/* Cart Items List */}
                                    <div className="space-y-4">
                                        {cartItems?.map((item, i) => (
                                            <div key={i} className="transform hover:scale-[1.02] transition-all duration-300">
                                                <CartItem {...item} inCart={false} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Email Confirmation & Continue Section */}
                                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mt-1">
                                                    <EmailIcon sx={{ fontSize: 20, color: 'white' }} />
                                                </div>
                                                <div>
                                                    <p className="text-gray-900 font-semibold text-sm">
                                                        Order confirmation email will be sent to
                                                    </p>
                                                    <p className="text-blue-600 font-medium text-lg mt-1">
                                                        {user.email}
                                                    </p>
                                                    <p className="text-gray-500 text-xs mt-2">
                                                        Check your inbox and spam folder for order updates
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <button 
                                                onClick={() => { navigate('/process/payment') }}
                                                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 whitespace-nowrap"
                                            >
                                                Continue to Payment
                                                <ArrowForwardIcon sx={{ fontSize: 20 }} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Additional Information */}
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <p className="font-semibold text-gray-900 mb-2">📦 Delivery Information</p>
                                            <p className="text-gray-600">Items will be delivered within 3-5 business days</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <p className="font-semibold text-gray-900 mb-2">🔄 Return Policy</p>
                                            <p className="text-gray-600">30-day return policy for all items</p>
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

export default OrderConfirm;