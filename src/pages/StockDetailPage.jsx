import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import finnHub from '../apis/finnHub';
import StockChart from '../components/StockChart';
import StockData from '../components/StockData';

const formatData = (data) => {
    return data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: Math.round(data.c[index] * 100) / 100
        }
    })
}

const StockDetailPage = () => {
    const { symbol } = useParams();
    const [chartData, setChartData] = useState();
    useEffect(() => {
        const fetchData = async () => {

            const date = new Date();
            const currentTime = Math.floor(date.getTime() / 1000);
            let oneDayAgo = currentTime - 86400;
            const oneWeekAgo = currentTime - 604800;
            const oneMonthAgo = currentTime - 2592000;
            const threeMonthAgo = currentTime - 7776000;
            const sixMonthAgo = currentTime - 15552000;
            const oneYearAgo = currentTime - 31536000;

            if (date.getDay() === 6) {
                oneDayAgo = currentTime - 86400 * 2;
            } else if (date.getDay() === 0) {
                oneDayAgo = currentTime - 86400 * 3;
            }

            try {
                const responses = await Promise.all([
                    finnHub.get('/stock/candle', {
                        params: {
                            symbol,
                            from: oneDayAgo,
                            to: currentTime,
                            resolution: 30
                        }
                    }),
                    finnHub.get('/stock/candle', {
                        params: {
                            symbol,
                            from: oneWeekAgo,
                            to: currentTime,
                            resolution: 60
                        }
                    }),
                    finnHub.get('/stock/candle', {
                        params: {
                            symbol,
                            from: oneMonthAgo,
                            to: currentTime,
                            resolution: 'D'
                        }
                    }),
                    finnHub.get('/stock/candle', {
                        params: {
                            symbol,
                            from: threeMonthAgo,
                            to: currentTime,
                            resolution: 'D'
                        }
                    }),
                    finnHub.get('/stock/candle', {
                        params: {
                            symbol,
                            from: sixMonthAgo,
                            to: currentTime,
                            resolution: 'D'
                        }
                    }),
                    finnHub.get('/stock/candle', {
                        params: {
                            symbol,
                            from: oneYearAgo,
                            to: currentTime,
                            resolution: 'W'
                        }
                    })
                ]);

                // console.log(responses[0].data);

                if (responses[0].data.s === 'no_data') {
                    responses[0] = await finnHub.get('/stock/candle', {
                        params: {
                            symbol,
                            from: currentTime - 86400 * 4,
                            to: currentTime,
                            resolution: 30
                        }
                    })
                }

                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    month: formatData(responses[2].data),
                    threeMonth: formatData(responses[3].data),
                    sixMonth: formatData(responses[4].data),
                    year: formatData(responses[5].data)
                })
            } catch (error) {
                console.log(error);
            }


        }
        fetchData();
    }, [symbol]);
    return (
        <div>
            {chartData && (
                <div>
                    <StockChart chartData={chartData} symbol={symbol} />
                    <StockData symbol={symbol} />
                </div>
            )}
        </div>
    )
}

export default StockDetailPage;