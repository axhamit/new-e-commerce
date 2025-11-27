import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import DiamondIcon from '@mui/icons-material/Diamond';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CelebrationIcon from '@mui/icons-material/Celebration';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const redirect = location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`)
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    const luxuryFeatures = [
        {
            icon: <AutoAwesomeIcon sx={{ fontSize: 24, color: 'white' }} />,
            text: "Exclusive Member Collections",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 24, color: 'white' }} />,
            text: "Priority Shipping",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <CelebrationIcon sx={{ fontSize: 24, color: 'white' }} />,
            text: "Early Access to Sales",
            gradient: "from-amber-500 to-orange-500"
        },
        {
            icon: <StarIcon sx={{ fontSize: 24, color: 'white' }} />,
            text: "Personalized Style Advice",
            gradient: "from-emerald-500 to-teal-500"
        }
    ];

    return (
        <>
            <MetaData title="Sign In | Aarohama Tresure" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                
                {/* Background decorative elements matching home page */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 -translate-x-48 translate-y-48"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-10"></div>

                <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white border-2 border-gray-100 backdrop-blur-sm">
                    
                    {/* Luxury Brand Sidebar - Enhanced to match home page */}
                    <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-12 relative overflow-hidden">
                        {/* Background Pattern matching home page */}
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-center">
                            {/* Luxury Header matching home page style */}
                            <div className="mb-12">
                                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl mb-8 border border-white/20 shadow-lg">
                                    <DiamondIcon sx={{ fontSize: 20, color: 'white' }} className="mr-2" />
                                    <span className="text-white font-bold text-sm tracking-widest uppercase">
                                        Exclusive Access
                                    </span>
                                    <DiamondIcon sx={{ fontSize: 20, color: 'white' }} className="ml-2" />
                                </div>
                                
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 shadow-2xl border-2 border-white/20 mx-auto">
                                    <PersonIcon className="text-white text-3xl" />
                                </div>
                                
                                <h1 className="text-4xl font-bold mb-6 text-center">
                                    Welcome <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Back</span>
                                </h1>
                                <p className="text-purple-200 text-lg font-light leading-relaxed text-center max-w-md mx-auto">
                                    Continue your luxury shopping journey with personalized recommendations, exclusive benefits, and VIP treatment.
                                </p>
                            </div>
                            
                            {/* Luxury Features Grid matching home page */}
                            <div className="space-y-6 mt-8">
                                {luxuryFeatures.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-300`}>
                                            {feature.icon}
                                        </div>
                                        <span className="text-purple-100 font-light text-base">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom decorative text */}
                            <div className="mt-12 text-center">
                                <p className="text-purple-300 text-sm font-light italic">
                                    "Where luxury meets personal style"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Form - Enhanced to match home page styling */}
                    <div className="w-full lg:w-3/5 p-8 sm:p-12 lg:p-16">
                        <div className="max-w-md mx-auto w-full">
                            
                            {/* Mobile Header - Enhanced */}
                            <div className="lg:hidden text-center mb-12">
                                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm rounded-2xl mb-6 border border-purple-200/50 shadow-lg">
                                    <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                                    <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                                        Sign In
                                    </span>
                                    <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                                </div>
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl border-2 border-white/20 mx-auto">
                                    <PersonIcon className="text-white text-2xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                    Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Aarohama Tresure</span>
                                </h2>
                                <p className="text-gray-600 font-light">Sign in to your luxury account</p>
                            </div>

                            {/* Desktop Header */}
                            <div className="hidden lg:block text-center mb-12">
                                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm rounded-2xl mb-6 border border-purple-200/50 shadow-lg">
                                    <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                                    <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                                        Member Sign In
                                    </span>
                                    <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Sign In to Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Account</span>
                                </h2>
                                <p className="text-gray-600 font-light">Enter your credentials to access exclusive benefits</p>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Email Field - Enhanced */}
                                <div className="relative group">
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        variant="outlined"
                                        size="medium"
                                        InputProps={{
                                            startAdornment: (
                                                <EmailIcon className="text-gray-400 mr-3" sx={{ fontSize: 20 }} />
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                '&:hover fieldset': {
                                                    borderColor: '#8B5CF6',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#8B5CF6',
                                                    borderWidth: '2px',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: '#8B5CF6',
                                                },
                                            },
                                        }}
                                    />
                                    {/* Glow effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                                </div>

                                {/* Password Field - Enhanced */}
                                <div className="relative group">
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        variant="outlined"
                                        size="medium"
                                        InputProps={{
                                            startAdornment: (
                                                <LockIcon className="text-gray-400 mr-3" sx={{ fontSize: 20 }} />
                                            ),
                                            endAdornment: (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                    size="small"
                                                    sx={{ color: 'gray' }}
                                                >
                                                    {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                                                </IconButton>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '16px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                '&:hover fieldset': {
                                                    borderColor: '#8B5CF6',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#8B5CF6',
                                                    borderWidth: '2px',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '15px',
                                                '&.Mui-focused': {
                                                    color: '#8B5CF6',
                                                },
                                            },
                                        }}
                                    />
                                    {/* Glow effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                                </div>

                                {/* Forgot Password */}
                                <div className="text-right -mt-2">
                                    <Link 
                                        to="/password/forgot" 
                                        className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors inline-block hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>

                                {/* Login Button - Matching home page style */}
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-purple-500/20 backdrop-blur-sm overflow-hidden"
                                >
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                            Signing In...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <LockIcon sx={{ fontSize: 18 }} className="mr-2" />
                                            Sign In to Your Account
                                        </span>
                                    )}
                                </button>

                                {/* Terms */}
                                <p className="text-xs text-gray-500 text-center font-light leading-relaxed px-4">
                                    By continuing, you agree to Aarohama Tresure's{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Terms of Service</a>{' '}
                                    and acknowledge our{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Privacy Policy</a>.
                                </p>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center my-8">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="px-4 text-gray-500 text-sm font-light bg-white">or continue with</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>

                            {/* Social Login - Enhanced */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button className="group flex items-center justify-center gap-3 border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm hover:shadow-lg">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Google
                                </button>
                                <button className="group flex items-center justify-center gap-3 border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm hover:shadow-lg">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    Facebook
                                </button>
                            </div>

                            {/* Sign Up Link - Enhanced */}
                            <div className="text-center">
                                <p className="text-gray-600 font-light text-sm mb-2">
                                    New to Aarohama Tresure?
                                </p>
                                <Link 
                                    to="/register" 
                                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 group text-base"
                                >
                                    Create your luxury account
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Login;