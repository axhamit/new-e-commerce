import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import states from '../../utils/states';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import PinDropIcon from '@mui/icons-material/PinDrop';

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [country, setCountry] = useState('IN');
    const [state, setState] = useState(shippingInfo.state);
    const [pincode, setPincode] = useState(shippingInfo.pincode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            enqueueSnackbar("Invalid Phone Number", { variant: "error" });
            return;
        }
        dispatch(saveShippingInfo({ address, city, country, state, pincode, phoneNo }));
        navigate("/order/confirm");
    }

    return (
        <>
            <MetaData title="ELARA: Shipping Details" />
            <main className="w-full mt-16 bg-gray-50 min-h-screen">

                {/* Header Section */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center gap-3 mb-2">
                            <LocalShippingIcon sx={{ fontSize: 32, color: '#f59e0b' }} />
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Shipping Details</h1>
                        </div>
                        <p className="text-gray-600">Enter your delivery information to proceed with your order</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Main Content Grid */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Shipping Form Column */}
                        <div className="flex-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                
                                {/* Stepper Header */}
                                <div className="border-b border-gray-200">
                                    <Stepper activeStep={1} />
                                </div>

                                {/* Form Section */}
                                <div className="p-6 lg:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                            <LocationOnIcon sx={{ fontSize: 24, color: 'white' }} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                                            <p className="text-gray-600 text-sm">Where should we deliver your order?</p>
                                        </div>
                                    </div>

                                    <form onSubmit={shippingSubmit} autoComplete="off" className="space-y-6">
                                        
                                        {/* Address Field */}
                                        <div className="relative">
                                            <TextField
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                fullWidth
                                                label="Complete Address"
                                                variant="outlined"
                                                required
                                                placeholder="Enter your complete address with house number, street, etc."
                                                InputProps={{
                                                    startAdornment: (
                                                        <HomeIcon className="text-gray-400 mr-3" sx={{ fontSize: 20 }} />
                                                    ),
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        '&:hover fieldset': {
                                                            borderColor: '#3b82f6',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#3b82f6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: '#3b82f6',
                                                    },
                                                }}
                                            />
                                        </div>

                                        {/* Pincode & Phone Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <TextField
                                                    value={pincode}
                                                    onChange={(e) => setPincode(e.target.value)}
                                                    type="number"
                                                    label="Pincode"
                                                    fullWidth
                                                    variant="outlined"
                                                    required
                                                    InputProps={{
                                                        startAdornment: (
                                                            <PinDropIcon className="text-gray-400 mr-3" sx={{ fontSize: 20 }} />
                                                        ),
                                                    }}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '12px',
                                                            '&:hover fieldset': {
                                                                borderColor: '#3b82f6',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#3b82f6',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: '#3b82f6',
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <div className="relative">
                                                <TextField
                                                    value={phoneNo}
                                                    onChange={(e) => setPhoneNo(e.target.value)}
                                                    type="number"
                                                    label="Phone Number"
                                                    fullWidth
                                                    variant="outlined"
                                                    required
                                                    InputProps={{
                                                        startAdornment: (
                                                            <PhoneIcon className="text-gray-400 mr-3" sx={{ fontSize: 20 }} />
                                                        ),
                                                    }}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '12px',
                                                            '&:hover fieldset': {
                                                                borderColor: '#3b82f6',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#3b82f6',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': {
                                                            color: '#3b82f6',
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* City & Landmark Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <TextField
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                label="City"
                                                fullWidth
                                                variant="outlined"
                                                required
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        '&:hover fieldset': {
                                                            borderColor: '#3b82f6',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#3b82f6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: '#3b82f6',
                                                    },
                                                }}
                                            />
                                            <TextField
                                                label="Landmark (Optional)"
                                                fullWidth
                                                variant="outlined"
                                                placeholder="Nearby landmark for easy delivery"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        '&:hover fieldset': {
                                                            borderColor: '#3b82f6',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#3b82f6',
                                                            borderWidth: '2px',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: '#3b82f6',
                                                    },
                                                }}
                                            />
                                        </div>

                                        {/* Country & State Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormControl fullWidth>
                                                <InputLabel id="country-select" sx={{
                                                    '&.Mui-focused': {
                                                        color: '#3b82f6',
                                                    },
                                                }}>Country</InputLabel>
                                                <Select
                                                    labelId="country-select"
                                                    id="country-select"
                                                    defaultValue={country}
                                                    disabled
                                                    label="Country"
                                                    sx={{
                                                        borderRadius: '12px',
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#d1d5db',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3b82f6',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3b82f6',
                                                            borderWidth: '2px',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value={'IN'}>India</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <FormControl fullWidth disabled={country ? false : true}>
                                                <InputLabel id="state-select" sx={{
                                                    '&.Mui-focused': {
                                                        color: '#3b82f6',
                                                    },
                                                }}>State</InputLabel>
                                                <Select
                                                    labelId="state-select"
                                                    id="state-select"
                                                    value={state}
                                                    label="State"
                                                    onChange={(e) => setState(e.target.value)}
                                                    required
                                                    sx={{
                                                        borderRadius: '12px',
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#d1d5db',
                                                        },
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3b82f6',
                                                        },
                                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#3b82f6',
                                                            borderWidth: '2px',
                                                        },
                                                    }}
                                                >
                                                    {states.map((item) => (
                                                        <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <button 
                                                type="submit" 
                                                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                                            >
                                                <LocalShippingIcon sx={{ fontSize: 24 }} />
                                                Save & Continue to Delivery
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => navigate(-1)}
                                                className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300"
                                            >
                                                Back to Cart
                                            </button>
                                        </div>
                                    </form>

                                    {/* Security Note */}
                                    <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                                                <span className="text-white text-sm">✓</span>
                                            </div>
                                            <div>
                                                <p className="text-blue-800 font-medium text-sm">Your information is secure</p>
                                                <p className="text-blue-600 text-xs mt-1">We use encryption to protect your personal details and ensure safe delivery.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Sidebar */}
                        <div className="lg:w-96">
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Shipping;