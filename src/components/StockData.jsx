import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import React, { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';

const StockData = ({ symbol }) => {

    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finnHub.get('/stock/profile2', {
                    params: {
                        symbol
                    }
                });
                if (isMounted) {
                    // console.log('isMounted', isMounted);
                    setStockData(response.data);
                }
                // console.log(response.data);
                // console.log("Profile: ", stockData);
            } catch (error) {
                console.log("Error fetching stock data: ", error);
            }
        }
        fetchData();
        return () => { isMounted = false };
    }, [symbol]);

    return (
        <div>
            {stockData && (
                <div className="row border bg-white rounded shadow-sm p-4 mt-5">
                    <div className="col">
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>Name: </span>
                            <span >{stockData.name}</span>
                            <hr />
                        </div>
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>Ticker: </span>
                            <span>{stockData.ticker}</span>
                            <hr />
                        </div>
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>Country: </span>
                            <span>{stockData.country}</span>
                        </div>

                    </div>
                    <div className="col">
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>Excange: </span>
                            <span>{stockData.exchange}</span>
                            <hr />
                        </div>
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>Industry: </span>
                            <span>{stockData.finnhubIndustry}</span>
                            <hr />
                        </div>
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>IPO: </span>
                            <span>{stockData.ipo}</span>
                        </div>
                    </div>
                    <div className="col">
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>MarketCap: </span>
                            <span>{(Math.round(stockData.marketCapitalization * 100) / 100).toString()}</span>
                            <hr />
                        </div>
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>Shares Outstanding: </span>
                            <span>{stockData.shareOutstanding}</span>
                            <hr />
                        </div>
                        <div className='d-flex flex-column mb-2'>
                            <span className='fw-bold'>Website: </span>
                            <span>{stockData.weburl}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StockData;