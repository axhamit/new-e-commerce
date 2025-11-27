import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiamondIcon from '@mui/icons-material/Diamond';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SecurityIcon from '@mui/icons-material/Security';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    // reviews toggle
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Removed from Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added to Wishlist", { variant: "success" });
        }
    }

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            enqueueSnackbar("Please provide rating and comment", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);
        dispatch(newReview(formData));
        setOpen(false);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product Added to Cart", { variant: "success" });
    }

    const handleDialogClose = () => {
        setOpen(!open);
    }

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
        // eslint-disable-next-line
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product?.category));
    }, [dispatch, product, product.category]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={product.name} />
                    <MinCategory />
                    <main className="mt-16 sm:mt-4 bg-gray-50 min-h-screen">

                        {/* Main Product Container */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                            {/* Product Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                                {/* Image Section */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="relative">
                                        <Slider {...settings}>
                                            {product.images && product.images.map((item, i) => (
                                                <div key={i} className="flex items-center justify-center p-4">
                                                    <img 
                                                        draggable="false" 
                                                        className="w-full h-80 lg:h-96 object-contain" 
                                                        src={item.url} 
                                                        alt={product.name} 
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                        
                                        {/* Wishlist Button */}
                                        <button 
                                            onClick={addToWishlistHandler}
                                            className={`absolute top-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm border ${
                                                itemInWishlist 
                                                    ? "bg-gradient-to-br from-red-500 to-pink-600 text-white scale-110 border-red-400/50" 
                                                    : "bg-white/90 text-gray-400 hover:bg-gradient-to-br hover:from-red-500 hover:to-pink-600 hover:text-white hover:scale-110 border-gray-200/80"
                                            }`}
                                        >
                                            <FavoriteIcon sx={{ fontSize: "20px" }} />
                                        </button>

                                        {/* Premium Badge */}
                                        <div className="absolute top-4 left-4">
                                            <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-amber-300/50 backdrop-blur-sm flex items-center gap-1">
                                                <DiamondIcon sx={{ fontSize: "12px" }} />
                                                <span>PREMIUM</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                        {product.stock > 0 && (
                                            <button 
                                                onClick={itemInCart ? goToCart : addToCartHandler}
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                                            >
                                                <ShoppingCartIcon sx={{ fontSize: "24px" }} />
                                                {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                            </button>
                                        )}
                                        <button 
                                            onClick={buyNow} 
                                            disabled={product.stock < 1}
                                            className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                                                product.stock < 1 
                                                    ? "bg-gray-400 text-white cursor-not-allowed" 
                                                    : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white hover:shadow-xl"
                                            }`}
                                        >
                                            <FlashOnIcon sx={{ fontSize: "24px" }} />
                                            {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info Section */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                                    {/* Product Title & Rating */}
                                    <div className="mb-6">
                                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1.5 rounded-xl text-sm font-semibold border border-green-200">
                                                <StarIcon sx={{ fontSize: "16px", color: "#F59E0B" }} />
                                                <span className="font-bold">{product.ratings?.toFixed(1)}</span>
                                            </div>
                                            <span className="text-gray-600 text-sm">({product.numOfReviews} Reviews)</span>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <span className="text-3xl lg:text-4xl font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
                                            <span className="text-lg text-gray-500 line-through">₹{product.cuttedPrice?.toLocaleString()}</span>
                                            <span className="text-lg font-bold text-green-600">{getDiscount(product.price, product.cuttedPrice)}% OFF</span>
                                        </div>
                                        {product.stock <= 10 && product.stock > 0 && (
                                            <div className="text-red-500 font-semibold text-sm bg-red-50 px-3 py-1 rounded-full inline-block">
                                                ⚡ Only {product.stock} left in stock!
                                            </div>
                                        )}
                                    </div>

                                    {/* Delivery Info */}
                                    <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <div className="flex items-center gap-3">
                                            <CalendarTodayIcon sx={{ fontSize: "20px", color: "#3B82F6" }} />
                                            <div>
                                                <p className="font-semibold text-gray-900">Free Delivery</p>
                                                <p className="text-sm text-gray-600">Delivery by {getDeliveryDate()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Highlights</h3>
                                        <ul className="grid grid-cols-1 gap-2">
                                            {product.highlights?.map((highlight, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"></div>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Services */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Services & Support</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <SecurityIcon sx={{ fontSize: "20px", color: "#10B981" }} />
                                                <span className="text-sm font-medium">{product.warranty} Year Warranty</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <CachedIcon sx={{ fontSize: "20px", color: "#3B82F6" }} />
                                                <span className="text-sm font-medium">7 Days Replacement</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <CurrencyRupeeIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} />
                                                <span className="text-sm font-medium">Cash on Delivery</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <VerifiedUserIcon sx={{ fontSize: "20px", color: "#F59E0B" }} />
                                                <span className="text-sm font-medium">Brand Authentic</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Brand Info */}
                                    {product.brand && (
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <img 
                                                draggable="false" 
                                                className="w-16 h-8 object-contain" 
                                                src={product.brand.logo?.url} 
                                                alt={product.brand.name} 
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">Sold by {product.brand.name}</p>
                                                <p className="text-sm text-gray-600">Authorized Brand Partner</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Details Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                                {/* Description */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
                                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                </div>

                                {/* Specifications */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
                                    <div className="space-y-3">
                                        {product.specifications?.map((spec, i) => (
                                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-sm font-medium text-gray-500">{spec.title}</span>
                                                <span className="text-sm font-medium text-gray-900">{spec.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-3xl font-bold text-gray-900">{product.ratings?.toFixed(1)}</span>
                                                <StarIcon sx={{ fontSize: "24px", color: "#F59E0B" }} />
                                            </div>
                                            <span className="text-gray-600">({product.numOfReviews} reviews)</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleDialogClose}
                                        className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-4 sm:mt-0"
                                    >
                                        Write a Review
                                    </button>
                                </div>

                                {/* Review Dialog */}
                                <Dialog
                                    aria-labelledby='review-dialog'
                                    open={open}
                                    onClose={handleDialogClose}
                                    PaperProps={{
                                        sx: { borderRadius: '16px', padding: '8px' }
                                    }}
                                >
                                    <DialogTitle className="text-xl font-bold text-gray-900 border-b pb-4">
                                        Write a Review
                                    </DialogTitle>
                                    <DialogContent className="flex flex-col gap-6 mt-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Your Rating</p>
                                            <Rating
                                                onChange={(e) => setRating(parseFloat(e.target.value))}
                                                value={rating}
                                                size='large'
                                                precision={0.5}
                                                sx={{ fontSize: '32px' }}
                                            />
                                        </div>
                                        <TextField
                                            label="Your Review"
                                            multiline
                                            rows={4}
                                            size="medium"
                                            variant="outlined"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                    </DialogContent>
                                    <DialogActions className="gap-3 p-6">
                                        <button 
                                            onClick={handleDialogClose}
                                            className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={reviewSubmitHandler}
                                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:shadow-lg transition-all duration-300"
                                        >
                                            Submit Review
                                        </button>
                                    </DialogActions>
                                </Dialog>

                                {/* Reviews List */}
                                <div className="space-y-6">
                                    {(viewAll ? product.reviews : product.reviews?.slice(-3))?.map((rev, i) => (
                                        <div key={i} className="p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-4 mb-3">
                                                <Rating value={rev.rating} readOnly size="small" precision={0.5} />
                                                <span className="text-sm text-gray-500">by {rev.name}</span>
                                            </div>
                                            <p className="text-gray-700">{rev.comment}</p>
                                        </div>
                                    )).reverse()}

                                    {product.reviews?.length > 3 && (
                                        <button 
                                            onClick={() => setViewAll(!viewAll)}
                                            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            {viewAll ? "Show Less Reviews" : "View All Reviews"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Similar Products */}
                            <div className="mb-8">
                                <ProductSlider title={"Similar Products"} tagline={"You might also like"} />
                            </div>
                        </div>

                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;