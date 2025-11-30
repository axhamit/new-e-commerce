import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';

const Stepper = ({ activeStep, children }) => {
    const { user } = useSelector((state) => state.user);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const address = `${shippingInfo?.address || ''}, ${shippingInfo?.city || ''}, ${shippingInfo?.state || ''} - ${shippingInfo?.pincode || ''}`;

    const steps = [
        {
            label: "Login",
            desc: (
                <div className="text-sm">
                    <span className="block text-gray-900 font-medium">{user?.name}</span>
                    <span className="text-gray-600">{user?.email}</span>
                </div>
            )
        },
        {
            label: "Delivery Address",
            desc: (
                <div className="text-sm">
                    <span className="block text-gray-900 font-medium">{user?.name}</span>
                    <span className="text-gray-600">{address}</span>
                </div>
            )
        },
        {
            label: "Order Summary",
            desc: (
                <p className="text-gray-900 font-medium text-sm">
                    {cartItems?.length || 0} Item{cartItems?.length !== 1 ? 's' : ''}
                </p>
            )
        },
        {
            label: "Payment",
            desc: (
                <p className="text-gray-900 font-medium text-sm">
                    Paytm & Other Methods
                </p>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
            {steps.map((step, index) => (
                <div key={index} className="relative">
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                        <div 
                            className={`absolute left-6 top-12 w-0.5 h-8 -translate-y-1/2 z-0 ${
                                activeStep > index 
                                    ? 'bg-gradient-to-b from-purple-500 to-pink-500' 
                                    : 'bg-gray-200'
                            }`}
                        />
                    )}
                    
                    {activeStep === index ? (
                        <div className="flex flex-col rounded-2xl border-2 border-purple-200 bg-white shadow-xl overflow-hidden relative z-10 transform transition-all duration-300">
                            <div className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 gap-4">
                                <div className="h-8 w-8 flex items-center justify-center text-sm font-bold bg-white rounded-full text-purple-600 shadow-lg">
                                    {index + 1}
                                </div>
                                <h2 className="font-semibold text-white text-lg">
                                    {step.label}
                                </h2>
                            </div>
                            <div className="p-6">
                                {children}
                            </div>
                        </div>
                    ) : (
                        <Step 
                            isCompleted={activeStep > index}
                            label={step.label} 
                            desc={step.desc} 
                            index={index}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

const Step = ({ isCompleted, label, desc, index }) => {
    return (
        <div className={`
            flex items-start gap-4 bg-white rounded-2xl p-5 border-2 transition-all duration-300
            ${isCompleted 
                ? 'border-green-200 bg-green-50/50 shadow-lg' 
                : 'border-gray-100 shadow-md hover:shadow-lg hover:border-purple-100'
            }
        `}>
            {/* Step Indicator */}
            <div className={`
                flex-shrink-0 h-10 w-10 flex items-center justify-center text-sm font-semibold rounded-2xl
                transition-all duration-300 border-2
                ${isCompleted 
                    ? 'bg-green-500 text-white border-green-500 shadow-lg' 
                    : 'bg-white text-gray-600 border-gray-200'
                }
            `}>
                {isCompleted ? (
                    <CheckIcon sx={{ fontSize: "20px" }} />
                ) : (
                    index + 1
                )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className={`
                        font-semibold text-lg
                        ${isCompleted ? 'text-green-700' : 'text-gray-700'}
                    `}>
                        {label}
                    </h3>
                    {isCompleted && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                            Completed
                        </span>
                    )}
                </div>
                
                {isCompleted && desc}
            </div>
        </div>
    );
};

export default Stepper;