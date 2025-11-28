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
import GoogleLoginButton from '../googleLogin/GoogleLogin';

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
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center p-4 sm:p-6 lg:p-8 lg:m-20 relative overflow-hidden">
                
                {/* Background decorative elements matching home page */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 -translate-x-48 translate-y-48"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-10"></div>

                <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white border-2 border-gray-100 backdrop-blur-sm">
                    
                    {/* Luxury Brand Sidebar - Enhanced with 2x2 grid layout */}
                    <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-8 lg:p-12 relative overflow-hidden">
                        {/* Background Pattern matching home page */}
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-center">
                            {/* Luxury Header matching home page style */}
                            <div className="mb-8 lg:mb-12">
                                <div className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-white/10 backdrop-blur-xl rounded-2xl mb-6 lg:mb-8 border border-white/20 shadow-lg mx-auto">
                                    <DiamondIcon sx={{ fontSize: 16, color: 'white' }} className="mr-2" />
                                    <span className="text-white font-bold text-xs lg:text-sm tracking-widest uppercase">
                                        Exclusive Access
                                    </span>
                                    <DiamondIcon sx={{ fontSize: 16, color: 'white' }} className="ml-2" />
                                </div>
                                
                                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-2xl border-2 border-white/20 mx-auto">
                                    <PersonIcon className="text-white text-2xl lg:text-3xl" />
                                </div>
                                
                                <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 text-center">
                                    Welcome <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Back</span>
                                </h1>
                                <p className="text-purple-200 text-sm lg:text-lg font-light leading-relaxed text-center max-w-md mx-auto px-2">
                                    Continue your luxury shopping journey with personalized recommendations, exclusive benefits, and VIP treatment.
                                </p>
                            </div>
                            
                            {/* Luxury Features Grid - 2x2 layout */}
                            <div className="grid grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-8">
                                {luxuryFeatures.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className="group flex flex-col items-center text-center gap-3 p-3 lg:p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 min-h-[120px] justify-center"
                                    >
                                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-300`}>
                                            {feature.icon}
                                        </div>
                                        <span className="text-purple-100 font-light text-xs lg:text-sm leading-tight px-1">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom decorative text */}
                            <div className="mt-8 lg:mt-12 text-center">
                                <p className="text-purple-300 text-xs lg:text-sm font-light italic">
                                    "Where luxury meets personal style"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Form - Enhanced mobile responsiveness */}
                    <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-12 xl:p-16">
                        <div className="max-w-md mx-auto w-full">
                            
                            {/* Mobile Header - Enhanced for better mobile view */}
                            <div className="lg:hidden text-center mb-8">
                                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm rounded-2xl mb-4 border border-purple-200/50 shadow-lg">
                                    <DiamondIcon sx={{ fontSize: 16, color: '#8B5CF6' }} className="mr-2" />
                                    <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-xs tracking-widest uppercase">
                                        Sign In
                                    </span>
                                    <DiamondIcon sx={{ fontSize: 16, color: '#EC4899' }} className="ml-2" />
                                </div>
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl border-2 border-white/20 mx-auto">
                                    <PersonIcon className="text-white text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Aarohama Tresure</span>
                                </h2>
                                <p className="text-gray-600 font-light text-sm">Sign in to your luxury account</p>
                            </div>

                            {/* Desktop Header */}
                            <div className="hidden lg:block text-center mb-8 lg:mb-12">
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
                            <form onSubmit={handleLogin} className="space-y-4 lg:space-y-6">
                                {/* Email Field - Enhanced for mobile */}
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
                                                borderRadius: '12px',
                                                fontSize: '14px',
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
                                                fontSize: '14px',
                                                '&.Mui-focused': {
                                                    color: '#8B5CF6',
                                                },
                                            },
                                        }}
                                    />
                                    {/* Glow effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                                </div>

                                {/* Password Field - Enhanced for mobile */}
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
                                                borderRadius: '12px',
                                                fontSize: '14px',
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
                                                fontSize: '14px',
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

                                {/* Login Button - Enhanced for mobile */}
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-sm lg:text-base shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-purple-500/20 backdrop-blur-sm overflow-hidden"
                                >
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                            Signing In...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <LockIcon sx={{ fontSize: 16 }} className="mr-2" />
                                            Sign In to Your Account
                                        </span>
                                    )}
                                </button>

                                {/* Terms */}
                                <p className="text-xs text-gray-500 text-center font-light leading-relaxed px-2 lg:px-4">
                                    By continuing, you agree to Aarohama Tresure's{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Terms of Service</a>{' '}
                                    and acknowledge our{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Privacy Policy</a>.
                                </p>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center my-6 lg:my-8">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="px-3 lg:px-4 text-gray-500 text-xs lg:text-sm font-light bg-white">or continue with</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>

                            {/* Social Login - Enhanced */}
                            <div className="mb-6 lg:mb-8">
                                <GoogleLoginButton text="Sign in with Google" />
                            </div>

                            {/* Sign Up Link - Enhanced for mobile */}
                            <div className="text-center">
                                <p className="text-gray-600 font-light text-xs lg:text-sm mb-2">
                                    New to Aarohama Tresure?
                                </p>
                                <Link 
                                    to="/register" 
                                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 group text-sm lg:text-base"
                                >
                                    Create your luxury account
                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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