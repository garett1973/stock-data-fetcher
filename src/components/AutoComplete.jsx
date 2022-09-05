import React, { useState, useEffect, useContext } from 'react';
import finnHub from '../apis/finnHub';
import { WatchlistContext } from '../context/watchlistContext';

const AutoComplete = () => {

    const [searchItem, setSearchItem] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { addStock } = useContext(WatchlistContext);

    const renderDropdown = () => {
        const dropDownClass = searchResults.length > 0 ? 'show' : null;
        return (
            <ul style={{
                height: '500px',
                overflowY: 'scroll',
                overflowX: 'hidden',
                cursor: 'pointer',
            }} className={`dropdown-menu ${dropDownClass}`}>
                {searchResults.map((result, index) => {
                    return (
                        <li
                            onClick={() => {
                                addStock(result.symbol)
                                setSearchItem('');
                            }}
                            key={index}
                            className="dropdown-item" >
                            {result.symbol} - {result.description}
                        </li>
                    );
                })}
            </ul>
        );
    };

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finnHub.get('/search', {
                    params: {
                        q: searchItem,
                    }
                });
                if (isMounted) {
                    setSearchResults(response.data.result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (searchItem) {
            fetchData();
        } else {
            setSearchResults([]);
        }
        return () => (isMounted = false);
    }, [searchItem]);

    return (
        <div className='w-50 p-5 rounded mx-auto'>
            <div className='form-floating dropdown'>
                <input
                    style={{ backgroundColor: "rgba(145, 158, 171, 0.4)" }} type='text'
                    className='form-control'
                    id='search'
                    placeholder='Search...'
                    autoComplete='off'
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
                <label htmlFor='search'>Search...</label>
                {renderDropdown()}
            </div>
        </div>
    )
}

export default AutoComplete