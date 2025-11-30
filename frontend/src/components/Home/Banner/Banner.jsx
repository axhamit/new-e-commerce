import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DiamondIcon from '@mui/icons-material/Diamond';
import gadgetSale from '../../../assets/images/Banners/gadget-sale.jpg';
import kitchenSale from '../../../assets/images/Banners/kitchen-sale.jpg';
import poco from '../../../assets/images/Banners/poco-m4-pro.webp';
import realme from '../../../assets/images/Banners/realme-9-pro.webp';
import fashionSale from '../../../assets/images/Banners/fashionsale.jpg';
import oppo from '../../../assets/images/Banners/oppo-reno7.webp';

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={`${className} custom-prev-arrow`} onClick={onClick}>
      <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-110 shadow-2xl">
        <ArrowBackIosIcon sx={{ fontSize: 18 }} />
      </div>
    </div>
  )
}

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={`${className} custom-next-arrow`} onClick={onClick}>
      <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-110 shadow-2xl">
        <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
      </div>
    </div>
  )
}

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    fade: true,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  const banners = [
    {
      image: fashionSale,
      title: "Spring Collection 2024",
      subtitle: "Discover the latest luxury fashion trends",
      cta: "Shop Now"
    },
    {
      image: gadgetSale,
      title: "Premium Accessories",
      subtitle: "Elevate your style with exclusive pieces",
      cta: "Explore"
    },
    {
      image: kitchenSale,
      title: "Luxury Lifestyle",
      subtitle: "Curated collections for the modern connoisseur",
      cta: "Discover"
    },
    {
      image: poco,
      title: "Designer Edition",
      subtitle: "Exclusive pieces from world-renowned designers",
      cta: "View Collection"
    },
    {
      image: realme,
      title: "New Arrivals",
      subtitle: "Fresh from the runway to your wardrobe",
      cta: "Shop New"
    },
    {
      image: oppo,
      title: "Limited Edition",
      subtitle: "Rare finds for the discerning collector",
      cta: "Get Yours"
    }
  ];

  return (
    <>
      <section className="relative h-64 sm:h-96 lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 z-10"></div>
        
        {/* Luxury Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl z-0"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl z-0"></div>
        
        <Slider {...settings}>
          {banners.map((banner, i) => (
            <div key={i} className="relative h-64 sm:h-96 lg:h-[500px] w-full">
              <img 
                draggable="false" 
                className="h-64 sm:h-96 lg:h-[500px] w-full object-cover"
                src={banner.image} 
                alt={banner.title}
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="max-w-2xl">
                    {/* Luxury Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-2xl mb-6 border border-white/20 shadow-lg">
                      <DiamondIcon sx={{ fontSize: 16, color: 'white' }} className="mr-2" />
                      <span className="text-white font-semibold text-xs tracking-widest uppercase">
                        Premium Collection
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                      {banner.title}
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-light mb-8 max-w-md leading-relaxed">
                      {banner.subtitle}
                    </p>
                    
                    {/* CTA Button */}
                    <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 backdrop-blur-sm overflow-hidden relative">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="flex items-center">
                        {banner.cta}
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
      </section>

      <style jsx>{`
        .custom-prev-arrow {
          left: 20px !important;
          z-index: 30 !important;
        }
        
        .custom-next-arrow {
          right: 20px !important;
          z-index: 30 !important;
        }
        
        /* Custom Dots Styling */
        :global(.slick-dots) {
          bottom: 30px !important;
          z-index: 30 !important;
        }
        
        :global(.slick-dots li button:before) {
          color: white !important;
          opacity: 0.5 !important;
          font-size: 10px !important;
        }
        
        :global(.slick-dots li.slick-active button:before) {
          opacity: 1 !important;
          color: #EC4899 !important;
        }
        
        /* Slide Animation Enhancement */
        :global(.slick-slide) {
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `}</style>
    </>
  );
};

export default Banner;