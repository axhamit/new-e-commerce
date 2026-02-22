import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { createProduct, clearErrors } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import { getAllCategories } from '../../actions/categoryAction';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { CircularProgress } from '@mui/material';

const NewProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newProduct);
    const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

    const [highlights, setHighlights] = useState([]);
    const [highlightInput, setHighlightInput] = useState("");
    const [specs, setSpecs] = useState([]);
    const [specsInput, setSpecsInput] = useState({
        title: "",
        description: ""
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [mainCategory, setMainCategory] = useState(""); // Main category like "Fashion"
    const [category, setCategory] = useState(""); // Final category like "Men" or "Women"
    const [subcategory, setSubcategory] = useState(""); // Item like "Suits" or "Sarees"
    const [stock, setStock] = useState(0);
    const [warranty, setWarranty] = useState(0);
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [logo, setLogo] = useState("");
    const [logoPreview, setLogoPreview] = useState("");

    // Log categories for debugging
    useEffect(() => {
        console.log("Current categories state:", categories);
        console.log("Categories loading:", categoriesLoading);
    }, [categories, categoriesLoading]);

    const handleSpecsChange = (e) => {
        setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
    }

    const addSpecs = () => {
        if (!specsInput.title.trim() || !specsInput.description.trim()) return;
        setSpecs([...specs, specsInput]);
        setSpecsInput({ title: "", description: "" });
    }

    const addHighlight = () => {
        if (!highlightInput.trim()) return;
        setHighlights([...highlights, highlightInput]);
        setHighlightInput("");
    }

    const deleteHighlight = (index) => {
        setHighlights(highlights.filter((h, i) => i !== index))
    }

    const deleteSpec = (index) => {
        setSpecs(specs.filter((s, i) => i !== index))
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setLogoPreview(reader.result);
                    setLogo(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldImages) => [...oldImages, reader.result]);
                    setImages((oldImages) => [...oldImages, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        });
    }

    const newProductSubmitHandler = (e) => {
        e.preventDefault();

        // required field checks
        if (highlights.length <= 0) {
            enqueueSnackbar("Add Highlights", { variant: "warning" });
            return;
        }
        if (!logo) {
            enqueueSnackbar("Add Brand Logo", { variant: "warning" });
            return;
        }
        if (specs.length <= 1) {
            enqueueSnackbar("Add Minimum 2 Specifications", { variant: "warning" });
            return;
        }
        if (images.length <= 0) {
            enqueueSnackbar("Add Product Images", { variant: "warning" });
            return;
        }
        if (!mainCategory) {
            enqueueSnackbar("Select Main Category", { variant: "warning" });
            return;
        }

        const formData = new FormData();

        formData.set("name", name);
        formData.set("description", description);
        formData.set("price", price);
        formData.set("cuttedPrice", cuttedPrice);
        // Category should be the subcategory name (Men or Women), not main category (Fashion)
        formData.set("category", category || mainCategory);
        if (subcategory) {
            formData.set("subcategory", subcategory);
        }
        formData.set("stock", stock);
        formData.set("warranty", warranty);
        formData.set("brandname", brand);
        formData.set("logo", logo);

        images.forEach((image) => {
            formData.append("images", image);
        });

        highlights.forEach((h) => {
            formData.append("highlights", h);
        });

        specs.forEach((s) => {
            formData.append("specifications", JSON.stringify(s));
        });

        dispatch(createProduct(formData));
    }

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Product Created", { variant: "success" });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate("/admin/products");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    // Get selected main category object (e.g., "Fashion")
    const selectedMainCategory = categories?.find(cat => cat.name === mainCategory);
    const availableSubcategories = selectedMainCategory?.subcategories || [];
    
    // Get selected subcategory object to show items (e.g., "Women")
    const selectedSubcategory = availableSubcategories.find(sub => sub.name === category);
    const availableItems = selectedSubcategory?.items || [];
    
    // Handle main category change
    const handleMainCategoryChange = (mainCatName) => {
        setMainCategory(mainCatName);
        setCategory("");
        setSubcategory("");
    };
    
    // Handle subcategory selection (e.g., "Men" or "Women")
    const handleSubcategoryChange = (subcategoryName) => {
        setCategory(subcategoryName);
        setSubcategory(""); // Reset subcategory item when subcategory changes
    };

    return (
        <>
            <MetaData title="Admin: New Product | Aarohama" />

            {loading && <BackdropLoader />}
            
            {/* Show loading state for categories */}
            {categoriesLoading && (
                <div className="flex justify-center items-center p-4">
                    <CircularProgress size={24} className="mr-2" />
                    <span>Loading categories...</span>
                </div>
            )}

            <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">

                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        required
                        variant="outlined"
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-between gap-2">
                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-1/2"
                        />
                        <TextField
                            label="Cutted Price"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={cuttedPrice}
                            onChange={(e) => setCuttedPrice(e.target.value)}
                            className="w-1/2"
                        />
                    </div>
                    
                    {/* Main Category Dropdown */}
                    <TextField
                        label="Main Category"
                        select
                        fullWidth
                        variant="outlined"
                        size="small"
                        required
                        value={mainCategory}
                        onChange={(e) => handleMainCategoryChange(e.target.value)}
                        disabled={categoriesLoading}
                        helperText={categories?.length === 0 ? "No categories available" : ""}
                    >
                        {categories && categories.length > 0 ? (
                            categories.map((cat) => (
                                <MenuItem value={cat.name} key={cat._id}>
                                    {cat.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled value="">
                                {categoriesLoading ? "Loading..." : "No categories found"}
                            </MenuItem>
                        )}
                    </TextField>

                    {/* Subcategory Dropdown */}
                    {selectedMainCategory && availableSubcategories.length > 0 && (
                        <TextField
                            label="Subcategory"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={category}
                            onChange={(e) => handleSubcategoryChange(e.target.value)}
                        >
                            {availableSubcategories.map((subcat) => (
                                <MenuItem value={subcat.name} key={subcat.name}>
                                    {subcat.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}

                    {/* Subcategory Item Dropdown */}
                    {selectedSubcategory && availableItems.length > 0 && (
                        <TextField
                            label="Subcategory Item"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {availableItems.map((item, idx) => (
                                <MenuItem value={item} key={`${item}-${idx}`}>
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}

                    <div className="flex justify-between gap-2">
                        <TextField
                            label="Stock"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-1/2"
                        />
                        <TextField
                            label="Warranty"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                inputProps: {
                                    min: 0
                                }
                            }}
                            required
                            value={warranty}
                            onChange={(e) => setWarranty(e.target.value)}
                            className="w-1/2"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border rounded">
                            <input 
                                value={highlightInput} 
                                onChange={(e) => setHighlightInput(e.target.value)} 
                                type="text" 
                                placeholder="Highlight" 
                                className="px-2 flex-1 outline-none border-none py-2" 
                            />
                            <span 
                                onClick={() => addHighlight()} 
                                className="py-2 px-6 bg-blue-600 text-white rounded-r hover:shadow-lg cursor-pointer"
                            >
                                Add
                            </span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                                    <p className="text-green-800 text-sm font-medium">{h}</p>
                                    <span onClick={() => deleteHighlight(i)} className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer">
                                        <DeleteIcon fontSize="small" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className="font-medium">Brand Details</h2>
                    <div className="flex justify-between gap-4 items-start">
                        <TextField
                            label="Brand"
                            type="text"
                            variant="outlined"
                            size="small"
                            required
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="flex-1"
                        />
                        <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                            {!logoPreview ? 
                                <ImageIcon color="action" /> :
                                <img draggable="false" src={logoPreview} alt="Brand Logo" className="w-full h-full object-contain" />
                            }
                        </div>
                        <label className="rounded bg-gray-500 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                            <input
                                type="file"
                                name="logo"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="hidden"
                            />
                            Choose Logo
                        </label>
                    </div>

                </div>

                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                    <h2 className="font-medium">Specifications</h2>

                    <div className="flex gap-2 items-center">
                        <TextField 
                            value={specsInput.title} 
                            onChange={handleSpecsChange} 
                            name="title" 
                            label="Name" 
                            placeholder="Model No" 
                            variant="outlined" 
                            size="small" 
                            className="flex-1"
                        />
                        <TextField 
                            value={specsInput.description} 
                            onChange={handleSpecsChange} 
                            name="description" 
                            label="Description" 
                            placeholder="WJDK42DF5" 
                            variant="outlined" 
                            size="small" 
                            className="flex-1"
                        />
                        <span 
                            onClick={() => addSpecs()} 
                            className="py-2 px-6 bg-blue-600 text-white rounded hover:shadow-lg cursor-pointer whitespace-nowrap"
                        >
                            Add
                        </span>
                    </div>

                    <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto">
                        {specs.map((spec, i) => (
                            <div key={i} className="flex justify-between items-center text-sm rounded bg-blue-50 py-2 px-3">
                                <p className="text-gray-700 font-medium">{spec.title}</p>
                                <p className="text-gray-600">{spec.description}</p>
                                <span onClick={() => deleteSpec(i)} className="text-red-600 hover:bg-red-200 p-1 rounded-full cursor-pointer">
                                    <DeleteIcon fontSize="small" />
                                </span>
                            </div>
                        ))}
                    </div>

                    <h2 className="font-medium">Product Images</h2>
                    <div className="flex gap-2 overflow-x-auto h-32 border rounded p-2">
                        {imagesPreview.length > 0 ? (
                            imagesPreview.map((image, i) => (
                                <img draggable="false" src={image} alt="Product" key={i} className="h-full w-auto object-contain" />
                            ))
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-400">
                                No images selected
                            </div>
                        )}
                    </div>
                    
                    <label className="rounded font-medium bg-gray-500 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleProductImageChange}
                            className="hidden"
                        />
                        Choose Product Images
                    </label>

                    <div className="flex justify-end mt-4">
                        <button 
                            type="submit" 
                            className="bg-orange-500 uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer hover:bg-orange-600 transition-colors"
                        >
                            Submit
                        </button>
                    </div>

                </div>

            </form>
        </>
    );
};

export default NewProduct;