import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DiamondIcon from '@mui/icons-material/Diamond';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = ({ _id, name, images, ratings, numOfReviews, price, cuttedPrice, featured }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const itemInWishlist = wishlistItems.some((i) => i.product === _id);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar("Removed from Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar("Added to Wishlist", { variant: "success" });
        }
    }

    const addToCartHandler = () => {
        enqueueSnackbar("Added to Cart", { variant: "success" });
    }

    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 overflow-hidden transform hover:-translate-y-2 relative">
            
            {/* Premium Badge */}
            {featured && (
                <div className="absolute top-3 left-3 z-20">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-amber-200/50 backdrop-blur-sm flex items-center gap-1">
                        <DiamondIcon sx={{ fontSize: 12 }} />
                        <span>PREMIUM</span>
                    </div>
                </div>
            )}

            {/* Image Container */}
            <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white">
                <Link to={`/product/${_id}`} className="block">
                    <div className="w-full h-56 flex items-center justify-center relative">
                        <img 
                            draggable="false" 
                            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110" 
                            src={images && images[0].url} 
                            alt={name} 
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                </Link>
                
                {/* Discount Badge - Luxury Style */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-white/20 backdrop-blur-sm">
                    {getDiscount(price, cuttedPrice)}% OFF
                </div>

                {/* New Arrival Badge */}
                {featured && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg border border-white/20 backdrop-blur-sm flex items-center gap-1">
                        <FlashOnIcon sx={{ fontSize: 12 }} />
                        <span>NEW</span>
                    </div>
                )}

                {/* Wishlist Button - Luxury Style */}
                <button 
                    onClick={addToWishlistHandler}
                    className={`absolute top-4 left-4 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg border-2 backdrop-blur-sm transform hover:scale-110 ${
                        itemInWishlist 
                            ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-200/50" 
                            : "bg-white/80 text-gray-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white border-gray-200/50 hover:border-pink-200/50"
                    }`}
                >
                    <FavoriteIcon sx={{ fontSize: "18px" }} />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-6">
                {/* Product Name */}
                <Link to={`/product/${_id}`} className="block mb-3">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2 hover:text-purple-600 transition-colors duration-300 group-hover:translate-x-1">
                        {name}
                    </h3>
                </Link>

                {/* Rating - Enhanced */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-orange-50 px-2 py-1 rounded-lg border border-amber-200/50">
                        <StarIcon sx={{ fontSize: "16px", color: "#F59E0B" }} />
                        <span className="text-sm font-bold text-gray-900">{ratings.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">({numOfReviews} reviews)</span>
                </div>

                {/* Price - Luxury Style */}
                <div className="flex items-center gap-3 mb-5">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ₹{price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through font-medium">₹{cuttedPrice.toLocaleString()}</span>
                    
                    {/* Savings Badge */}
                    <div className="ml-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        Save ₹{(cuttedPrice - price).toLocaleString()}
                    </div>
                </div>

                {/* Add to Cart Button - Luxury Style */}
                <button 
                    onClick={addToCartHandler}
                    className="w-full group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-purple-500/20 backdrop-blur-sm overflow-hidden"
                >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <span className="flex items-center justify-center gap-2 relative z-10">
                        <AddShoppingCartIcon sx={{ fontSize: "18px" }} />
                        <span>Add to Cart</span>
                    </span>
                </button>

                {/* Quick View Option */}
                <Link 
                    to={`/product/${_id}`}
                    className="w-full mt-3 text-center text-gray-600 hover:text-purple-600 font-medium text-sm transition-colors duration-300 flex items-center justify-center gap-1 group"
                >
                    <span>Quick View</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </Link>
            </div>

            {/* Glow Effect on Hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
        </div>
    );
};

export default Product;