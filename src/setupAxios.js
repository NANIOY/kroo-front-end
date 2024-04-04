import axios from 'axios';

const setupAxios = (router) => {
    const axiosInstance = axios.create({
        baseURL: 'https://kroo-back-end.onrender.com/api/v1',
    });

    axiosInstance.interceptors.request.use(
        config => {
            const sessionToken = sessionStorage.getItem('sessionToken');
            const rememberMeToken = sessionStorage.getItem('rememberMeToken');

            if (sessionToken && rememberMeToken) {
                config.headers['Authorization'] = sessionToken;
                config.headers['Cookie'] = `rememberMeToken=${rememberMeToken}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        response => {
            handleSuccessResponse(response.data, router);
            return response;
        },
        error => {
            if (error.response.status === 401) {
                console.error('Unauthorized access.');
            }
            return Promise.reject(error);
        }
    );

    const handleSuccessResponse = (responseData, router) => {
        if (responseData && responseData.data) {
            if (responseData.data.sessionToken) {
                sessionStorage.setItem('sessionToken', responseData.data.sessionToken);
            }
            if (responseData.data.rememberMeToken) {
                sessionStorage.setItem('rememberMeToken', responseData.data.rememberMeToken);
            }
        }
    };

    return axiosInstance;
};

export default setupAxios;