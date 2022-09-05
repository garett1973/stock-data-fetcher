import axios from 'axios';

const TOKEN = 'cc8fa2qad3iciiq4bmt0';

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: TOKEN
    }
});