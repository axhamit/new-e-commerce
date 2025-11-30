import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

// Import Material-UI icons for consistency
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import KeyIcon from '@mui/icons-material/Key';
import DiamondIcon from '@mui/icons-material/Diamond';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmitHandler = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);
        formData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Update Password | Aarohama Tresure" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">

                {/* Luxury Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-blue-50/80 backdrop-blur-xl rounded-2xl mb-4 border border-purple-200/50 shadow-lg">
                        <SecurityIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                        <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                            Account Security
                        </span>
                        <LockIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Update <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Password</span>
                    </h1>
                    <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
                        Secure your account with a new password to continue enjoying our luxury experience
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="flex flex-col lg:flex-row max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-100 overflow-hidden">

                    {/* Sidebar - Enhanced */}
                    <div className="lg:w-2/5 bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-8 lg:p-12 relative overflow-hidden">
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-600/20 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center mb-8">
                                <DiamondIcon sx={{ fontSize: 32, color: '#A855F7' }} className="mr-3" />
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                    Aarohama Tresure
                                </span>
                            </div>
                            
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                                Secure Your <span className="text-purple-300">Luxury</span> Experience
                            </h2>
                            
                            <p className="text-purple-100/80 text-lg mb-8 font-light leading-relaxed">
                                Protect your exclusive access to premium collections, personalized styling, and VIP events with a strong, secure password.
                            </p>

                            {/* Security Features */}
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <LockIcon sx={{ fontSize: 20, color: 'white' }} />
                                    </div>
                                    <span className="text-purple-100 font-medium">Bank-level encryption</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <SecurityIcon sx={{ fontSize: 20, color: 'white' }} />
                                    </div>
                                    <span className="text-purple-100 font-medium">Secure authentication</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <KeyIcon sx={{ fontSize: 20, color: 'white' }} />
                                    </div>
                                    <span className="text-purple-100 font-medium">Privacy protection</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:w-3/5 p-8 sm:p-12">
                        <div className="max-w-md mx-auto">
                            {/* Form Header */}
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl border-2 border-white/40">
                                    <KeyIcon sx={{ fontSize: 32, color: 'white' }} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Update Your Password
                                </h3>
                                <p className="text-gray-600 font-light">
                                    Enter your current and new password to secure your account
                                </p>
                            </div>

                            {/* Password Form */}
                            <form onSubmit={updatePasswordSubmitHandler} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="group">
                                        <TextField
                                            fullWidth
                                            label="Current Password"
                                            type="password"
                                            name="oldPassword"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                            variant="outlined"
                                            className="group-hover:shadow-lg transition-all duration-300"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    backgroundColor: 'white',
                                                    '&:hover fieldset': {
                                                        borderColor: '#8B5CF6',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#8B5CF6',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#8B5CF6',
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="group">
                                        <TextField
                                            fullWidth
                                            label="New Password"
                                            type="password"
                                            name="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            variant="outlined"
                                            className="group-hover:shadow-lg transition-all duration-300"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    backgroundColor: 'white',
                                                    '&:hover fieldset': {
                                                        borderColor: '#8B5CF6',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#8B5CF6',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#8B5CF6',
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="group">
                                        <TextField
                                            fullWidth
                                            label="Confirm New Password"
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            variant="outlined"
                                            className="group-hover:shadow-lg transition-all duration-300"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    backgroundColor: 'white',
                                                    '&:hover fieldset': {
                                                        borderColor: '#8B5CF6',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#8B5CF6',
                                                    },
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#8B5CF6',
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-4 pt-4">
                                    <button 
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-purple-500/20 flex items-center justify-center group"
                                    >
                                        <LockIcon sx={{ fontSize: 20 }} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                                        Update Password
                                    </button>
                                    
                                    <Link 
                                        to="/account"
                                        className="w-full bg-white text-gray-700 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                                    >
                                        <ArrowBackIcon sx={{ fontSize: 20 }} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                                        Back to Account
                                    </Link>
                                </div>
                            </form>

                            {/* Security Tips */}
                            <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                    <SecurityIcon sx={{ fontSize: 18, color: '#8B5CF6' }} className="mr-2" />
                                    Security Tips
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Use at least 8 characters with mixed case</li>
                                    <li>• Include numbers and special characters</li>
                                    <li>• Avoid using personal information</li>
                                    <li>• Don't reuse passwords from other sites</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Decorative Elements */}
                <div className="fixed bottom-0 left-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>
                <div className="fixed top-0 right-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl -z-10"></div>
            </main>
        </>
    );
};

export default UpdatePassword;