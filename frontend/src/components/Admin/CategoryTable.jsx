import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteCategory, getAdminCategories } from '../../actions/categoryAction';
import { DELETE_CATEGORY_RESET } from '../../constants/categoryConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const CategoryTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { categories, error, loading } = useSelector((state) => state.categories);
    const { isDeleted, error: deleteError } = useSelector((state) => state.categories);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Category Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_CATEGORY_RESET });
        }
        dispatch(getAdminCategories());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id));
    };

    const columns = [
        {
            field: "id",
            headerName: "Category ID",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        {params.row.icon && (
                            <div className="w-10 h-10 rounded-full">
                                <img 
                                    draggable="false" 
                                    src={params.row.icon} 
                                    alt={params.row.name} 
                                    className="w-full h-full rounded-full object-cover" 
                                />
                            </div>
                        )}
                        {params.row.name}
                    </div>
                );
            },
        },
        {
            field: "hasSubcategories",
            headerName: "Has Subcategories",
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <span className={params.row.hasSubcategories ? "text-green-600 font-medium" : "text-gray-500"}>
                        {params.row.hasSubcategories ? "Yes" : "No"}
                    </span>
                );
            },
        },
        {
            field: "subcategories",
            headerName: "Subcategories",
            minWidth: 200,
            flex: 0.5,
            renderCell: (params) => {
                if (!params.row.subcategories || params.row.subcategories.length === 0) {
                    return <span className="text-gray-400">None</span>;
                }
                return (
                    <div className="text-sm">
                        {params.row.subcategories.map((sub, idx) => (
                            <div key={idx} className="text-gray-600">
                                {sub.name}: {sub.items?.join(", ") || "N/A"}
                            </div>
                        ))}
                    </div>
                );
            },
        },
        {
            field: "isActive",
            headerName: "Status",
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <span className={params.row.isActive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {params.row.isActive ? "Active" : "Inactive"}
                    </span>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions
                        id={params.row.id}
                        name={params.row.name}
                        editRoute={"category"}
                        deleteHandler={deleteCategoryHandler}
                    />
                );
            },
        },
    ];

    const rows = categories.map((category) => ({
        id: category._id,
        name: category.name,
        icon: category.icon?.url || "",
        hasSubcategories: category.hasSubcategories,
        subcategories: category.subcategories || [],
        isActive: category.isActive,
    }));

    return (
        <>
            <MetaData title="Admin Categories" />
            {loading && <BackdropLoader />}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">All Categories</h1>
                <Link
                    to="/admin/new_category"
                    className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    <AddIcon />
                    <span>Add Category</span>
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                    rowsPerPageOptions={[10, 20, 50]}
                />
            </div>
        </>
    );
};

export default CategoryTable;

