import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    return (
        <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-2xl mx-auto group relative"
        >
            <div className="relative flex items-center">
                {/* Search Input */}
                <input 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                    className="w-full px-5 py-3 pl-12 pr-14 text-gray-900 bg-white border border-gray-300 rounded-xl outline-none transition-all duration-300
                             placeholder-gray-500 text-sm
                             focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100
                             hover:border-gray-400 hover:shadow-md
                             group-hover:border-gray-400 group-hover:shadow-md
                             shadow-sm backdrop-blur-sm bg-white/95" 
                    type="text" 
                    placeholder="Search products, brands..." 
                />
                
                {/* Search Icon */}
                <div className="absolute left-4 flex items-center justify-center">
                    <SearchIcon 
                        className="text-gray-500 transition-colors duration-300 
                                  group-hover:text-gray-700 
                                  group-focus-within:text-blue-500
                                  text-lg" 
                    />
                </div>

                {/* Search Button */}
                <button 
                    type="submit" 
                    className="absolute right-1.5 flex items-center justify-center w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg
                             transition-all duration-300 transform
                             hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30
                             active:scale-95
                             focus:outline-none focus:ring-2 focus:ring-blue-500/30
                             shadow-md shadow-blue-500/20"
                >
                    <SearchIcon className="text-white text-sm" />
                </button>
            </div>

            {/* Micro-interaction indicator */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                          transition-all duration-300 group-focus-within:w-3/4 rounded-full">
            </div>
        </form>
    );
};

export default Searchbar;