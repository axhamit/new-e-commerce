import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import DiamondIcon from '@mui/icons-material/Diamond';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const OrderConfirm = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <MetaData title="Order Confirmation | Aarohama Tresure" />

            <main className="w-full mt-16 sm:mt-4 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/20 min-h-screen pb-20">

                {/* Header Section */}
                <div className="bg-gradient-to-r from-white via-purple-50/50 to-pink-50/30 border-b-2 border-purple-100/50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center">
                            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-blue-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-purple-200/50 shadow-lg">
                                <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                                <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                                    Order Confirmation
                                </span>
                                <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                    <VerifiedIcon sx={{ fontSize: 32, color: 'white' }} />
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                                    Order <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Confirmed</span>
                                </h1>
                            </div>
                            <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
                                Review your luxury selections before proceeding to secure payment
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                    {/* Main Content Grid */}
                    <div className="flex flex-col xl:flex-row gap-8">

                        {/* Order Items Column */}
                        <div className="flex-1">
                            <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 rounded-3xl shadow-2xl border-2 border-purple-100/50 backdrop-blur-sm overflow-hidden">
                                
                                {/* Stepper Header */}
                                <div className="border-b-2 border-purple-100/50 bg-white/50 backdrop-blur-sm">
                                    <div className="p-6">
                                        <Stepper activeStep={2} />
                                    </div>
                                </div>

                                {/* Order Items Section */}
                                <div className="p-6 lg:p-8">
                                    {/* Order Summary Header */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                            <AutoAwesomeIcon sx={{ fontSize: 24, color: 'white' }} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Order Summary</h2>
                                            <p className="text-gray-600 font-light">Review your curated luxury selections</p>
                                        </div>
                                    </div>

                                    {/* Cart Items List */}
                                    <div className="space-y-4 mb-8">
                                        {cartItems?.map((item, i) => (
                                            <div 
                                                key={i} 
                                                className="transform hover:scale-[1.02] transition-all duration-500 hover:shadow-xl rounded-2xl overflow-hidden"
                                            >
                                                <CartItem {...item} inCart={false} />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Email Confirmation & Continue Section */}
                                    <div className="bg-gradient-to-r from-purple-50/80 via-blue-50/80 to-cyan-50/80 rounded-2xl border-2 border-purple-200/50 p-6 lg:p-8 backdrop-blur-sm shadow-lg">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg mt-1">
                                                    <EmailIcon sx={{ fontSize: 20, color: 'white' }} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-700 font-semibold text-sm sm:text-base mb-2">
                                                        Order confirmation will be sent to
                                                    </p>
                                                    <p className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-bold text-lg sm:text-xl mb-2">
                                                        {user.email}
                                                    </p>
                                                    <p className="text-gray-500 text-xs sm:text-sm font-light">
                                                        Check your inbox and spam folder for exclusive updates and tracking information
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <button 
                                                onClick={() => { navigate('/process/payment') }}
                                                className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 sm:px-8 py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-3 whitespace-nowrap border-2 border-amber-400/20 min-w-[200px]"
                                            >
                                                Continue to Payment
                                                <ArrowForwardIcon sx={{ fontSize: 20 }} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Additional Information */}
                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border-2 border-emerald-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                                                    <LocalShippingIcon sx={{ fontSize: 20, color: 'white' }} />
                                                </div>
                                                <p className="font-bold text-gray-900 text-lg">Premium Delivery</p>
                                            </div>
                                            <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
                                                Express delivery within 3-5 business days with white-glove service and luxury packaging
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border-2 border-blue-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                                                    <AssignmentReturnIcon sx={{ fontSize: 20, color: 'white' }} />
                                                </div>
                                                <p className="font-bold text-gray-900 text-lg">Hassle-Free Returns</p>
                                            </div>
                                            <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
                                                30-day return policy with complimentary pickup service for your convenience
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Sidebar */}
                        <div className="xl:w-96">
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                        <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <VerifiedIcon sx={{ fontSize: 20, color: 'white' }} />
                            </div>
                            <p className="font-semibold text-gray-900 text-xs sm:text-sm">Authentic Luxury</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <LocalShippingIcon sx={{ fontSize: 20, color: 'white' }} />
                            </div>
                            <p className="font-semibold text-gray-900 text-xs sm:text-sm">Secure Shipping</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <AssignmentReturnIcon sx={{ fontSize: 20, color: 'white' }} />
                            </div>
                            <p className="font-semibold text-gray-900 text-xs sm:text-sm">Easy Returns</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <DiamondIcon sx={{ fontSize: 20, color: 'white' }} />
                            </div>
                            <p className="font-semibold text-gray-900 text-xs sm:text-sm">Premium Quality</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                <button 
                    onClick={() => { navigate('/process/payment') }}
                    className="group bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 flex items-center gap-2 border-2 border-amber-400/20"
                >
                    <span className="text-sm sm:text-base">Continue</span>
                    <ArrowForwardIcon sx={{ fontSize: 18 }} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -z-10"></div>
        </>
    );
};

export default OrderConfirm;