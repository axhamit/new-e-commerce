import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';
import { saveForLater } from '../../actions/saveForLaterAction';
import { Link } from 'react-router-dom';

// Material-UI Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DiamondIcon from '@mui/icons-material/Diamond';

const CartItem = ({ product, name, seller, price, cuttedPrice, image, stock, quantity, inCart, isEditing, isSelected }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (quantity >= stock) {
            enqueueSnackbar("Maximum Order Quantity Reached", { variant: "warning" });
            return;
        };
        dispatch(addItemsToCart(id, newQty));
        enqueueSnackbar("Quantity increased", { variant: "success" });
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) {
            enqueueSnackbar("Minimum quantity is 1", { variant: "info" });
            return;
        }
        dispatch(addItemsToCart(id, newQty));
        enqueueSnackbar("Quantity decreased", { variant: "success" });
    }
    
    const removeCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
        enqueueSnackbar("Item removed from cart", { variant: "success" });
    }

    const saveForLaterHandler = (id) => {
        dispatch(saveForLater(id));
        removeCartItem(id);
        enqueueSnackbar("Saved for later", { variant: "success" });
    }

    const totalPrice = price * quantity;
    const totalCuttedPrice = cuttedPrice * quantity;
    const discountAmount = totalCuttedPrice - totalPrice;
    const discountPercentage = getDiscount(price, cuttedPrice);

    return (
        <div className={`flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 border-b border-gray-100 transition-all duration-300 ${
            isEditing ? 'bg-blue-50/30' : 'bg-white hover:bg-gray-50'
        } ${isSelected ? 'ring-2 ring-amber-500 ring-opacity-20' : ''}`}>

            {/* Main Content Row */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start w-full">
                
                {/* Product Image */}
                <div className="flex gap-4 w-full lg:w-auto">
                    {isEditing && (
                        <div className="flex items-start pt-1">
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="w-5 h-5 text-amber-600 bg-white border-gray-300 rounded focus:ring-amber-500 focus:ring-2 cursor-pointer"
                            />
                        </div>
                    )}
                    <Link to={`/product/${product}`} className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden border border-gray-200 bg-white group hover:shadow-lg transition-all duration-300">
                            <img 
                                draggable="false" 
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                src={image} 
                                alt={name} 
                            />
                        </div>
                    </Link>
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                    
                    {/* Product Info */}
                    <div className="flex-1 space-y-3">
                        <Link to={`/product/${product}`} className="group block">
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg group-hover:text-amber-600 transition-colors duration-200 line-clamp-2 leading-tight">
                                {name}
                            </h3>
                        </Link>
                        
                        {/* Seller Info */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Seller</span>
                            <span className="text-sm text-gray-700 font-medium">{seller}</span>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Premium Partner</span>
                        </div>

                        {/* Price Section */}
                        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{totalPrice.toLocaleString()}</span>
                            <span className="text-lg text-gray-500 line-through font-medium">₹{totalCuttedPrice.toLocaleString()}</span>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {discountPercentage}% OFF
                            </span>
                        </div>

                        {/* Savings Badge */}
                        {discountAmount > 0 && (
                            <div className="flex items-center gap-2">
                                <DiamondIcon sx={{ fontSize: 16, color: '#F59E0B' }} />
                                <span className="text-sm text-amber-700 font-medium">
                                    You save ₹{discountAmount.toLocaleString()}
                                </span>
                            </div>
                        )}

                        {/* Delivery Info */}
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <LocalShippingIcon sx={{ fontSize: 16, color: '#10B981' }} />
                                <span>Delivery by {getDeliveryDate()}</span>
                                <span className="text-green-600 font-medium">FREE</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <AutorenewIcon sx={{ fontSize: 16, color: '#3B82F6' }} />
                                <span>7 Days Replacement</span>
                            </div>
                        </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:items-end gap-4">
                        <div className="flex items-center gap-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-sm">
                                <button 
                                    onClick={() => decreaseQuantity(product, quantity)}
                                    disabled={quantity <= 1}
                                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-amber-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <RemoveIcon sx={{ fontSize: 18 }} />
                                </button>
                                
                                <span className="w-8 text-center font-semibold text-gray-900 text-sm">
                                    {quantity}
                                </span>
                                
                                <button 
                                    onClick={() => increaseQuantity(product, quantity, stock)}
                                    disabled={quantity >= stock}
                                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-amber-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <AddIcon sx={{ fontSize: 18 }} />
                                </button>
                            </div>

                            {/* Stock Info */}
                            <div className="text-xs text-gray-500 hidden sm:block">
                                {stock > 10 ? (
                                    <span className="text-green-600">In Stock</span>
                                ) : stock > 0 ? (
                                    <span className="text-amber-600">Only {stock} left</span>
                                ) : (
                                    <span className="text-red-600">Out of Stock</span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {inCart && !isEditing && (
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => saveForLaterHandler(product)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors duration-200 group"
                                >
                                    <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                                    <span>Save</span>
                                </button>
                                
                                <button 
                                    onClick={() => removeCartItem(product)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors duration-200 group"
                                >
                                    <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                                    <span>Remove</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Stock Info */}
            <div className="sm:hidden text-xs text-gray-500">
                {stock > 10 ? (
                    <span className="text-green-600">✓ In Stock</span>
                ) : stock > 0 ? (
                    <span className="text-amber-600">⚠ Only {stock} left</span>
                ) : (
                    <span className="text-red-600">✗ Out of Stock</span>
                )}
            </div>

            {/* Edit Mode Actions */}
            {isEditing && isSelected && (
                <div className="flex gap-3 pt-3 border-t border-gray-200">
                    <button 
                        onClick={() => saveForLaterHandler(product)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-pink-600 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200"
                    >
                        <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                        Save for Later
                    </button>
                    <button 
                        onClick={() => removeCartItem(product)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                        <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartItem;