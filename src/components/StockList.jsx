import finnHub from '../apis/finnHub';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { WatchlistContext } from '../context/watchlistContext';

const Stocklist = () => {
    const [stock, setStock] = useState();
    const { watchList, removeStock } = useContext(WatchlistContext);
    const navigate = useNavigate();

    useEffect(() => {

        let isMounted = true;
        const fetchData = async () => {
            try {
                let responses = await Promise.all(
                    watchList.map(stock => {
                        return finnHub.get('/quote', {
                            params: {
                                symbol: stock
                            }
                        })
                    })
                );

                const data = responses.map(response => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                });
                if (isMounted) {
                    setStock(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        return () => { isMounted = false };
    }, [watchList]);

    const renderIcon = (data) => {
        return data >= 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
    }

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`);
    }
    return (
        <div>
            <table className='table hover mt-5'>
                <thead style={{ color: "rgb(79, 89, 102)" }}>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Current</th>
                        <th scope='col'>Chg</th>
                        <th scope='col'>Chg %</th>
                        <th scope='col'>High</th>
                        <th scope='col'>Low</th>
                        <th scope='col'>Open</th>
                        <th scope='col'>Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock && stock.map((stock, index) => {
                        return (
                            <tr className="table-row" key={index} >
                                <th
                                    style={{ cursor: 'pointer' }} onClick={() => handleStockSelect(stock.symbol)}
                                >{stock.symbol}</th>
                                <td>{stock.data.c}</td>
                                <td className={`text-${stock.data.d < 0 ? 'danger' : 'success'}`}>{stock.data.d} {renderIcon(stock.data.d)}</td>
                                <td className={`text-${stock.data.d < 0 ? 'danger' : 'success'}`}>{stock.data.dp} {renderIcon(stock.data.dp)}</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td>{stock.data.pc}</td>
                                <td>
                                    <button
                                        className='btn btn-sm btn-outline-danger delete-button'
                                        onClick={() => {
                                            removeStock(stock.symbol);
                                        }}
                                    >
                                        Remove
                                    </button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Stocklist;
