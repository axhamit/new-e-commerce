import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { offerProducts } from '../../../utils/constants';
import { getRandomProducts } from '../../../utils/functions';

export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    swipe: true,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const DealSlider = ({ title }) => {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h2>
                    {/* <p className="text-gray-600 text-sm mt-1">Curated selection of premium products</p> */}
                </div>
                {/* <Link 
                    to="/products" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm hover:shadow-md"
                >
                    View All
                </Link> */}
            </div>

            {/* Slider Container */}
            <div className="relative">
                <Slider {...settings} className="px-2">
                    {getRandomProducts(offerProducts, 12).map((item, i) => (
                        <div key={i} className="px-2 py-1">
                            <Product {...item} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default DealSlider;