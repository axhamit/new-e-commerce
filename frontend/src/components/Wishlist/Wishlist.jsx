import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import MinCategory from '../Layouts/MinCategory';
import Sidebar from '../User/Sidebar';
import Product from './Product';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Link } from 'react-router-dom';

const Wishlist = () => {

    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <>
            <MetaData title="Wishlist | Aarohama Tresure" />

            {/* <MinCategory /> */}
            <main className="w-full mt-16 sm:mt-4 bg-gray-50 min-h-screen">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header Section */}
                    <div className="text-center mb-8 mt-28">
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-blue-50/80 backdrop-blur-xl rounded-2xl mb-4 border border-pink-200/50 shadow-lg">
                            <FavoriteIcon sx={{ fontSize: 20, color: '#EC4899' }} className="mr-2" />
                            <span className="text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                                My Wishlist
                            </span>
                            <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="ml-2" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                            Saved <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Favorites</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
                            Your curated collection of luxury items
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <Sidebar activeTab={"wishlist"} />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                
                                {/* Wishlist Header */}
                                <div className="px-6 py-5 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                My Wishlist
                                            </h2>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                                            </p>
                                        </div>
                                        {wishlistItems.length > 0 && (
                                            <Link 
                                                to="/products" 
                                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                                            >
                                                Continue Shopping
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Empty State */}
                                {wishlistItems.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                                        <div className="w-48 h-48 mb-6 relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                                                <FavoriteIcon sx={{ fontSize: 64, color: '#EC4899', opacity: 0.3 }} />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                                                    <FavoriteIcon sx={{ fontSize: 32, color: '#EC4899' }} />
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h3>
                                        <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
                                            Discover amazing products and add them to your wishlist. They'll be saved here for you to revisit later.
                                        </p>
                                        <Link 
                                            to="/products" 
                                            className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            Start Shopping
                                        </Link>
                                    </div>
                                )}

                                {/* Wishlist Items Grid */}
                                {wishlistItems.length > 0 && (
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {wishlistItems.map((item, index) => (
                                                <div key={index} className="transform hover:-translate-y-1 transition-all duration-300">
                                                    <Product {...item} />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Wishlist Stats */}
                                        <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                                <div className="text-center sm:text-left">
                                                    <p className="text-sm text-gray-600 font-medium">Total Items</p>
                                                    <p className="text-2xl font-bold text-gray-900">{wishlistItems.length}</p>
                                                </div>
                                                <div className="text-center sm:text-left">
                                                    <p className="text-sm text-gray-600 font-medium">Ready to Purchase</p>
                                                    <p className="text-lg font-semibold text-green-600">All items in stock</p>
                                                </div>
                                                <Link 
                                                    to="/products" 
                                                    className="bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                                                >
                                                    Browse More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    {wishlistItems.length > 0 && (
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                                        <FavoriteIcon sx={{ fontSize: 24, color: 'white' }} />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Save for Later</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Keep items you love in one place and purchase them when you're ready.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                        <DiamondIcon sx={{ fontSize: 24, color: 'white' }} />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Price Alerts</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Get notified when items in your wishlist go on sale or price drops.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900">Stock Updates</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    We'll notify you if any items in your wishlist are running low in stock.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Wishlist;