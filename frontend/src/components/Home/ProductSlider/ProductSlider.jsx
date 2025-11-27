import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import Product from './Product';

const ProductSlider = ({ title, tagline }) => {

    const { loading, products } = useSelector((state) => state.products);

    return (
        <section className=" w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-4 justify-between items-center">
                <div className="title flex flex-col gap-0.5">
                    <h1 className="text-xl font-medium">{title}</h1>
                    <p className="text-sm text-gray-400">{tagline}</p>
                </div>
 <Link 
                to="/products"
                className="group inline-flex items-center bg-white px-6 py-4 rounded-xl border-2 border-purple-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 font-semibold text-gray-700 hover:text-purple-600 backdrop-blur-sm"
              >
                Explore Collection
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>            </div>
            <hr />
            {loading ? null :
                <Slider {...settings} className="flex items-center justify-between p-1">
                    {products && getRandomProducts(products, 12).map((product) => (
                        <Product {...product} key={product._id} />
                    ))}
                </Slider>
            }

        </section>
    );
};

export default ProductSlider;
