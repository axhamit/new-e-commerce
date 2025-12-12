import { Link } from 'react-router-dom';

const EmptyCart = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
            {/* Background decorative elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-amber-100/20 to-orange-100/20 rounded-full blur-3xl -z-10"></div>

            {/* Main Empty Cart Section */}
            <div className="max-w-md w-full text-center">
                {/* Decorative icon */}
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border-2 border-purple-200 shadow-lg">
                    <div className="w-20 h-20">
                        <img 
                            draggable="false" 
                            className="w-full h-full object-contain" 
                            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png" 
                            alt="Empty Cart" 
                        />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Cart</span> is Empty
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-8 text-lg">
                    Add items to begin your luxury shopping journey
                </p>

                {/* Shop Now Button - Matching home page style */}
                <Link 
                    to="/products" 
                    className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-purple-500/20"
                >
                    <span>Start Shopping</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>

                {/* Return Home Link */}
                <div className="mt-6">
                    <Link 
                        to="/" 
                        className="text-gray-500 hover:text-purple-600 transition-colors duration-300 inline-flex items-center text-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmptyCart;