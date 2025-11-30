import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

// Import Material-UI icons for consistency
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SecurityIcon from '@mui/icons-material/Security';
import EditIcon from '@mui/icons-material/Edit';
import DiamondIcon from '@mui/icons-material/Diamond';
import HelpIcon from '@mui/icons-material/Help';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const Account = () => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate]);

    const getLastName = () => {
        const nameArray = user.name.split(" ");
        return nameArray[nameArray.length - 1];
    }

    return (
        <>
            <MetaData title="My Profile | Aarohama Tresure" />

            {loading ? <Loader /> :
                <>

                    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 py-8 px-4 sm:px-6 lg:px-8 mt-20">

                        {/* Luxury Header Section */}
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-blue-50/80 backdrop-blur-xl rounded-2xl mb-4 border border-purple-200/50 shadow-lg">
                                <PersonIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                                <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                                    Luxury Profile
                                </span>
                                <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Welcome, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{user.name.split(" ", 1)}</span>
                            </h1>
                            <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
                                Manage your luxury shopping experience and personal preferences
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

                            {/* Sidebar */}
                            <div className="">
                                <Sidebar activeTab={"profile"} />
                            </div>

                            {/* Main Content */}
                            <div className="flex-1">
                                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-100 overflow-hidden">
                                    
                                    {/* Profile Header */}
                                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 sm:p-8 text-white">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Your Profile</h2>
                                                <p className="text-purple-100 font-light">Manage your personal information and preferences</p>
                                            </div>
                                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                                                <PersonIcon sx={{ fontSize: 32, color: 'white' }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Content */}
                                    <div className="p-6 sm:p-8 space-y-8">

                                        {/* Personal Information Section */}
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                                    <PersonIcon sx={{ fontSize: 24, color: '#8B5CF6' }} className="mr-3" />
                                                    Personal Information
                                                </h3>
                                                <Link 
                                                    to="/account/update" 
                                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center group"
                                                >
                                                    <EditIcon sx={{ fontSize: 18 }} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                                    Edit
                                                </Link>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {/* First Name */}
                                                <div className="group">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                        <PersonIcon sx={{ fontSize: 16, color: '#6B7280' }} className="mr-2" />
                                                        First Name
                                                    </label>
                                                    <div className="bg-white rounded-xl p-4 border-2 border-gray-200 group-hover:border-purple-300 transition-all duration-300 shadow-sm">
                                                        <p className="text-gray-900 font-medium">{user.name.split(" ", 1)}</p>
                                                    </div>
                                                </div>

                                                {/* Last Name */}
                                                <div className="group">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Last Name
                                                    </label>
                                                    <div className="bg-white rounded-xl p-4 border-2 border-gray-200 group-hover:border-purple-300 transition-all duration-300 shadow-sm">
                                                        <p className="text-gray-900 font-medium">{getLastName()}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Gender */}
                                            <div className="mt-6">
                                                <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
                                                    <PersonIcon sx={{ fontSize: 16, color: '#6B7280' }} className="mr-2" />
                                                    Your Gender
                                                </label>
                                                <div className="flex gap-6">
                                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${user.gender === "male" ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} transition-all duration-300`}>
                                                        <MaleIcon sx={{ fontSize: 20, color: user.gender === "male" ? '#3B82F6' : '#9CA3AF' }} />
                                                        <span className={`font-medium ${user.gender === "male" ? 'text-blue-700' : 'text-gray-500'}`}>
                                                            Male
                                                        </span>
                                                    </div>
                                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${user.gender === "female" ? 'border-pink-500 bg-pink-50' : 'border-gray-200 bg-white'} transition-all duration-300`}>
                                                        <FemaleIcon sx={{ fontSize: 20, color: user.gender === "female" ? '#EC4899' : '#9CA3AF' }} />
                                                        <span className={`font-medium ${user.gender === "female" ? 'text-pink-700' : 'text-gray-500'}`}>
                                                            Female
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Information Section */}
                                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                                    <EmailIcon sx={{ fontSize: 24, color: '#06B6D4' }} className="mr-3" />
                                                    Contact Information
                                                </h3>
                                                <div className="flex gap-3">
                                                    <Link 
                                                        to="/account/update" 
                                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center group"
                                                    >
                                                        <EditIcon sx={{ fontSize: 18 }} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                                        Edit
                                                    </Link>
                                                    <Link 
                                                        to="/password/update" 
                                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center group"
                                                    >
                                                        <SecurityIcon sx={{ fontSize: 18 }} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                                                        Password
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {/* Email */}
                                                <div className="group">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                        <EmailIcon sx={{ fontSize: 16, color: '#6B7280' }} className="mr-2" />
                                                        Email Address
                                                    </label>
                                                    <div className="bg-white rounded-xl p-4 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300 shadow-sm">
                                                        <p className="text-gray-900 font-medium">{user.email}</p>
                                                    </div>
                                                </div>

                                                {/* Phone Number */}
                                                <div className="group">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                        <PhoneIcon sx={{ fontSize: 16, color: '#6B7280' }} className="mr-2" />
                                                        Mobile Number
                                                    </label>
                                                    <div className="bg-white rounded-xl p-4 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300 shadow-sm flex items-center justify-between">
                                                        <p className="text-gray-900 font-medium">+919876543210</p>
                                                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-300">
                                                            Verify
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* FAQ Section */}
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                                <HelpIcon sx={{ fontSize: 24, color: '#F59E0B' }} className="mr-3" />
                                                Frequently Asked Questions
                                            </h3>
                                            
                                            <div className="space-y-6">
                                                <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                                        What happens when I update my email address (or mobile number)?
                                                    </h4>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
                                                    </p>
                                                </div>

                                                <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                                        When will my Aarohama Tresure account be updated with the new email address?
                                                    </h4>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        It happens as soon as you confirm the verification code sent to your email and save the changes.
                                                    </p>
                                                </div>

                                                <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                                        What happens to my existing account when I update my email address?
                                                    </h4>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        Updating your email address doesn't invalidate your account. Your account remains fully functional with all your order history and personal details.
                                                    </p>
                                                </div>

                                                <div className="bg-white rounded-xl p-5 border border-amber-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                                        Does my VIP account get affected when I update my email address?
                                                    </h4>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        Aarohama Tresure has a 'single sign-on' policy. Any changes will reflect in your VIP account automatically.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Account Actions */}
                                        <div className="text-center pt-6">
                                            <Link 
                                                to="/" 
                                                className="inline-flex items-center text-gray-600 hover:text-red-600 font-medium transition-colors duration-300 group"
                                            >
                                                <SecurityIcon sx={{ fontSize: 18 }} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                                                Deactivate Account
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Luxury Footer */}
                                    <div className="bg-gradient-to-r from-gray-900 to-black text-white p-8 text-center">
                                        <div className="flex items-center justify-center mb-4">
                                            <DiamondIcon sx={{ fontSize: 24, color: '#A855F7' }} className="mr-2" />
                                            <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                                Aarohama Tresure
                                            </span>
                                        </div>
                                        <p className="text-gray-300 font-light">
                                            Your luxury fashion journey, perfectly personalized
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decorative Elements */}
                        <div className="fixed bottom-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>
                        <div className="fixed top-0 right-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl -z-10"></div>
                    </main>
                </>
            }
        </>
    );
};

export default Account;