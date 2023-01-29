import Table from "../../components/Table";
import Path from "../../components/Path";
import Filters from "../../components/Filters";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { getUsers, getLimitedUsers, getFilteredUsers } from "./services";

export default function Users() {
    const headers = ['First Name', 'Last Name', 'Maiden Name', 'Age', 'Gender', 'Email', 'Username', 'BirthDate', 'Height', 'BloodGroup', 'EyeColor', 'University'];
    const filters = ['Name', 'Email', 'Birth Date', 'Gender'];
    const [limitValue, setLimitValue] = useState(null); //number of entries
    const [data, setData] = useState([]); //All Users
    const [totalData, setTotalData] = useState(null); // Number of all fetched data
    const [page, setPage] = useState(null); // Number of page (pagination)
    const [limitedData, setLimitedData] = useState([]); // data present at each page
    const [paginationTotal, setPaginationTotal] = useState(null); // Total number of pages
    const [searchInput, setSearchInput] = useState(null); // Search text field (search icon)
    const [filter, setFilter] = useState(null); // Filter category (eg: Name)
    const [filterSearch, setFilterSearch] = useState(null); // Filtered input
    const [filteringData,setFilteringData] = useState(false); // Whether i am filtering data or not


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
        else if(limitValue !== null && !filteringData){
            getFilteredData(filter,filterSearch,limitValue,0);
            setPage(1);
        }
    }, [limitValue])

    useEffect(() => {
        if (page !== null && !filteringData) {
            getLimitedData(limitValue, (page * limitValue) - limitValue);
        }
        else if (page !== null && filteringData){
            getFilteredData(filter,filterSearch,limitValue,(page * limitValue) - limitValue);
        }
    }, [page])

    useEffect(() => {
        if (searchInput !== null) {
            searchForInput(searchInput);
        }
    }, [searchInput])

    useEffect(() => {
        if (filterSearch !== null) {
            getFilteredData(filter, filterSearch,limitValue,0);
        }
    }, [filterSearch])


    const getAllData = () => {
        getUsers()
            .then((res) => {
                setData(res.data.users);
                setTotalData(res.data.total);
            })
            .catch((err) => {
                alert(err);
            })
    }

    const getLimitedData = (limit, skip) => {
        getLimitedUsers(limit, skip)
            .then((res) => {
                setLimitedData(res.data.users);
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

                if (data[i]?.firstName?.includes(searchInput) || data[i].lastName?.includes(searchInput) || data[i].maidenName?.includes(searchInput) ||
                    data[i].age == searchInput || data[i].gender == searchInput || data[i].email?.includes(searchInput) ||
                    data[i].userName?.includes(searchInput) || data[i].birthDate == searchInput || data[i].height == searchInput ||
                    data[i].bloodGroup == searchInput || data[i].eyeColor == searchInput || data[i].university.includes(searchInput)) {
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


    const setKey = async (x) => {
        let key = '';
        switch (x) {
            case 'name':
                key = 'firstName';
                break;
            case 'email':
                key = 'email';
                break;
            case 'birth date':
                key = 'birthDate';
                break;
            case 'gender':
                key = 'gender';
                break;
        }
        return key;
    }

    const getFilteredData = (filter, filterSearch,limit,skip) => {
        if (filterSearch !== '') {
            setFilteringData(true);
            setKey(filter).then((key) => {
                getFilteredUsers(key, filterSearch,limit,skip)
                    .then((res) => {
                        setLimitedData(res.data.users);
                        setTotalData(res.data.total);
                    })
                    .catch((err) => {
                        alert(err);
                    })
            })
        }
        else {
            getLimitedData(limitValue, 0);
            getAllData();
            setFilteringData(false)
        }
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