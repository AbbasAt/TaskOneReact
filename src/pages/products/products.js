import Table from "../../components/Table";
import Path from "../../components/Path";
import Filters from "../../components/Filters";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { getProducts, getLimitedProducts, getFilteredProducts, getCategoryProducts } from "./services";

export default function Products() {
    const headers = ['Title', 'Description', 'Price', 'Discount Percentage', 'Rating', 'Stock', 'Brand', 'Category'];
    const filters = ['Title', 'Brand', 'Category', 'Tabs'];
    const [limitValue, setLimitValue] = useState(null); //number of entries
    const [data, setData] = useState([]); //All Products
    const [totalData, setTotalData] = useState(null); // Number of all fetched data
    const [page, setPage] = useState(null); // Number of page (pagination)
    const [limitedData, setLimitedData] = useState([]); // data present at each page
    const [paginationTotal, setPaginationTotal] = useState(null); // Total number of pages
    const [searchInput, setSearchInput] = useState(null); // Search text field (search icon)
    const [filter, setFilter] = useState(null); // Filter category (eg: Type)
    const [filterSearch, setFilterSearch] = useState(null); // Filtered input
    const [filteringData, setFilteringData] = useState(false); // Whether i am filtering data or not


    useEffect(() => {
        getAllData();
        setLimitValue(5);
        setPage(1);
    }, [])

    useEffect(() => {
        if (totalData !== null && limitValue !== null) {
            setPaginationTotal(parseInt(totalData / limitValue));
        }
    }, [totalData, limitValue])

    useEffect(() => {
        if (limitValue !== null && !filteringData) {
            getLimitedData(limitValue, 0);
            setPage(1);
        }
        else if (limitValue !== null && !filteringData) {
            getFilteredData(filter, filterSearch, limitValue, 0);
            setPage(1);
        }
    }, [limitValue])

    useEffect(() => {
        if (page !== null && !filteringData) {
            getLimitedData(limitValue, (page * limitValue) - limitValue);
        }
        else if (page !== null && filteringData) {
            getFilteredData(filterSearch, limitValue, (page * limitValue) - limitValue);
        }
    }, [page])

    useEffect(() => {
        if (searchInput !== null) {
            searchForInput(searchInput);
        }
    }, [searchInput])

    useEffect(() => {
        if (filterSearch !== null) {
            getFilteredData(filterSearch, limitValue, 0);
        }
    }, [filterSearch])

    useEffect(() => {
        if (filter === 'Laptops') {
            getCategoryData(filter, limitValue, 0);
        }
        else if (filter === 'All') {
            getAllData();
            getLimitedData(limitValue, 0);
        }
    }, [filter])


    const getAllData = () => {
        getProducts()
            .then((res) => {
                setData(res.data.products);
                setTotalData(res.data.total);
            })
            .catch((err) => {
                alert(err);
            })
    }

    const getLimitedData = (limit, skip) => {
        getLimitedProducts(limit, skip)
            .then((res) => {
                setLimitedData(res.data.products);
            })
            .catch((err) => {
                alert(err);
            })
    }

    const searchForInput = (searchInput) => {
        if (searchInput !== '') {
            const list = [];
            for (let i = 0; i < data.length; i++) {
                console.log(data[i])

                if (data[i]?.title?.includes(searchInput) || data[i].description?.includes(searchInput) || data[i].price == searchInput ||
                    data[i].discountPercentage == searchInput || data[i].rating == searchInput || data[i].stock == searchInput ||
                    data[i].brand?.includes(searchInput) || data[i].category.includes(searchInput)) {
                    list.push(data[i]);
                }
            }
            setLimitedData(list)
            setTotalData(list.length);
        }
        else {
            getLimitedData(limitValue, 0);
            getAllData();
        }
    }

    const getFilteredData = (filterSearch, limit, skip) => {
        if (filterSearch !== '') {
            setFilteringData(true);
            getFilteredProducts(filterSearch, limit, skip)
                .then((res) => {
                    setLimitedData(res.data.products);
                    setTotalData(res.data.total);
                })
                .catch((err) => {
                    alert(err);
                })

        }
        else {
            getLimitedData(limitValue, 0);
            getAllData();
            setFilteringData(false)
        }
    }


    const getCategoryData = (category, limit, skip) => {
        getCategoryProducts(category.toLowerCase(), limit, skip)
            .then((res) => {
                setLimitedData(res.data.products);
                setTotalData(res.data.total);
            })
            .catch((err) => {
                alert(err);
            })
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3">
                    <Path />
                </div>
                <div className="row">
                    <Filters filters={filters} setValue={setLimitValue} setInput={setSearchInput} setFilter={setFilter} setFilterSearch={setFilterSearch} />
                </div>
                <div className="row">
                    <Table headers={headers} pageSize={limitValue === null ? 5 : limitValue} data={limitedData} />
                </div>
                <div className="row mt-5 mb-3">
                    <Pagination page={page} className="d-flex justify-content-center" onChange={(e) => { setPage(parseInt(e.target.textContent)) }} count={paginationTotal !== null && paginationTotal} />
                </div>
            </div>
        </>
    )
}