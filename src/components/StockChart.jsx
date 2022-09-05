import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const StockChart = ({ chartData, symbol }) => {
    const { day, week, month, threeMonth, sixMonth, year } = chartData;
    const [period, setPeriod] = useState('7d');

    const setDataPeriod = () => {
        switch (period) {
            case '24h': {
                return day;
            }
            case '7d': {
                return week;
            }
            case '1m': {
                return month;
            }
            case '3m': {
                return threeMonth;
            }
            case '6m': {
                return sixMonth;
            }
            case '1y': {
                return year;
            }
            default: {
                return week;
            }
        }
    };

    const color = setDataPeriod()[setDataPeriod().length - 1].y - setDataPeriod()[0].y > 0 ? '#2ecc71' : '#e74c3c';

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '24px',
            }
        },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
            }
        },
        tooltip: {
            x: {
                format: 'MMM dd HH:MM'
            }
        }
    };

    const series = [{
        name: symbol,
        data: setDataPeriod()
    }];

    const renderButtonSelect = (button) => {
        const classes = 'btn m-1';
        if (period === button) {
            return classes + ' btn-primary';
        } else {
            return classes + ' btn-outline-primary';
        }
    };

    return (
        <div className='mt-5 p-4 shadow-sm bg-white' >
            <Chart options={options} series={series} type='area' width='100%' />
            <div>
                <button className={renderButtonSelect('24h')} onClick={() => setPeriod('24h')} >24h</button>
                <button className={renderButtonSelect('7d')} onClick={() => setPeriod('7d')} >7d</button>
                <button className={renderButtonSelect('1m')} onClick={() => setPeriod('1m')} >1m</button>
                <button className={renderButtonSelect('3m')} onClick={() => setPeriod('3m')} >3m</button>
                <button className={renderButtonSelect('6m')} onClick={() => setPeriod('6m')} >6m</button>
                <button className={renderButtonSelect('1y')} onClick={() => setPeriod('1y')} >1y</button>
            </div>
        </div>
    )
}

export default StockChart