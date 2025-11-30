import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';
import SaveForLaterItem from './SaveForLaterItem';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { saveForLaterItems } = useSelector((state) => state.saveForLater);
    
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set());

    const placeOrderHandler = () => {
        navigate('/login?redirect=shipping');
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setSelectedItems(new Set()); // Clear selection when exiting edit mode
        }
    }

    const toggleItemSelection = (itemId) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(itemId)) {
            newSelected.delete(itemId);
        } else {
            newSelected.add(itemId);
        }
        setSelectedItems(newSelected);
    }

    const selectAllItems = () => {
        if (selectedItems.size === cartItems.length) {
            setSelectedItems(new Set());
        } else {
            const allItemIds = new Set(cartItems.map(item => item.product));
            setSelectedItems(allItemIds);
        }
    }

    const removeSelectedItems = () => {
        // Dispatch action to remove selected items from cart
        selectedItems.forEach(itemId => {
            // dispatch(removeFromCart(itemId));
        });
        setSelectedItems(new Set());
        if (selectedItems.size === cartItems.length) {
            setIsEditing(false);
        }
    }

    const moveSelectedToWishlist = () => {
        // Dispatch action to move selected items to wishlist
        selectedItems.forEach(itemId => {
            // dispatch(moveToWishlist(itemId));
        });
        setSelectedItems(new Set());
        setIsEditing(false);
    }

    const selectedItemsCount = selectedItems.size;
    const isAllSelected = selectedItems.size === cartItems.length && cartItems.length > 0;

    return (
        <>
            <MetaData title="Shopping Bag | Aarohama Tresure" />
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 pt-16 sm:pt-20">
                
                {/* Header Section */}
                <div className="bg-white border-b border-gray-100 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                                    <ShoppingBagIcon className="text-white text-lg sm:text-xl" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900">Shopping Bag</h1>
                                    <p className="text-gray-600 font-light text-xs sm:text-sm lg:text-base mt-1">
                                        {cartItems.length > 0 
                                            ? `Your curated selection of ${cartItems.length} luxury items`
                                            : "Your luxury shopping bag is waiting to be filled"
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {cartItems.length > 0 && (
                                    <>
                                        <button 
                                            onClick={toggleEditMode}
                                            className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base ${
                                                isEditing 
                                                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                                                    : 'bg-white border border-gray-300 hover:border-gray-400 text-gray-700'
                                            }`}
                                        >
                                            {isEditing ? (
                                                <>
                                                    <CheckIcon sx={{ fontSize: 18 }} />
                                                    Done Editing
                                                </>
                                            ) : (
                                                <>
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                    Edit Selection
                                                </>
                                            )}
                                        </button>
                                        <button 
                                            onClick={() => navigate('/products')}
                                            className="bg-white border border-amber-600 text-amber-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-amber-50 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
                                        >
                                            Continue Shopping
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
                    <div className="flex flex-col xl:flex-row gap-6 sm:gap-8">

                        {/* Left Column - Cart Items */}
                        <div className="flex-1 space-y-6">
                            
                            {/* Cart Items Section */}
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100">
                                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <span className="text-lg sm:text-xl font-light text-gray-900">My Selection</span>
                                            <span className="bg-amber-100 text-amber-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                                            </span>
                                        </div>
                                        
                                        {/* Edit Mode Actions */}
                                        {isEditing && cartItems.length > 0 && (
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <button 
                                                    onClick={selectAllItems}
                                                    className="text-amber-600 hover:text-amber-700 font-medium text-xs sm:text-sm transition-colors flex items-center gap-1"
                                                >
                                                    {isAllSelected ? 'Deselect All' : 'Select All'}
                                                </button>
                                                {selectedItemsCount > 0 && (
                                                    <>
                                                        <span className="text-gray-300">|</span>
                                                        <button 
                                                            onClick={removeSelectedItems}
                                                            className="text-red-600 hover:text-red-700 font-medium text-xs sm:text-sm transition-colors flex items-center gap-1"
                                                        >
                                                            <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                                                            Remove ({selectedItemsCount})
                                                        </button>
                                                        <span className="text-gray-300">|</span>
                                                        <button 
                                                            onClick={moveSelectedToWishlist}
                                                            className="text-pink-600 hover:text-pink-700 font-medium text-xs sm:text-sm transition-colors flex items-center gap-1"
                                                        >
                                                            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                                                            Save ({selectedItemsCount})
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {cartItems && cartItems.length === 0 ? (
                                    <EmptyCart />
                                ) : (
                                    <>
                                        {/* Edit Mode Header */}
                                        {isEditing && (
                                            <div className="bg-blue-50 border-b border-blue-200 px-4 sm:px-6 lg:px-8 py-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-blue-800 text-sm font-medium">
                                                        {selectedItemsCount} of {cartItems.length} items selected
                                                    </p>
                                                    <button 
                                                        onClick={toggleEditMode}
                                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                                                    >
                                                        <ClearIcon sx={{ fontSize: 16 }} />
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="divide-y divide-gray-100">
                                            {cartItems && cartItems.map((item, index) => (
                                                <div key={index} className="relative">
                                                    {isEditing && (
                                                        <div className="absolute left-4 top-4 z-10">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedItems.has(item.product)}
                                                                onChange={() => toggleItemSelection(item.product)}
                                                                className="w-5 h-5 text-amber-600 bg-white border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className={isEditing ? 'pl-12 pr-4' : ''}>
                                                        <CartItem 
                                                            {...item} 
                                                            inCart={true} 
                                                            isEditing={isEditing}
                                                            isSelected={selectedItems.has(item.product)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Place Order Button */}
                                        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-gray-100 bg-gray-50">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                <div className="text-center sm:text-left">
                                                    <p className="text-gray-600 font-light text-xs sm:text-sm">
                                                        Free shipping & returns on all orders
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={placeOrderHandler}
                                                    disabled={isEditing}
                                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg min-w-[160px] sm:min-w-[200px]"
                                                >
                                                    {isEditing ? 'Finish Editing to Checkout' : 'Proceed to Checkout'}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Saved For Later Section */}
                            {saveForLaterItems.length > 0 && (
                                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <FavoriteBorderIcon className="text-rose-500 text-lg sm:text-xl" />
                                            <span className="text-lg sm:text-xl font-light text-gray-900">Saved For Later</span>
                                            <span className="bg-rose-100 text-rose-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                                {saveForLaterItems.length} {saveForLaterItems.length === 1 ? 'item' : 'items'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {saveForLaterItems && saveForLaterItems.map((item, index) => (
                                            <SaveForLaterItem {...item} key={index} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Luxury Services */}
                            {cartItems.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                                    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center border border-gray-100 hover:shadow-md transition-all duration-300 group">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <LocalShippingIcon className="text-blue-600 text-base sm:text-xl" />
                                        </div>
                                        <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Free Shipping</h3>
                                        <p className="text-gray-600 text-xs sm:text-sm font-light">On orders over ₹499</p>
                                    </div>
                                    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center border border-gray-100 hover:shadow-md transition-all duration-300 group">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <AssignmentReturnIcon className="text-green-600 text-base sm:text-xl" />
                                        </div>
                                        <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Easy Returns</h3>
                                        <p className="text-gray-600 text-xs sm:text-sm font-light">30-day return policy</p>
                                    </div>
                                    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 text-center border border-gray-100 hover:shadow-md transition-all duration-300 group">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <DesignServicesIcon className="text-purple-600 text-base sm:text-xl" />
                                        </div>
                                        <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Tailoring</h3>
                                        <p className="text-gray-600 text-xs sm:text-sm font-light">Complimentary alterations</p>
                                    </div>
                                </div>
                            )}

                            {/* Empty State CTA */}
                            {cartItems.length === 0 && (
                                <div className="text-center mt-6 sm:mt-8">
                                    <button 
                                        onClick={() => navigate('/products')}
                                        className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none"
                                    >
                                        Explore Luxury Collections
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Price Sidebar */}
                        <div className="xl:w-96 w-full">
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>

                    {/* Trust Badges */}
                    {cartItems.length > 0 && (
                        <div className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
                                {[
                                    { icon: "🔒", title: "Secure Payment", desc: "256-bit SSL encryption" },
                                    { icon: "🌟", title: "Authentic Luxury", desc: "100% genuine products" },
                                    { icon: "💎", title: "Quality Assured", desc: "Premium craftsmanship" },
                                    { icon: "📞", title: "Style Support", desc: "Personal shopping advice" }
                                ].map((badge, index) => (
                                    <div key={index} className="p-2 sm:p-4">
                                        <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{badge.icon}</div>
                                        <h4 className="font-medium text-gray-900 text-xs sm:text-sm mb-1">{badge.title}</h4>
                                        <p className="text-gray-500 text-xs font-light leading-tight">{badge.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Cart;