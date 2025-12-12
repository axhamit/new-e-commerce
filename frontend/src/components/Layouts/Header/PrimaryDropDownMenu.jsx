import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';

const PrimaryDropDownMenu = ({ setTogglePrimaryDropDown, user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        setTogglePrimaryDropDown(false);
    }

    const navs = [
        {
            title: "Supercoin Zone",
            icon: <OfflineBoltIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Aarohama Plus Zone",
            icon: <AddCircleIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Orders",
            icon: <ShoppingBagIcon sx={{ fontSize: "18px" }} />,
            redirect: "/orders",
        },
        {
            title: "Wishlist",
            icon: <FavoriteIcon sx={{ fontSize: "18px" }} />,
            redirect: "/wishlist",
        },
        {
            title: "My Chats",
            icon: <ChatIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Coupons",
            icon: <ConfirmationNumberIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Gift Cards",
            icon: <AccountBalanceWalletIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Notifications",
            icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
    ]

    return (
        <div className="absolute w-72 -left-20 ml-2 top-12 bg-white shadow-2xl rounded-2xl flex-col text-sm border border-gray-100 backdrop-blur-lg bg-white/95">
            
            {/* User Info Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon sx={{ fontSize: "20px" }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Admin Dashboard */}
            {user.role === "admin" &&
                <Link 
                    className="flex items-center space-x-3 p-4 border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 group first:rounded-t-2xl" 
                    to="/admin/dashboard"
                    onClick={() => setTogglePrimaryDropDown(false)}
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <DashboardIcon sx={{ fontSize: "16px", color: "white" }} />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">Admin Dashboard</span>
                </Link>
            }

            {/* My Profile */}
            <Link 
                className="flex items-center space-x-3 p-4 border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 group"
                to="/account"
                onClick={() => setTogglePrimaryDropDown(false)}
            >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <AccountCircleIcon sx={{ fontSize: "16px", color: "white" }} />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-blue-600">My Profile</span>
            </Link>

            {/* Navigation Items */}
            <div className="max-h-80 overflow-y-auto">
                {navs.map((item, i) => {
                    const { title, icon, redirect } = item;

                    return (
                        <React.Fragment key={i}>
                            {title === "Wishlist" ? (
                                <Link 
                                    className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 group"
                                    to={redirect}
                                    onClick={() => setTogglePrimaryDropDown(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                                            {React.cloneElement(icon, { sx: { fontSize: "16px", color: "white" } })}
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-blue-600">{title}</span>
                                    </div>
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-6 flex justify-center items-center">
                                        {wishlistItems.length}
                                    </span>
                                </Link>
                            ) : (
                                <Link 
                                    className="flex items-center space-x-3 p-4 border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 group"
                                    to={redirect}
                                    onClick={() => setTogglePrimaryDropDown(false)}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                        {React.cloneElement(icon, { sx: { fontSize: "16px", color: "white" } })}
                                    </div>
                                    <span className="font-medium text-gray-700 group-hover:text-blue-600">{title}</span>
                                </Link>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>

            {/* Logout Button */}
            <div 
                className="flex items-center space-x-3 p-4 hover:bg-red-50 transition-all duration-200 group rounded-b-2xl cursor-pointer" 
                onClick={handleLogout}
            >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                    <PowerSettingsNewIcon sx={{ fontSize: "16px", color: "white" }} />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-red-600">Logout</span>
            </div>

            {/* Arrow Indicator */}
            <div className="absolute -top-2 right-6">
                <div className="w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45 transform"></div>
            </div>
        </div>
    );
};

export default PrimaryDropDownMenu;