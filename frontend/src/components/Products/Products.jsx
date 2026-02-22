import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { useLocation } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';
import DiamondIcon from '@mui/icons-material/Diamond';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SortIcon from '@mui/icons-material/Sort';

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    const [price, setPrice] = useState([0, 200000]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [mobileSortOpen, setMobileSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    
    // Parse URL parameters properly
    const parseQueryParams = (search) => {
        const params = new URLSearchParams(search);
        return {
            category: params.get('category') || '',
            subcategory: params.get('subcategory') || ''
        };
    };
    
    const queryParams = parseQueryParams(location.search);
    const [category, setCategory] = useState(queryParams.category);
    const [subcategory, setSubcategory] = useState(queryParams.subcategory);
    const [ratings, setRatings] = useState(0);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);
    const [priceToggle, setPriceToggle] = useState(true);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const keyword = params.keyword;

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setSubcategory("");
        setRatings(0);
        setSortBy('newest');
    }

    useEffect(() => {
        // Update category and subcategory when URL changes
        const params = parseQueryParams(location.search);
        setCategory(params.category);
        setSubcategory(params.subcategory);
    }, [location.search]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, category, subcategory, price, ratings, currentPage));
    }, [dispatch, keyword, category, subcategory, price, ratings, currentPage, error, enqueueSnackbar]);

    // Sort options
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'popular', label: 'Most Popular' },
        { value: 'rating', label: 'Top Rated' }
    ];

    return (
        <>
            <MetaData title="All Products | Aarohama Tresure - Luxury Fashion Collection" />

            <MinCategory />
            
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-r from-purple-400 via-pink-600 to-rose-400 py-16 mt-14 sm:mt-0">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl mb-6 border border-white/20">
                        <DiamondIcon sx={{ fontSize: 20, className: "text-white mr-2" }} />
                        <span className="text-white font-bold text-sm tracking-widest uppercase">
                            {keyword ? `Search: ${keyword}` : 'Luxury Collection'}
                        </span>
                        <DiamondIcon sx={{ fontSize: 20, className: "text-white ml-2" }} />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        {keyword ? `Results for "${keyword}"` : 'Discover Elegance'}
                    </h1>
                    <p className="text-white/80 text-lg lg:text-xl font-light max-w-2xl mx-auto">
                        Curated luxury pieces for the discerning fashion enthusiast
                    </p>
                </div>
            </section>

            <main className="w-full bg-gradient-to-b from-gray-50 to-white">

                {/* Mobile Action Buttons */}
                <div className="sm:hidden fixed bottom-6 right-6 z-40 flex flex-col gap-3">
                    <button 
                        onClick={() => setMobileSortOpen(true)}
                        className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
                    >
                        <SortIcon />
                    </button>
                    <button 
                        onClick={() => setMobileFiltersOpen(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
                    >
                        <FilterListIcon />
                    </button>
                </div>

                {/* Mobile Filters Overlay */}
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 sm:hidden">
                        <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-white to-gray-50 shadow-2xl overflow-y-auto">
                            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TuneIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} />
                                        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                                    </div>
                                    <button 
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                {/* Mobile Filter Content - Same as desktop but simplified */}
                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={clearFilters}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                                    >
                                        Clear All Filters
                                    </button>
                                    
                                    {/* Price Range */}
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                                        <Slider
                                            value={price}
                                            onChange={priceHandler}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                                            min={0}
                                            max={200000}
                                            sx={{ color: '#8B5CF6' }}
                                        />
                                        <div className="flex gap-2 mt-4">
                                            <div className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white text-sm">
                                                ₹{price[0].toLocaleString()}
                                            </div>
                                            <span className="font-medium text-gray-400">to</span>
                                            <div className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-gray-700 bg-white text-sm">
                                                ₹{price[1].toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Categories */}
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                                        <FormControl>
                                            <RadioGroup
                                                onChange={(e) => setCategory(e.target.value)}
                                                value={category}
                                            >
                                                {categories.map((el, i) => (
                                                    <FormControlLabel 
                                                        value={el} 
                                                        control={
                                                            <Radio 
                                                                size="small" 
                                                                sx={{ 
                                                                    color: '#9ca3af',
                                                                    '&.Mui-checked': { color: '#8B5CF6' }
                                                                }} 
                                                            />
                                                        } 
                                                        label={<span className="text-sm text-gray-700">{el}</span>} 
                                                        className="hover:bg-gray-50 rounded-lg px-3 py-1"
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>

                                    {/* Ratings */}
                                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-4">Customer Ratings</h3>
                                        <FormControl>
                                            <RadioGroup
                                                onChange={(e) => setRatings(e.target.value)}
                                                value={ratings}
                                            >
                                                {[4, 3, 2, 1].map((el) => (
                                                    <FormControlLabel 
                                                        value={el} 
                                                        key={el}
                                                        control={
                                                            <Radio 
                                                                size="small" 
                                                                sx={{ 
                                                                    color: '#9ca3af',
                                                                    '&.Mui-checked': { color: '#8B5CF6' }
                                                                }} 
                                                            />
                                                        } 
                                                        label={
                                                            <span className="flex items-center text-sm text-gray-700">
                                                                <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mr-2">
                                                                    {el}
                                                                    <StarIcon sx={{ fontSize: "12px", ml: 0.5 }} />
                                                                </span>
                                                                & above
                                                            </span>
                                                        } 
                                                        className="hover:bg-gray-50 rounded-lg px-3 py-1"
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Sort Overlay */}
                {mobileSortOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 sm:hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-white to-gray-50 rounded-t-3xl shadow-2xl">
                            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-3xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <SortIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} />
                                        <h2 className="text-xl font-bold text-gray-900">Sort By</h2>
                                    </div>
                                    <button 
                                        onClick={() => setMobileSortOpen(false)}
                                        className="text-gray-500 hover:text-gray-700 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex flex-col gap-2">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortBy(option.value);
                                                setMobileSortOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                                                sortBy === option.value 
                                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* <!-- row --> */}
                <div className="flex gap-6 py-8 sm:py-12 sm:mx-6 m-auto max-w-7xl">

                    {/* <!-- sidebar column  --> */}
                    <div className="hidden sm:flex flex-col w-80 flex-shrink-0">

                        {/* <!-- filters container --> */}
                        <div className="flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                            
                            {/* <!-- filters header with luxury styling --> */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-2xl px-6 py-5 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                            <TuneIcon sx={{ fontSize: "16px", color: "white" }} />
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">Filters</p>
                                    </div>
                                    <button 
                                        onClick={clearFilters}
                                        className="text-purple-600 hover:text-purple-700 text-sm font-semibold transition-colors duration-200 bg-white/80 px-3 py-1 rounded-full"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 py-4 text-sm">

                                {/* price slider filter */}
                                <div className="flex flex-col border-b border-gray-100">
                                    <div 
                                        className="flex justify-between cursor-pointer py-4 px-6 items-center hover:bg-gray-50 transition-colors duration-200" 
                                        onClick={() => setPriceToggle(!priceToggle)}
                                    >
                                        <p className="font-semibold text-gray-900 text-sm">PRICE RANGE</p>
                                        {priceToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} />
                                        }
                                    </div>

                                    {priceToggle && (
                                        <div className="flex flex-col gap-4 px-6 pb-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500 bg-gradient-to-r from-purple-50 to-pink-50 px-2 py-1 rounded border border-purple-100">
                                                    ₹{price[0].toLocaleString()} - ₹{price[1].toLocaleString()}
                                                </span>
                                            </div>

                                            <Slider
                                                value={price}
                                                onChange={priceHandler}
                                                valueLabelDisplay="auto"
                                                valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                                                getAriaLabel={() => 'Price range slider'}
                                                min={0}
                                                max={200000}
                                                sx={{
                                                    color: '#8B5CF6',
                                                    '& .MuiSlider-thumb': {
                                                        backgroundColor: '#fff',
                                                        border: '2px solid #8B5CF6',
                                                        '&:hover': {
                                                            boxShadow: '0 0 0 8px rgba(139, 92, 246, 0.16)',
                                                        }
                                                    },
                                                    '& .MuiSlider-valueLabel': {
                                                        backgroundColor: '#8B5CF6',
                                                    }
                                                }}
                                            />

                                            <div className="flex gap-3 items-center justify-between">
                                                <div className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 bg-gradient-to-r from-gray-50 to-white text-sm font-medium">
                                                    ₹{price[0].toLocaleString()}
                                                </div>
                                                <span className="font-medium text-gray-400 text-sm">to</span>
                                                <div className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 bg-gradient-to-r from-gray-50 to-white text-sm font-medium">
                                                    ₹{price[1].toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* price slider filter */}

                                {/* category filter */}
                                <div className="flex flex-col border-b border-gray-100">
                                    <div 
                                        className="flex justify-between cursor-pointer py-4 px-6 items-center hover:bg-gray-50 transition-colors duration-200" 
                                        onClick={() => setCategoryToggle(!categoryToggle)}
                                    >
                                        <p className="font-semibold text-gray-900 text-sm">CATEGORIES</p>
                                        {categoryToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} />
                                        }
                                    </div>

                                    {categoryToggle && (
                                        <div className="flex flex-col pb-4 px-3">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="category-radio-buttons-group"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    name="category-radio-buttons"
                                                    value={category}
                                                >
                                                    {categories.map((el, i) => (
                                                        <FormControlLabel 
                                                            value={el} 
                                                            control={
                                                                <Radio 
                                                                    size="small" 
                                                                    sx={{ 
                                                                        color: '#9ca3af',
                                                                        '&.Mui-checked': {
                                                                            color: '#8B5CF6',
                                                                        },
                                                                    }} 
                                                                />
                                                            } 
                                                            label={
                                                                <span className="text-sm text-gray-700 font-medium" key={i}>
                                                                    {el}
                                                                </span>
                                                            } 
                                                            className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-lg px-3 py-2 transition-all duration-200"
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}
                                </div>
                                {/* category filter */}

                                {/* ratings filter */}
                                <div className="flex flex-col">
                                    <div 
                                        className="flex justify-between cursor-pointer py-4 px-6 items-center hover:bg-gray-50 transition-colors duration-200" 
                                        onClick={() => setRatingsToggle(!ratingsToggle)}
                                    >
                                        <p className="font-semibold text-gray-900 text-sm">CUSTOMER RATINGS</p>
                                        {ratingsToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} />
                                        }
                                    </div>

                                    {ratingsToggle && (
                                        <div className="flex flex-col pb-4 px-3">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) => setRatings(e.target.value)}
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {[4, 3, 2, 1].map((el, i) => (
                                                        <FormControlLabel 
                                                            value={el} 
                                                            key={i} 
                                                            control={
                                                                <Radio 
                                                                    size="small" 
                                                                    sx={{ 
                                                                        color: '#9ca3af',
                                                                        '&.Mui-checked': {
                                                                            color: '#8B5CF6',
                                                                        },
                                                                    }} 
                                                                />
                                                            } 
                                                            label={
                                                                <span className="flex items-center text-sm text-gray-700 font-medium">
                                                                    <span className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-2 py-1 rounded text-xs font-semibold mr-2 border border-green-200">
                                                                        {el}
                                                                        <StarIcon sx={{ fontSize: "12px", ml: 0.5, color: '#FBBF24' }} />
                                                                    </span>
                                                                    & above
                                                                </span>
                                                            } 
                                                            className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-lg px-3 py-2 transition-all duration-200"
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}
                                </div>
                                {/* ratings filter */}

                            </div>

                            {/* Apply Filters Button for Desktop */}
                            <div className="p-6 border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white rounded-b-2xl">
                                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                                    Apply Filters
                                </button>
                            </div>

                        </div>
                        {/* <!-- filters container --> */}

                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- products column --> */}
                    <div className="flex-1 min-w-0">

                        {/* Sort and Results Bar */}
                        {!loading && products?.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                                        <DiamondIcon sx={{ fontSize: "16px", color: "#8B5CF6" }} />
                                    </div>
                                    <p className="text-gray-700 font-medium">
                                        Showing <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold">{products.length}</span> of <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold">{filteredProductsCount}</span> luxury pieces
                                    </p>
                                </div>
                                
                                {/* Desktop Sort Dropdown */}
                                <div className="hidden sm:block relative">
                                    <select 
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl px-4 py-2 pr-8 font-medium text-gray-700 focus:outline-none focus:border-purple-400 cursor-pointer"
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <ExpandMoreIcon sx={{ fontSize: "20px", color: "#8B5CF6" }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-12 sm:p-16">
                                <div className="w-64 h-48 flex items-center justify-center">
                                    <img 
                                        draggable="false" 
                                        className="w-full h-full object-contain opacity-50" 
                                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png" 
                                        alt="No results found" 
                                    />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 text-center">No luxury pieces found</h1>
                                <p className="text-lg text-center text-gray-600 max-w-md">
                                    Please check the spelling or try searching for something else
                                </p>
                                <button 
                                    onClick={clearFilters}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6 justify-center items-center w-full overflow-hidden">

                                {/* Products Grid with Luxury Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                                    {products?.map((product) => (
                                        <div key={product._id} className="group">
                                            <Product {...product} />
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination with Luxury Styling */}
                                {filteredProductsCount > resultPerPage && (
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-4 w-full">
                                        <div className="flex justify-center">
                                            <Pagination
                                                count={Number(((filteredProductsCount + 6) / resultPerPage).toFixed())}
                                                page={currentPage}
                                                onChange={(e, val) => setCurrentPage(val)}
                                                color="primary"
                                                sx={{
                                                    '& .MuiPaginationItem-root': {
                                                        fontSize: '14px',
                                                        fontWeight: '600',
                                                        borderRadius: '12px',
                                                        margin: '0 4px',
                                                    },
                                                    '& .MuiPaginationItem-page': {
                                                        color: '#4B5563',
                                                        '&:hover': {
                                                            backgroundColor: '#F3E8FF',
                                                        }
                                                    },
                                                    '& .MuiPaginationItem-page.Mui-selected': {
                                                        background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            background: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {/* <!-- products column --> */}
                </div>
                {/* <!-- row --> */}

            </main>

            {/* Floating Scroll to Top Button */}
            <div className="fixed bottom-8 right-8 z-50 hidden sm:block">
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-14 h-14 bg-gradient-to-r from-gray-900 to-black rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20"
                >
                    <span className="text-xl">↑</span>
                </button>
            </div>
        </>
    );
};

export default Products;