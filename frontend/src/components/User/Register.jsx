import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import DiamondIcon from '@mui/icons-material/Diamond';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });

    const { name, email, gender, password, cpassword } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("preview.png");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }
        if (!avatar) {
            enqueueSnackbar("Select Avatar", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("password", password);
        formData.set("avatar", avatar);

        dispatch(registerUser(formData));
    }

    const handleDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    const luxuryFeatures = [
        {
            icon: <AutoAwesomeIcon sx={{ fontSize: 24, color: 'white' }} />,
            text: "Personalized Style Profile",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <StarIcon sx={{ fontSize: 24, color: 'white' }} />,
            text: "Exclusive Member Rewards",
            gradient: "from-amber-500 to-orange-500"
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 24, color: 'white' }} />,
            text: "Early Access to Collections",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: <CelebrationIcon sx={{ fontSize: 24, color: 'white' }} />,
            text: "Personal Shopping Assistance",
            gradient: "from-emerald-500 to-teal-500"
        }
    ];

    return (
        <>
            <MetaData title="Join Aarohama Tresure | Luxury Fashion Community" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
                
                {/* Background decorative elements matching login page */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 -translate-x-48 translate-y-48"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-10"></div>

                <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white border-2 border-gray-100 backdrop-blur-sm">
                    
                    {/* Luxury Brand Sidebar - Enhanced to match login page */}
                    <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-12 relative overflow-hidden">
                        {/* Background Pattern matching login page */}
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-center">
                            {/* Luxury Header matching login page style */}
                            <div className="mb-12">
                                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl mb-8 border border-white/20 shadow-lg">
                                    <DiamondIcon sx={{ fontSize: 20, color: 'white' }} className="mr-2" />
                                    <span className="text-white font-bold text-sm tracking-widest uppercase">
                                        Exclusive Membership
                                    </span>
                                    <DiamondIcon sx={{ fontSize: 20, color: 'white' }} className="ml-2" />
                                </div>
                                
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 shadow-2xl border-2 border-white/20 mx-auto">
                                    <PersonIcon className="text-white text-3xl" />
                                </div>
                                
                                <h1 className="text-4xl font-bold mb-6 text-center">
                                    Join <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Aarohama Tresure</span>
                                </h1>
                                <p className="text-purple-200 text-lg font-light leading-relaxed text-center max-w-md mx-auto">
                                    Begin your luxury fashion journey with personalized recommendations, exclusive benefits, and VIP treatment from day one.
                                </p>
                            </div>
                            
                            {/* Luxury Features Grid matching login page */}
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
                                    "Your personal style journey begins here"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form - Enhanced to match login page styling */}
                    <div className="w-full lg:w-3/5 p-8 sm:p-12 lg:p-16">
                        <div className="max-w-2xl mx-auto w-full">
                            
                            {/* Mobile Header - Enhanced */}
                            <div className="lg:hidden text-center mb-12">
                                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm rounded-2xl mb-6 border border-purple-200/50 shadow-lg">
                                    <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                                    <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                                        Create Account
                                    </span>
                                    <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                                </div>
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl border-2 border-white/20 mx-auto">
                                    <PersonIcon className="text-white text-2xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                    Join <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Aarohama Tresure</span>
                                </h2>
                                <p className="text-gray-600 font-light">Create your luxury fashion account</p>
                            </div>

                            {/* Desktop Header */}
                            <div className="hidden lg:block text-center mb-12">
                                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm rounded-2xl mb-6 border border-purple-200/50 shadow-lg">
                                    <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                                    <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                                        Create Your Account
                                    </span>
                                    <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Join Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Luxury Community</span>
                                </h2>
                                <p className="text-gray-600 font-light">Create your account to unlock exclusive benefits</p>
                            </div>

                            {/* Registration Form */}
                            <form onSubmit={handleRegister} encType="multipart/form-data" className="space-y-6">
                                
                                {/* Name and Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <TextField
                                            fullWidth
                                            id="full-name"
                                            label="Full Name"
                                            name="name"
                                            value={name}
                                            onChange={handleDataChange}
                                            required
                                            variant="outlined"
                                            size="medium"
                                            InputProps={{
                                                startAdornment: (
                                                    <PersonIcon className="text-gray-400 mr-3" sx={{ fontSize: 20 }} />
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

                                    <div className="relative group">
                                        <TextField
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleDataChange}
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
                                </div>

                                {/* Gender Selection - Enhanced */}
                                <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 border-2 border-gray-100">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">Gender</label>
                                    <RadioGroup
                                        row
                                        aria-labelledby="gender-radio-buttons"
                                        name="gender"
                                        value={gender}
                                        onChange={handleDataChange}
                                        className="flex gap-8 justify-center"
                                    >
                                        <FormControlLabel 
                                            value="male" 
                                            control={
                                                <Radio 
                                                    required 
                                                    icon={
                                                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                                                            <MaleIcon sx={{ color: '#9CA3AF' }} />
                                                        </div>
                                                    }
                                                    checkedIcon={
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg border-2 border-white/20">
                                                            <MaleIcon sx={{ color: 'white' }} />
                                                        </div>
                                                    }
                                                    sx={{
                                                        padding: 0,
                                                        '&.Mui-checked': {
                                                            color: 'transparent',
                                                        },
                                                    }}
                                                />
                                            } 
                                            label={
                                                <span className="text-gray-700 font-medium ml-2">Male</span>
                                            } 
                                        />
                                        <FormControlLabel 
                                            value="female" 
                                            control={
                                                <Radio 
                                                    required 
                                                    icon={
                                                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                                                            <FemaleIcon sx={{ color: '#9CA3AF' }} />
                                                        </div>
                                                    }
                                                    checkedIcon={
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg border-2 border-white/20">
                                                            <FemaleIcon sx={{ color: 'white' }} />
                                                        </div>
                                                    }
                                                    sx={{
                                                        padding: 0,
                                                        '&.Mui-checked': {
                                                            color: 'transparent',
                                                        },
                                                    }}
                                                />
                                            } 
                                            label={
                                                <span className="text-gray-700 font-medium ml-2">Female</span>
                                            } 
                                        />
                                    </RadioGroup>
                                </div>

                                {/* Password Fields - Enhanced */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <TextField
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={password}
                                            onChange={handleDataChange}
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

                                    <div className="relative group">
                                        <TextField
                                            fullWidth
                                            id="confirm-password"
                                            label="Confirm Password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="cpassword"
                                            value={cpassword}
                                            onChange={handleDataChange}
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
                                                        onClick={handleClickShowConfirmPassword}
                                                        edge="end"
                                                        size="small"
                                                        sx={{ color: 'gray' }}
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
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
                                </div>

                                {/* Avatar Upload - Enhanced */}
                                <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-6 border-2 border-gray-100">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">Profile Picture</label>
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <div className="relative group">
                                            <Avatar
                                                alt="Avatar Preview"
                                                src={avatarPreview}
                                                sx={{ 
                                                    width: 100, 
                                                    height: 100,
                                                    border: '3px solid #8B5CF6',
                                                    boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)'
                                                }}
                                                className="transition-all duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                                        </div>
                                        <label className="flex-1 cursor-pointer group">
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={handleDataChange}
                                                className="hidden"
                                            />
                                            <div className="flex items-center justify-center gap-3 bg-white border-2 border-dashed border-purple-300 text-purple-600 py-4 px-6 rounded-xl font-medium hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 group-hover:shadow-lg">
                                                <CameraAltIcon />
                                                <span>Choose Profile Picture</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Terms */}
                                <p className="text-xs text-gray-500 text-center font-light leading-relaxed px-4">
                                    By creating an account, you agree to Aarohama Tresure's{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Terms of Service</a>{' '}
                                    and acknowledge our{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Privacy Policy</a>.
                                </p>

                                {/* Register Button - Matching login page style */}
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
                                            Creating Account...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <PersonIcon sx={{ fontSize: 18 }} className="mr-2" />
                                            Create Luxury Account
                                        </span>
                                    )}
                                </button>

                                {/* Login Link - Enhanced */}
                                <div className="text-center">
                                    <p className="text-gray-600 font-light text-sm mb-2">
                                        Already part of our luxury community?
                                    </p>
                                    <Link 
                                        to="/login" 
                                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-all duration-300 group text-base"
                                    >
                                        Sign in to your account
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Register;