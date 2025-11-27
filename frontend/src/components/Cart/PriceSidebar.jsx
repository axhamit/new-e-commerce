import { useState, useEffect } from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';

const PriceSidebar = ({ cartItems }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.cuttedPrice * item.quantity), 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0);
    const finalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className={`flex flex-col lg:w-96 ${isSticky ? 'lg:sticky lg:top-24' : ''} transition-all duration-300`}>
            
            {/* Price Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-purple-900 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <PaymentsIcon sx={{ fontSize: 24, color: 'white' }} />
                        <h1 className="text-white font-semibold text-lg">Order Summary</h1>
                    </div>
                    <p className="text-gray-300 text-sm mt-1">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart</p>
                </div>

                {/* Price Details */}
                <div className="p-6 space-y-4">
                    {/* Price Row */}
                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Subtotal</span>
                        <span className="text-gray-900 font-semibold">₹{totalPrice.toLocaleString()}</span>
                    </div>

                    {/* Discount Row */}
                    <div className="flex justify-between items-center py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-3 -mx-1">
                        <div className="flex items-center gap-2">
                            <LocalOfferIcon sx={{ fontSize: 18, color: '#10B981' }} />
                            <span className="text-green-700 font-medium">Discount</span>
                        </div>
                        <span className="text-green-700 font-semibold">- ₹{totalDiscount.toLocaleString()}</span>
                    </div>

                    {/* Delivery Row */}
                    <div className="flex justify-between items-center py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl px-3 -mx-1">
                        <div className="flex items-center gap-2">
                            <DeliveryDiningIcon sx={{ fontSize: 18, color: '#3B82F6' }} />
                            <span className="text-blue-700 font-medium">Delivery</span>
                        </div>
                        <span className="text-blue-700 font-semibold">FREE</span>
                    </div>

                    {/* Divider */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-sm text-gray-500">Total Amount</span>
                        </div>
                    </div>

                    {/* Final Amount */}
                    <div className="flex justify-between items-center py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl px-4 -mx-2 border border-purple-100">
                        <span className="text-gray-900 font-bold text-lg">Total Amount</span>
                        <span className="text-gray-900 font-bold text-xl">₹{finalAmount.toLocaleString()}</span>
                    </div>

                    {/* Savings Banner */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                                <SavingsIcon sx={{ fontSize: 20, color: 'white' }} />
                            </div>
                            <div className="flex-1">
                                <p className="text-amber-800 font-semibold text-sm">Great Savings!</p>
                                <p className="text-amber-600 text-xs">
                                    You saved ₹{totalDiscount.toLocaleString()} on this order
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>Secure checkout · SSL encrypted</span>
                    </div>
                </div>
            </div>

            {/* Additional Features for Larger Screens */}
            <div className="hidden lg:block mt-6 space-y-4">
                {/* Trust Badges */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Benefits Included
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Free shipping & returns</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Luxury gift packaging</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>30-day easy returns</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Quality guarantee</span>
                        </div>
                    </div>
                </div>

                {/* Support Info */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-blue-900">Need Help?</p>
                            <p className="text-blue-700 text-sm">We're here for you</p>
                        </div>
                    </div>
                    <button className="w-full bg-white text-blue-600 hover:text-blue-700 py-2.5 rounded-xl font-medium border border-blue-200 hover:border-blue-300 transition-all duration-200 text-sm">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PriceSidebar;