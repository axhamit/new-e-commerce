import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../actions/userAction';

// Import additional icons for consistency
import DiamondIcon from '@mui/icons-material/Diamond';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DiscountIcon from '@mui/icons-material/Discount';

const Sidebar = ({ activeTab }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/login");
    };

    return (
        <div className="w-full bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 lg:h-[90vh] rounded-3xl shadow-2xl border-2 border-purple-100/50 overflow-hidden backdrop-blur-sm">

            {/* Profile Card - Enhanced */}
            <div className="relative p-8 bg-gradient-to-r from-purple-600/10 via-pink-600/5 to-amber-600/5 border-b-2 border-purple-100/50 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-200/20 rounded-full blur-xl"></div>
                
                <div className="flex items-center gap-6 relative z-10">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/60 shadow-xl">
                            <img
                                draggable="false"
                                className="h-full w-full object-cover"
                                src={user?.avatar?.url || "/defaultProfile.png"}
                                alt="Avatar"
                            />
                        </div>
                        {/* Online Status Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <p className="text-sm text-gray-500 font-light mb-1">Hello,</p>
                        <h2 className="font-bold text-gray-900 text-xl mb-1">{user?.name}</h2>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                <DiamondIcon sx={{ fontSize: 12 }} />
                                <span>Premium Member</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Container */}
            <div className="flex flex-col p-4 space-y-2">

                {/* My Orders */}
                <Link
                    to="/orders"
                    className={`group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] ${
                        activeTab === "orders"
                            ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-l-4 border-blue-500 shadow-lg shadow-blue-500/20"
                            : "bg-white/50 hover:bg-white/80 border-l-4 border-transparent hover:border-gray-200 shadow-sm hover:shadow-xl"
                    }`}
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                        activeTab === "orders"
                            ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white transform scale-110"
                            : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600 group-hover:scale-110"
                    }`}>
                        <FolderIcon sx={{ fontSize: 22 }} />
                    </div>
                    <div className="flex-1">
                        <span className={`font-semibold text-lg ${
                            activeTab === "orders" ? "text-blue-600" : "text-gray-700"
                        }`}>
                            MY ORDERS
                        </span>
                    </div>
                    <ChevronRightIcon sx={{ 
                        fontSize: 20, 
                        className: `transition-transform duration-300 ${
                            activeTab === "orders" ? "text-blue-500" : "text-gray-400 group-hover:text-gray-600"
                        }` 
                    }} />
                </Link>

                {/* Account Settings */}
                <div className="bg-white/50 rounded-2xl shadow-sm overflow-hidden border border-gray-100/50">
                    <div className={`flex items-center gap-4 px-4 py-4 transition-all duration-300 ${
                        activeTab === "profile" ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10" : ""
                    }`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                            activeTab === "profile"
                                ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white transform scale-110"
                                : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600"
                        }`}>
                            <PersonIcon sx={{ fontSize: 22 }} />
                        </div>
                        <span className="flex-1 font-semibold text-lg text-gray-700">ACCOUNT SETTINGS</span>
                    </div>

                    <div className="flex flex-col pb-3 text-sm space-y-1">
                        <Link
                            to="/account"
                            className={`px-6 py-3 pl-20 transition-all duration-300 rounded-lg mx-2 ${
                                activeTab === "profile"
                                    ? "bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-purple-600 font-semibold border-l-4 border-purple-500"
                                    : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-800"
                            }`}
                        >
                            Profile Information
                        </Link>

                        <Link 
                            to="/addresses" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 rounded-lg mx-2 transition-all duration-300"
                        >
                            Manage Addresses
                        </Link>
                        <Link 
                            to="/pan" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50/80 hover:text-gray-800 rounded-lg mx-2 transition-all duration-300"
                        >
                            PAN Card Information
                        </Link>
                    </div>
                </div>

                {/* Payments */}
                <div className="bg-white/50 rounded-2xl shadow-sm overflow-hidden border border-gray-100/50">
                    <div className="flex items-center gap-4 px-4 py-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-gray-600 shadow-lg">
                            <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />
                        </div>
                        <span className="flex-1 font-semibold text-lg text-gray-700">PAYMENTS</span>
                    </div>

                    <div className="flex flex-col pb-3 text-sm space-y-1">
                        <Link to="/gift-cards" className="px-6 py-3 pl-20 hover:bg-gray-50/80 hover:text-gray-800 rounded-lg mx-2 transition-all duration-300 flex items-center justify-between">
                            <span>Gift Cards</span>
                            <span className="text-emerald-600 font-semibold">₹0</span>
                        </Link>
                        <Link to="/upi" className="px-6 py-3 pl-20 hover:bg-gray-50/80 hover:text-gray-800 rounded-lg mx-2 transition-all duration-300 flex items-center gap-2">
                            <AccountBalanceIcon sx={{ fontSize: 18 }} />
                            Saved UPI
                        </Link>
                        <Link to="/cards" className="px-6 py-3 pl-20 hover:bg-gray-50/80 hover:text-gray-800 rounded-lg mx-2 transition-all duration-300 flex items-center gap-2">
                            <CreditCardIcon sx={{ fontSize: 18 }} />
                            Saved Cards
                        </Link>
                    </div>
                </div>

                {/* Chats */}
                <Link 
                    to="/chats" 
                    className="group flex items-center gap-4 px-4 py-4 bg-white/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-100/50 hover:border-gray-200"
                >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-50 flex items-center justify-center text-gray-600 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <ChatIcon sx={{ fontSize: 22 }} />
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold text-lg text-gray-700">MY CHATS</span>
                    </div>
                    <ChevronRightIcon sx={{ 
                        fontSize: 20, 
                        className: "text-gray-400 group-hover:text-gray-600 transition-colors duration-300" 
                    }} />
                </Link>

                {/* My Stuff */}
                <div className="bg-white/50 rounded-2xl shadow-sm overflow-hidden border border-gray-100/50">
                    <div className={`flex items-center gap-4 px-4 py-4 transition-all duration-300 ${
                        activeTab === "wishlist" ? "bg-gradient-to-r from-pink-500/10 to-rose-500/10" : ""
                    }`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                            activeTab === "wishlist"
                                ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white transform scale-110"
                                : "bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600"
                        }`}>
                            <FolderSharedIcon sx={{ fontSize: 22 }} />
                        </div>
                        <span className="flex-1 font-semibold text-lg text-gray-700">MY STUFF</span>
                    </div>

                    <div className="flex flex-col pb-3 text-sm space-y-1">
                        <Link to="/coupons" className="px-6 py-3 pl-20 hover:bg-gray-50/80 hover:text-gray-800 rounded-lg mx-2 transition-all duration-300 flex items-center gap-2">
                            <DiscountIcon sx={{ fontSize: 18 }} />
                            My Coupons
                        </Link>
                        <Link to="/reviews" className="px-6 py-3 pl-20 hover:bg-gray-50/80 hover:text-gray-800 rounded-lg mx-2 transition-all duration-300 flex items-center gap-2">
                            <ReviewsIcon sx={{ fontSize: 18 }} />
                            My Reviews
                        </Link>
                        <Link to="/notifications" className="px-6 py-3 pl-20 hover:bg-gray-50/80 hover:text-gray-800 rounded-lg mx-2 transition-all duration-300 flex items-center gap-2">
                            <NotificationsIcon sx={{ fontSize: 18 }} />
                            Notifications
                        </Link>

                        <Link
                            to="/wishlist"
                            className={`px-6 py-3 pl-20 flex items-center gap-3 rounded-lg mx-2 transition-all duration-300 ${
                                activeTab === "wishlist"
                                    ? "bg-gradient-to-r from-pink-500/15 to-rose-500/15 text-pink-600 font-semibold border-l-4 border-pink-500"
                                    : "hover:bg-gray-50/80 hover:text-gray-800"
                            }`}
                        >
                            <FavoriteIcon sx={{ fontSize: 18 }} />
                            My Wishlist
                        </Link>
                    </div>
                </div>

                {/* LOGOUT */}
                <div 
                    onClick={handleLogout} 
                    className="group flex items-center gap-4 px-4 py-4 bg-white/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-100/50 hover:border-red-200 cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-600 shadow-lg group-hover:bg-gradient-to-br group-hover:from-red-100 group-hover:to-pink-50 group-hover:scale-110 transition-all duration-500">
                        <PowerSettingsNewIcon sx={{ fontSize: 22 }} />
                    </div>
                    <div className="flex-1">
                        <span className="font-semibold text-lg text-gray-700 group-hover:text-red-600 transition-colors duration-300">
                            Logout
                        </span>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Sidebar;