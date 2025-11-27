import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import { Link } from 'react-router-dom';

// Import Material-UI icons for consistency
import DiamondIcon from '@mui/icons-material/Diamond';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';
import AccessoryIcon from '@mui/icons-material/CardTravel';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StyleIcon from '@mui/icons-material/Style';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  const quickCategories = [
    {
      name: "New Arrivals",
      icon: <FlashOnIcon sx={{ fontSize: 32, color: 'white' }} />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:shadow-purple-100",
      description: "Latest trends",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      name: "Designer",
      icon: <DiamondIcon sx={{ fontSize: 32, color: 'white' }} />,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      hoverColor: "hover:shadow-amber-100",
      description: "Luxury brands",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500"
    },
    {
      name: "Sale",
      icon: <LocalOfferIcon sx={{ fontSize: 32, color: 'white' }} />,
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50",
      borderColor: "border-red-200",
      hoverColor: "hover:shadow-red-100",
      description: "Exclusive offers",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-500"
    },
    {
      name: "Accessories",
      icon: <AccessoryIcon sx={{ fontSize: 32, color: 'white' }} />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:shadow-blue-100",
      description: "Complete looks",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500"
    }
  ];

  const luxuryFeatures = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 28, color: 'white' }} />,
      title: "Luxury Packaging",
      description: "Each piece arrives in premium, gift-ready packaging with personal touches",
      gradient: "from-gray-900 to-black",
      iconBg: "bg-gradient-to-br from-gray-900 to-black"
    },
    {
      icon: <StyleIcon sx={{ fontSize: 28, color: 'white' }} />,
      title: "Tailoring Services",
      description: "Complimentary alterations for the perfect fit and silhouette",
      gradient: "from-amber-500 to-rose-500",
      iconBg: "bg-gradient-to-br from-amber-500 to-rose-500"
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 28, color: 'white' }} />,
      title: "Style Consultation",
      description: "Personal styling advice from our fashion experts and trend specialists",
      gradient: "from-blue-500 to-cyan-600",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 28, color: 'white' }} />,
      title: "Express Shipping",
      description: "Complimentary express delivery with white-glove service",
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
      icon: <CelebrationIcon sx={{ fontSize: 28, color: 'white' }} />,
      title: "Easy Returns",
      description: "Hassle-free 30-day returns with pickup service",
      gradient: "from-violet-500 to-purple-600",
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-600"
    },
    {
      icon: <StarIcon sx={{ fontSize: 28, color: 'white' }} />,
      title: "VIP Access",
      description: "Early access to collections and exclusive member events",
      gradient: "from-pink-500 to-rose-500",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-500"
    }
  ];

  return (
    <>
      <MetaData title="Aarohama Tresure | Premium Fashion Boutique - Luxury Clothing, Accessories & Style" />
              <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-0 lg:p-0c border-2 border-amber-200 shadow-2xl mt-28 mb-20 ml-10 mr-10">
      <Categories />
      </section>
      <main className="flex flex-col gap-20 lg:gap-24 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-4 pb-20">

        {/* Hero Banner - Enhanced Luxury */}
        <section className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-purple-900 to-black relative border border-purple-200/20">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10"></div>
          <Banner />
        </section>

        {/* Quick Access Categories - Matching Luxury Style */}
        <section className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-blue-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-pink-200/50 shadow-lg">
              <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="mr-2" />
              <span className="text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                Quick Collections
              </span>
              <DiamondIcon sx={{ fontSize: 20, color: '#8B5CF6' }} className="ml-2" />
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              Discover luxury pieces meticulously selected for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {quickCategories.map((category, index) => (
              <Link 
                key={index}
                to={`/products?category=${category.name}`}
                className="group block"
              >
                <div className={`
                  ${category.bgGradient} 
                  rounded-2xl p-8 
                  border-2 ${category.borderColor}
                  shadow-xl hover:shadow-2xl 
                  transition-all duration-500 
                  transform hover:-translate-y-2
                  relative overflow-hidden
                  ${category.hoverColor}
                  h-full
                  backdrop-blur-sm
                `}>
                  {/* Animated Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03]">
                    <div className={`w-full h-full bg-gradient-to-br ${category.gradient} rounded-full animate-pulse`}></div>
                  </div>
                  
                  {/* 3D Icon Container */}
                  <div className={`
                    w-20 h-20 rounded-2xl 
                    ${category.iconBg}
                    flex items-center justify-center 
                    shadow-2xl mb-6
                    group-hover:scale-110 
                    group-hover:rotate-3
                    transition-all duration-500
                    relative z-10
                    border-2 border-white/40
                    mx-auto
                    transform-gpu
                  `}>
                    <div className="text-white filter drop-shadow-lg">
                      {category.icon}
                    </div>
                    {/* 3D Shadow Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300 relative z-10 text-center">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-base mb-6 relative z-10 text-center leading-relaxed font-light">
                    {category.description}
                  </p>

                  {/* Luxury CTA Button */}
                  <div className="flex items-center justify-center relative z-10">
                    <div className="flex items-center text-gray-700 font-semibold text-sm group-hover:text-gray-900 transition-colors duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 group-hover:border-gray-300">
                      <span>Explore</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 rounded-2xl`}></div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${category.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* New Arrivals - Luxury Focus */}
        <section className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 lg:p-12 border-2 border-purple-100 shadow-2xl overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  New <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Arrivals</span>
                </h2>
                <p className="text-gray-500 font-light text-lg">Fresh from the runway to your wardrobe</p>
              </div>
              <Link 
                to="/products"
                className="group inline-flex items-center bg-white px-6 py-4 rounded-xl border-2 border-purple-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 font-semibold text-gray-700 hover:text-purple-600 backdrop-blur-sm"
              >
                Explore Collection
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <DealSlider title={""} />
          </div>
        </section>

        {/* Featured Designer Collection */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 lg:p-16 border-2 border-amber-200 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-rose-200/20"></div>
          <div className="absolute top-6 right-6 w-24 h-24 bg-amber-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-6 left-6 w-32 h-32 bg-rose-200/30 rounded-full blur-xl"></div>
          
          <div className="relative text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-amber-200/50 shadow-lg">
              <DiamondIcon sx={{ fontSize: 20, color: '#F59E0B' }} className="mr-2" />
              <span className="text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                Exclusive Collection
              </span>
              <DiamondIcon sx={{ fontSize: 20, color: '#EA580C' }} className="ml-2" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Designer <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Edition</span>
            </h2>
            <p className="text-gray-600 text-lg lg:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              Exclusive pieces from world-renowned fashion houses and emerging designers
            </p>
          </div>
          {!loading && <ProductSlider title={""} tagline={""} />}
        </section>

        {/* Luxury Features Grid */}
        <section className="relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50/80 via-cyan-50/80 to-emerald-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-blue-200/50 shadow-lg">
              <DiamondIcon sx={{ fontSize: 20, color: '#06B6D4' }} className="mr-2" />
              <span className="text-transparent bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                Premium Experience
              </span>
              <DiamondIcon sx={{ fontSize: 20, color: '#10B981' }} className="ml-2" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              The <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Aarohama Tresure</span> Difference
            </h2>
            <p className="text-gray-600 text-lg lg:text-xl font-light max-w-2xl mx-auto">
              Beyond shopping - a complete luxury fashion journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {luxuryFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.03]">
                  <div className={`w-full h-full bg-gradient-to-br ${feature.gradient} rounded-full animate-pulse`}></div>
                </div>
                
                {/* 3D Icon Container */}
                <div className={`
                  w-16 h-16 rounded-2xl 
                  ${feature.iconBg}
                  flex items-center justify-center 
                  shadow-2xl mb-6
                  group-hover:scale-110 
                  group-hover:rotate-3
                  transition-all duration-500
                  relative z-10
                  border-2 border-white/40
                  transform-gpu
                `}>
                  <div className="text-white filter drop-shadow-lg">
                    {feature.icon}
                  </div>
                  {/* 3D Shadow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-gray-800 transition-colors relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 rounded-2xl`}></div>
                
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Edit */}
        <section className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 lg:p-12 border-2 border-blue-100 shadow-2xl overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl mb-4 border border-blue-200/50">
                  <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-bold text-sm tracking-wide">SPRING SUMMER '24</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Seasonal <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Collection</span>
                </h2>
                <p className="text-gray-500 font-light text-lg">Light, airy pieces for the warmer days ahead</p>
              </div>
              <Link 
                to="/products?season=spring-summer"
                className="group inline-flex items-center bg-white px-6 py-4 rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 font-semibold text-gray-700 hover:text-blue-600 backdrop-blur-sm"
              >
                Shop Season
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <DealSlider title={""} />
          </div>
        </section>

        {/* Best Sellers - Updated to match Newsletter background */}
        {!loading && (
          <section className="relative bg-gradient-to-r from-amber-50 via-white to-rose-50 rounded-3xl p-8 lg:p-16 text-center border-2 border-amber-100 shadow-2xl overflow-hidden">
            {/* Background Elements matching Newsletter */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-rose-200/40 rounded-full blur-2xl"></div>
            
            <div className="relative max-w-6xl mx-auto">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-50/80 to-rose-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-amber-200/50 shadow-lg">
                <TrendingUpIcon sx={{ fontSize: 20, color: '#F59E0B' }} className="mr-2" />
                <span className="text-transparent bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                  Community Favorites
                </span>
                <StarIcon sx={{ fontSize: 20, color: '#F43F5E' }} className="ml-2" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Best <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Sellers</span>
              </h2>
              <p className="text-gray-600 font-light text-lg lg:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                The pieces our discerning community loves and recommends
              </p>
              <ProductSlider title={""} tagline={""} />
            </div>
          </section>
        )}

        {/* Newsletter - Luxury Signup */}
        <section className="relative bg-gradient-to-r from-amber-50 via-white to-rose-50 rounded-3xl p-8 lg:p-16 text-center border-2 border-amber-100 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-rose-200/40 rounded-full blur-2xl"></div>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-50/80 to-rose-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-amber-200/50 shadow-lg">
              <DiamondIcon sx={{ fontSize: 20, color: '#F59E0B' }} className="mr-2" />
              <span className="text-transparent bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                Exclusive Access
              </span>
              <DiamondIcon sx={{ fontSize: 20, color: '#F43F5E' }} className="ml-2" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Join the <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Aarohama Tresure</span> Community
            </h2>
            <p className="text-gray-600 font-light text-lg lg:text-xl mb-8 leading-relaxed">
              Be the first to access new collections, exclusive events, private sales, and personalized style insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white font-light shadow-sm backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-amber-600 to-rose-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-amber-500/20">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-6 font-light">
              By subscribing, you agree to our Privacy Policy and consent to receive luxury fashion updates
            </p>
          </div>
        </section>

      </main>

      {/* Floating Action Buttons - Enhanced */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20 backdrop-blur-sm">
          <span className="text-xl">💬</span>
        </button>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-gradient-to-r from-gray-900 to-black rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20 backdrop-blur-sm"
        >
          <span className="text-xl">↑</span>
        </button>
      </div>
    </>
  );
};

export default Home;