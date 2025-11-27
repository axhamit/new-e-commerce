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
import { getRandomProducts } from '../../utils/functions';
import { useLocation } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    const [price, setPrice] = useState([0, 200000]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    
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

    return (
        <>
            <MetaData title="All Products | E-Commerce" />

            <MinCategory />
            <main className="w-full mt-14 sm:mt-0">

                {/* Mobile Filter Button */}
                <div className="sm:hidden fixed bottom-6 right-6 z-40">
                    <button 
                        onClick={() => setMobileFiltersOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
                    >
                        <FilterListIcon />
                    </button>
                </div>

                {/* Mobile Filters Overlay */}
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 sm:hidden">
                        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto">
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                                    <button 
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                {/* Mobile filter content would go here */}
                                <div className="text-center text-gray-500">
                                    Mobile filters content
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* <!-- row --> */}
                <div className="flex gap-6 mt-4 sm:mt-4 sm:mx-6 m-auto mb-8 max-w-7xl">

                    {/* <!-- sidebar column  --> */}
                    <div className="hidden sm:flex flex-col w-80 flex-shrink-0">

                        {/* <!-- filters container --> */}
                        <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100">

                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 px-6 py-4 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <TuneIcon sx={{ fontSize: "20px", color: "#4f46e5" }} />
                                    <p className="text-lg font-bold text-gray-900">Filters</p>
                                </div>
                                <button 
                                    onClick={clearFilters}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors duration-200"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="flex flex-col gap-1 py-4 text-sm">

                                {/* price slider filter */}
                                <div className="flex flex-col gap-4 border-b border-gray-100 px-6 pb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-gray-900 text-sm">PRICE RANGE</span>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
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
                                            color: '#4f46e5',
                                            '& .MuiSlider-thumb': {
                                                backgroundColor: '#fff',
                                                border: '2px solid #4f46e5',
                                            },
                                            '& .MuiSlider-valueLabel': {
                                                backgroundColor: '#4f46e5',
                                            }
                                        }}
                                    />

                                    <div className="flex gap-3 items-center justify-between">
                                        <div className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 bg-white text-sm font-medium">
                                            ₹{price[0].toLocaleString()}
                                        </div>
                                        <span className="font-medium text-gray-400 text-sm">to</span>
                                        <div className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 bg-white text-sm font-medium">
                                            ₹{price[1].toLocaleString()}
                                        </div>
                                    </div>
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
                                            <ExpandLessIcon sx={{ fontSize: "20px", color: "#6b7280" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px", color: "#6b7280" }} />
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
                                                                            color: '#4f46e5',
                                                                        },
                                                                    }} 
                                                                />
                                                            } 
                                                            label={
                                                                <span className="text-sm text-gray-700 font-medium" key={i}>
                                                                    {el}
                                                                </span>
                                                            } 
                                                            className="hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200"
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
                                            <ExpandLessIcon sx={{ fontSize: "20px", color: "#6b7280" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px", color: "#6b7280" }} />
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
                                                                            color: '#4f46e5',
                                                                        },
                                                                    }} 
                                                                />
                                                            } 
                                                            label={
                                                                <span className="flex items-center text-sm text-gray-700 font-medium">
                                                                    <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mr-2">
                                                                        {el}
                                                                        <StarIcon sx={{ fontSize: "12px", ml: 0.5 }} />
                                                                    </span>
                                                                    & above
                                                                </span>
                                                            } 
                                                            className="hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200"
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* ratings filter */}

                            </div>

                        </div>
                        {/* <!-- filters container --> */}

                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- products column --> */}
                    <div className="flex-1 min-w-0">

                        {/* Results Count */}
                        {!loading && products?.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                                <p className="text-gray-700 font-medium">
                                    Showing <span className="text-gray-900 font-semibold">{products.length}</span> of <span className="text-gray-900 font-semibold">{filteredProductsCount}</span> products
                                </p>
                            </div>
                        )}

                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-12 sm:p-16">
                                <div className="w-64 h-48 flex items-center justify-center">
                                    <img 
                                        draggable="false" 
                                        className="w-full h-full object-contain" 
                                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png" 
                                        alt="No results found" 
                                    />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 text-center">Sorry, no results found!</h1>
                                <p className="text-lg text-center text-gray-600 max-w-md">
                                    Please check the spelling or try searching for something else
                                </p>
                                <button 
                                    onClick={clearFilters}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 mt-4"
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

                                {/* Products Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                                    {products?.map((product) => (
                                        <Product {...product} key={product._id} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {filteredProductsCount > resultPerPage && (
                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-4">
                                        <Pagination
                                            count={Number(((filteredProductsCount + 6) / resultPerPage).toFixed())}
                                            page={currentPage}
                                            onChange={(e, val) => setCurrentPage(val)}
                                            color="primary"
                                            sx={{
                                                '& .MuiPaginationItem-root': {
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                },
                                                '& .MuiPaginationItem-page.Mui-selected': {
                                                    backgroundColor: '#4f46e5',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: '#4338ca',
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {/* <!-- products column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Products;