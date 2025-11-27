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

const Sidebar = ({ activeTab }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/login");
    }

    return (
        <div className="w-full lg:w-1/4">

            {/* Profile Card */}
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg mb-6 border border-gray-100">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-200">
                    <img 
                        draggable="false" 
                        className="h-full w-full object-cover" 
                        src={user.avatar.url} 
                        alt="Avatar" 
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-sm text-gray-500 font-light">Hello,</p>
                    <h2 className="font-bold text-gray-900 text-lg">{user.name}</h2>
                    <p className="text-xs text-gray-500">Premium Member</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

                {/* My Orders */}
                <Link 
                    to="/orders" 
                    className={`flex items-center gap-4 px-6 py-4 border-b border-gray-100 transition-all duration-300 ${
                        activeTab === "orders" 
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-l-blue-500" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activeTab === "orders" 
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                            : "bg-gray-100 text-gray-600"
                    }`}>
                        <FolderIcon sx={{ fontSize: "20px" }} />
                    </div>
                    <span className="flex-1 font-semibold">MY ORDERS</span>
                    <ChevronRightIcon sx={{ fontSize: "18px", color: activeTab === "orders" ? "#3B82F6" : "#9CA3AF" }} />
                </Link>

                {/* Account Settings */}
                <div className="border-b border-gray-100">
                    <div className={`flex items-center gap-4 px-6 py-4 ${
                        activeTab === "profile" ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500" : ""
                    }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            activeTab === "profile" 
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                                : "bg-gray-100 text-gray-600"
                        }`}>
                            <PersonIcon sx={{ fontSize: "20px" }} />
                        </div>
                        <span className="flex-1 font-semibold text-gray-600">ACCOUNT SETTINGS</span>
                    </div>
                    <div className="flex flex-col pb-3 text-sm">
                        <Link 
                            to="/account" 
                            className={`px-6 py-3 pl-20 transition-all duration-300 ${
                                activeTab === "profile" 
                                    ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-l-blue-500" 
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            Profile Information
                        </Link>
                        <Link 
                            to="/addresses" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                            Manage Addresses
                        </Link>
                        <Link 
                            to="/pan" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                            PAN Card Information
                        </Link>
                    </div>
                </div>

                {/* Payments */}
                <div className="border-b border-gray-100">
                    <div className="flex items-center gap-4 px-6 py-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                            <AccountBalanceWalletIcon sx={{ fontSize: "20px" }} />
                        </div>
                        <span className="flex-1 font-semibold text-gray-600">PAYMENTS</span>
                    </div>
                    <div className="flex flex-col pb-3 text-sm">
                        <Link 
                            to="/gift-cards" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 flex justify-between items-center"
                        >
                            Gift Cards <span className="font-semibold text-green-600">₹0</span>
                        </Link>
                        <Link 
                            to="/upi" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                            Saved UPI
                        </Link>
                        <Link 
                            to="/cards" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                            Saved Cards
                        </Link>
                    </div>
                </div>

                {/* My Chats */}
                <Link 
                    to="/chats" 
                    className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                        <ChatIcon sx={{ fontSize: "20px" }} />
                    </div>
                    <span className="flex-1 font-semibold">MY CHATS</span>
                    <ChevronRightIcon sx={{ fontSize: "18px", color: "#9CA3AF" }} />
                </Link>

                {/* My Stuff */}
                <div className="border-b border-gray-100">
                    <div className={`flex items-center gap-4 px-6 py-4 ${
                        activeTab === "wishlist" ? "bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500" : ""
                    }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            activeTab === "wishlist" 
                                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white" 
                                : "bg-gray-100 text-gray-600"
                        }`}>
                            <FolderSharedIcon sx={{ fontSize: "20px" }} />
                        </div>
                        <span className="flex-1 font-semibold text-gray-600">MY STUFF</span>
                    </div>
                    <div className="flex flex-col pb-3 text-sm">
                        <Link 
                            to="/coupons" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                            My Coupons
                        </Link>
                        <Link 
                            to="/reviews" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                            My Reviews & Ratings
                        </Link>
                        <Link 
                            to="/notifications" 
                            className="px-6 py-3 pl-20 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                            All Notifications
                        </Link>
                        <Link 
                            to="/wishlist" 
                            className={`px-6 py-3 pl-20 transition-all duration-300 flex items-center gap-2 ${
                                activeTab === "wishlist" 
                                    ? "bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600 font-semibold border-l-4 border-l-pink-500" 
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <FavoriteIcon sx={{ fontSize: "16px" }} />
                            My Wishlist
                        </Link>
                    </div>
                </div>

                {/* Logout */}
                <div 
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-6 py-4 text-gray-600 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all duration-300"
                >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600">
                        <PowerSettingsNewIcon sx={{ fontSize: "20px" }} />
                    </div>
                    <span className="flex-1 font-semibold">Logout</span>
                    <ChevronRightIcon sx={{ fontSize: "18px", color: "#9CA3AF" }} />
                </div>

            </div>

            {/* Frequently Visited */}
            <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-lg mt-6 border border-gray-100">
                <span className="text-sm font-semibold text-gray-900">Quick Links:</span>
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link 
                        to="/password/update" 
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                    >
                        Change Password
                    </Link>
                    <Link 
                        to="/orders" 
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                    >
                        Track Order
                    </Link>
                    <Link 
                        to="/help" 
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                    >
                        Help Center
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;