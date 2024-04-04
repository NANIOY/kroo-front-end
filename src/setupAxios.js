import axios from 'axios';

const setupAxios = (router) => {
    const axiosInstance = axios.create({
        baseURL: 'https://kroo-back-end.onrender.com/api/v1',
    });

    axiosInstance.interceptors.response.use(
        response => {
            handleSuccessResponse(response, router);
            return response;
        },
        error => {
            if (error.response.status === 401) {
                console.error('Unauthorized access.');
            }
            return Promise.reject(error);
        }
    );

    const handleSuccessResponse = (response, router) => {
        const responseData = response.data;
        if (responseData && responseData.sessionToken) {
            sessionStorage.setItem('sessionToken', responseData.sessionToken);
        }
        if (responseData && responseData.rememberMeToken) {
            sessionStorage.setItem('rememberMeToken', responseData.rememberMeToken);
        }
    };

    return axiosInstance;
};

export default setupAxios;
