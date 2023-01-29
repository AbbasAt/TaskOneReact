import './styles/filters.css'
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';


export default function Filters({ filters, setValue, setInput, setFilter, setFilterSearch }) {

    const [showSearch, setShowSearch] = useState(false);
    const [showFilterSearch, setShowFilterSearch] = useState(false);
    const [text, setText] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => { setFilter(text); setFilterSearch(debouncedTerm) }, 500);
        return () => clearTimeout(timer);
    }, [debouncedTerm])

    return (
        <>
            <div className="container">
                <div className="row mb-2">
                    <div className="col d-inline-flex">
                        <select onClick={() => { setShowSearch(false); setShowFilterSearch(false) }} onChange={(e) => { setValue(e.target.value) }} className='select'>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <p className='text'>Entries</p>
                        <div className='divider' />
                        <SearchIcon className='icon' onClick={() => { setShowSearch(!showSearch); setShowFilterSearch(false) }} fontSize='small' />
                        {!showSearch ?
                            <>
                                <div className='divider' />
                                {
                                    filters.map((filter) => (
                                        (filter !== 'Tabs') ? 
                                        <p onClick={() => { setShowFilterSearch(true); setShowSearch(false); setText(filter.toLowerCase()) }} className='text' id='filters'>{filter}</p>
                                            :
                                            <select defaultValue={'All'} onClick={() => { setShowSearch(false); setShowFilterSearch(false) }} onChange={(e) => { setFilter(e.target.value) }} className='select'>
                                                <option value="All">All</option>
                                                <option value="Laptops">Laptops</option>
                                            </select>
                                    ))
                                }
                                {showFilterSearch && <input onChange={(e) => { setDebouncedTerm(e.target.value) }} placeholder={`Search for ${text}`} className='input' type="text" />}
                            </>
                            : <input onChange={(e) => { setInput(e.target.value) }} placeholder='Search for a value' className='input' type="text" />}
                    </div>
                </div>
            </div>


        </>
    )
}