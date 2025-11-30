import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Avatar, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';

// Import Material-UI icons for consistency
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DiamondIcon from '@mui/icons-material/Diamond';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const updateProfileHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("avatar", avatar);

        dispatch(updateProfile(formData));
    }

    const handleUpdateDataChange = (e) => {
        const reader = new FileReader();
        setAvatar("");
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Update Profile | Aarohama Tresure" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mt-20">

                {/* Luxury Header Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-blue-50/80 backdrop-blur-xl rounded-2xl mb-4 border border-purple-200/50 shadow-lg">
                        <PersonIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                        <span className="text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                            Profile Management
                        </span>
                        <EditIcon sx={{ fontSize: 20, color: '#EC4899' }} className="ml-2" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Update <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Profile</span>
                    </h1>
                    <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
                        Refine your personal details to enhance your luxury shopping experience
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
                                Personalize Your <span className="text-purple-300">Luxury</span> Journey
                            </h2>
                            
                            <p className="text-purple-100/80 text-lg mb-8 font-light leading-relaxed">
                                Update your profile to receive personalized style recommendations, exclusive offers, and VIP treatment tailored just for you.
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <PersonIcon sx={{ fontSize: 20, color: 'white' }} />
                                    </div>
                                    <span className="text-purple-100 font-medium">Personalized styling</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <EditIcon sx={{ fontSize: 20, color: 'white' }} />
                                    </div>
                                    <span className="text-purple-100 font-medium">Tailored recommendations</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <DiamondIcon sx={{ fontSize: 20, color: 'white' }} />
                                    </div>
                                    <span className="text-purple-100 font-medium">VIP access & events</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:w-3/5 p-8 sm:p-12">
                        <div className="max-w-md mx-auto">
                            {/* Form Header */}
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl border-2 border-white/40 relative">
                                    <PersonIcon sx={{ fontSize: 32, color: 'white' }} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Your Profile Details
                                </h3>
                                <p className="text-gray-600 font-light">
                                    Keep your information current for the best experience
                                </p>
                            </div>

                            {/* Profile Form */}
                            <form onSubmit={updateProfileHandler} encType="multipart/form-data" className="space-y-6">
                                <div className="space-y-4">
                                    {/* Name Field */}
                                    <div className="group">
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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

                                    {/* Email Field */}
                                    <div className="group">
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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

                                    {/* Gender Selection */}
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                            <PersonIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="mr-2" />
                                            Your Gender
                                        </h4>
                                        <RadioGroup
                                            row
                                            aria-labelledby="gender-radio-buttons-group"
                                            name="gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="justify-center sm:justify-start gap-6"
                                        >
                                            <FormControlLabel 
                                                value="male" 
                                                control={
                                                    <Radio 
                                                        required 
                                                        icon={<MaleIcon />}
                                                        checkedIcon={<MaleIcon sx={{ color: '#8B5CF6' }} />}
                                                        sx={{
                                                            color: '#D1D5DB',
                                                            '&.Mui-checked': {
                                                                color: '#8B5CF6',
                                                            },
                                                        }}
                                                    />
                                                } 
                                                label={
                                                    <span className="flex items-center text-gray-700">
                                                        <MaleIcon sx={{ fontSize: 18, marginRight: 1 }} />
                                                        Male
                                                    </span>
                                                } 
                                            />
                                            <FormControlLabel 
                                                value="female" 
                                                control={
                                                    <Radio 
                                                        required 
                                                        icon={<FemaleIcon />}
                                                        checkedIcon={<FemaleIcon sx={{ color: '#EC4899' }} />}
                                                        sx={{
                                                            color: '#D1D5DB',
                                                            '&.Mui-checked': {
                                                                color: '#EC4899',
                                                            },
                                                        }}
                                                    />
                                                } 
                                                label={
                                                    <span className="flex items-center text-gray-700">
                                                        <FemaleIcon sx={{ fontSize: 18, marginRight: 1 }} />
                                                        Female
                                                    </span>
                                                } 
                                            />
                                        </RadioGroup>
                                    </div>

                                    {/* Avatar Upload */}
                                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                            <CameraAltIcon sx={{ fontSize: 20, color: '#06B6D4' }} className="mr-2" />
                                            Profile Picture
                                        </h4>
                                        <div className="flex flex-col sm:flex-row items-center gap-6">
                                            <Avatar
                                                alt="Avatar Preview"
                                                src={avatarPreview}
                                                sx={{ 
                                                    width: 80, 
                                                    height: 80,
                                                    border: '3px solid white',
                                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                                                }}
                                                className="transition-all duration-300 hover:scale-105"
                                            />
                                            <label className="flex-1 cursor-pointer">
                                                <input
                                                    type="file"
                                                    name="avatar"
                                                    accept="image/*"
                                                    onChange={handleUpdateDataChange}
                                                    className="hidden"
                                                />
                                                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-blue-500/20 flex items-center justify-center group">
                                                    <CameraAltIcon sx={{ fontSize: 20 }} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                                                    Choose New Photo
                                                </div>
                                            </label>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-3 text-center sm:text-left">
                                            Recommended: Square image, at least 400x400 pixels
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-4 pt-4">
                                    <button 
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-purple-500/20 flex items-center justify-center group"
                                    >
                                        <EditIcon sx={{ fontSize: 20 }} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                                        Update Profile
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

export default UpdateProfile;