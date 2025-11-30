import { useEffect, useState } from 'react';
import { myOrders, clearErrors } from '../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useSnackbar } from 'notistack';
import OrderItem from './OrderItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

// Import Material-UI icons for consistency
import DiamondIcon from '@mui/icons-material/Diamond';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const orderStatus = ["Processing", "Shipped", "Delivered"];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];

const MyOrders = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [status, setStatus] = useState("");
    const [orderTime, setOrderTime] = useState(0);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const { orders, loading, error } = useSelector((state) => state.myOrders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (loading === false) {
            setFilteredOrders(orders);
        }
    }, [loading, orders]);


    useEffect(() => {
        setSearch("");
        if (!status && +orderTime === 0) {
            setFilteredOrders(orders);
            return;
        }

        if (status && orderTime) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else if (!status) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else {
            const filteredArr = orders.filter((order) => order.orderStatus === status);
            setFilteredOrders(filteredArr);
        }
        // eslint-disable-next-line
    }, [status, orderTime]);

    const searchOrders = (e) => {
        e.preventDefault();
        if (!search.trim()) {
            enqueueSnackbar("Empty Input", { variant: "warning" });
            return;
        }
        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems.filter((order) =>
                order.name.toLowerCase().includes(search.toLowerCase()))
        }));
        setFilteredOrders(arr);
    }

    const clearFilters = () => {
        setStatus("");
        setOrderTime(0);
        setShowMobileFilters(false);
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "Processing":
                return <InventoryIcon sx={{ fontSize: 18 }} />;
            case "Shipped":
                return <LocalShippingIcon sx={{ fontSize: 18 }} />;
            case "Delivered":
                return <CheckCircleIcon sx={{ fontSize: 18 }} />;
            default:
                return <InventoryIcon sx={{ fontSize: 18 }} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Processing":
                return "from-blue-500 to-cyan-500";
            case "Shipped":
                return "from-amber-500 to-orange-500";
            case "Delivered":
                return "from-emerald-500 to-green-500";
            default:
                return "from-gray-500 to-gray-600";
        }
    };

    return (
        <>
            <MetaData title="My Orders | Aarohama Tresure" />

            <main className="w-full mt-16 sm:mt-4 px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-8 mt-28">
                    <div className="text-center mb-8">
                        {/* <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-blue-50/80 backdrop-blur-xl rounded-2xl mb-4 border border-purple-200/50 shadow-lg">
                            <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                            <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                                Order History
                            </span>
                            <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                        </div> */}
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            My <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Orders</span>
                        </h1>
                        <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
                            Track and manage your luxury purchases with ease
                        </p>
                    </div>
                </div>

                {/* Mobile Filter Button */}
                <div className="sm:hidden flex justify-between items-center mb-4">
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <FilterListIcon sx={{ fontSize: 20 }} />
                        Filters
                    </button>
                    {(status || orderTime) && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-3 rounded-2xl border-2 border-gray-200 font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <ClearIcon sx={{ fontSize: 20 }} />
                            Clear
                        </button>
                    )}
                </div>

                {/* <!-- row --> */}
                <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

                    {/* <!-- sidebar column  --> */}
                    <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:block lg:w-1/4 transition-all duration-300`}>

                        {/* <!-- filters card --> */}
                        <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 rounded-3xl shadow-2xl border-2 border-purple-100/50 backdrop-blur-sm p-6 sticky top-24">
                            
                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 mb-6 pb-4 border-b-2 border-purple-100/50">
                                <div className="flex items-center gap-2">
                                    <FilterListIcon sx={{ fontSize: 22, color: '#8B5CF6' }} />
                                    <p className="text-xl font-bold text-gray-900">Filters</p>
                                </div>
                                <span 
                                    onClick={clearFilters} 
                                    className="text-purple-600 font-semibold text-sm uppercase cursor-pointer hover:text-purple-700 transition-colors duration-300 bg-purple-50 px-3 py-1 rounded-full hover:bg-purple-100"
                                >
                                    clear all
                                </span>
                            </div>

                            {/* <!-- order status section --> */}
                            <div className="flex flex-col mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <LocalShippingIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                                    <span className="font-semibold text-gray-700 text-lg">ORDER STATUS</span>
                                </div>

                                {/* <!-- radio buttons --> */}
                                <div className="flex flex-col gap-3">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="orderstatus-radio-buttons-group"
                                            onChange={(e) => setStatus(e.target.value)}
                                            name="orderstatus-radio-buttons"
                                            value={status}
                                        >
                                            {orderStatus.map((el, i) => (
                                                <FormControlLabel 
                                                    value={el} 
                                                    control={
                                                        <Radio 
                                                            size="small" 
                                                            sx={{
                                                                color: '#8B5CF6',
                                                                '&.Mui-checked': {
                                                                    color: '#8B5CF6',
                                                                },
                                                            }}
                                                        />
                                                    } 
                                                    key={i} 
                                                    label={
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${getStatusColor(el)} text-white`}>
                                                                {getStatusIcon(el)}
                                                            </div>
                                                            <span className="text-gray-700 font-medium">{el}</span>
                                                        </div>
                                                    } 
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>

                            {/* <!-- order time section --> */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-4">
                                    <InventoryIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                                    <span className="font-semibold text-gray-700 text-lg">ORDER TIME</span>
                                </div>

                                {/* <!-- radio buttons --> */}
                                <div className="flex flex-col gap-3">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="ordertime-radio-buttons-group"
                                            onChange={(e) => setOrderTime(e.target.value)}
                                            name="ordertime-radio-buttons"
                                            value={orderTime}
                                        >
                                            {ordertime.map((el, i) => (
                                                <FormControlLabel 
                                                    value={el} 
                                                    control={
                                                        <Radio 
                                                            size="small" 
                                                            sx={{
                                                                color: '#8B5CF6',
                                                                '&.Mui-checked': {
                                                                    color: '#8B5CF6',
                                                                },
                                                            }}
                                                        />
                                                    } 
                                                    key={i} 
                                                    label={
                                                        <span className="text-gray-700 font-medium">
                                                            {i === 0 ? "This Month" : el}
                                                        </span>
                                                    } 
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>

                            {/* Active Filters Badge */}
                            {(status || orderTime) && (
                                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">Active Filters:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {status && (
                                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                {status}
                                                <ClearIcon 
                                                    sx={{ fontSize: 14 }} 
                                                    className="cursor-pointer" 
                                                    onClick={() => setStatus("")}
                                                />
                                            </span>
                                        )}
                                        {orderTime && (
                                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                {orderTime === dt.getMonth() ? "This Month" : orderTime}
                                                <ClearIcon 
                                                    sx={{ fontSize: 14 }} 
                                                    className="cursor-pointer" 
                                                    onClick={() => setOrderTime(0)}
                                                />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <!-- orders column --> */}
                    <div className="flex-1 lg:w-3/4">

                        {loading ? (
                            <div className="flex justify-center items-center min-h-96">
                                <Loader />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">

                                {/* <!-- searchbar --> */}
                                <form 
                                    onSubmit={searchOrders} 
                                    className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-xl border-2 border-purple-100/50 p-2 backdrop-blur-sm"
                                >
                                    <div className="flex items-center">
                                        <div className="flex-1 relative">
                                            <SearchIcon 
                                                sx={{ 
                                                    fontSize: 24, 
                                                    color: '#8B5CF6',
                                                    position: 'absolute',
                                                    left: '12px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)'
                                                }} 
                                            />
                                            <input 
                                                value={search} 
                                                onChange={(e) => setSearch(e.target.value)} 
                                                type="search" 
                                                name="search" 
                                                placeholder="Search your orders here..." 
                                                className="w-full p-4 pl-12 text-lg outline-none bg-transparent rounded-l-2xl text-gray-700 placeholder-gray-400 font-light"
                                            />
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-purple-500/20 flex items-center gap-2"
                                        >
                                            <SearchIcon sx={{ fontSize: 22 }} />
                                            <span className="hidden sm:inline">Search Orders</span>
                                        </button>
                                    </div>
                                </form>

                                {/* Orders Count */}
                                <div className="flex items-center justify-between px-4">
                                    <p className="text-gray-600 font-light">
                                        {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
                                    </p>
                                    {orders && filteredOrders.length === 0 && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors duration-300"
                                        >
                                            Clear filters to see all orders
                                        </button>
                                    )}
                                </div>

                                {/* Empty State */}
                                {orders && filteredOrders.length === 0 && (
                                    <div className="flex flex-col items-center justify-center gap-6 p-12 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-xl border-2 border-purple-100/50 text-center">
                                        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                            <InventoryIcon sx={{ fontSize: 48, color: '#8B5CF6' }} />
                                        </div>
                                        <div>
                                            <span className="text-2xl font-bold text-gray-900 block mb-2">No orders found</span>
                                            <p className="text-gray-600 font-light max-w-md">
                                                {search || status || orderTime 
                                                    ? "Try adjusting your search or filters to find what you're looking for."
                                                    : "You haven't placed any orders yet. Start exploring our luxury collection!"
                                                }
                                            </p>
                                        </div>
                                        {(search || status || orderTime) && (
                                            <button
                                                onClick={clearFilters}
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                            >
                                                Clear All Filters
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Orders List */}
                                <div className="space-y-4">
                                    {orders && filteredOrders.map((order) => {
                                        const { _id, orderStatus, orderItems, createdAt, deliveredAt } = order;

                                        return (
                                            orderItems.map((item, index) => (
                                                <OrderItem 
                                                    {...item} 
                                                    key={index} 
                                                    orderId={_id} 
                                                    orderStatus={orderStatus} 
                                                    createdAt={createdAt} 
                                                    deliveredAt={deliveredAt} 
                                                />
                                            ))
                                        )
                                    }).reverse()}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </main>

            {/* Mobile Filter Overlay */}
            {showMobileFilters && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 sm:hidden backdrop-blur-sm"
                    onClick={() => setShowMobileFilters(false)}
                ></div>
            )}
        </>
    );
};

export default MyOrders;