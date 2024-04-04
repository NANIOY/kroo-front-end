import axios from 'axios';

const setupAxios = (router) => {
    const axiosInstance = axios.create({
        baseURL: 'https://kroo-back-end.onrender.com/api/v1',
    });

    axiosInstance.interceptors.response.use(
        response => {
            handleSuccessResponse(response.data, router);
            return response;
        },
        error => {
            if (error.response.status === 401) {
                console.error('Unauthorized access. Redirecting to login page.');
                router.push('/login');
            }
            return Promise.reject(error);
        }
    );

    const handleSuccessResponse = (responseData, router) => {
        if (responseData.data.sessionToken) {
            localStorage.setItem('sessionToken', responseData.data.sessionToken);
        }
        if (responseData.data.rememberMeToken) {
            localStorage.setItem('rememberMeToken', responseData.data.rememberMeToken);
        }
        if (router.currentRoute.value.path !== '/dashboard') {
            router.push('/dashboard');
        }
    };

    return axiosInstance;
};

export default setupAxios;
