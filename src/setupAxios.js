import axios from 'axios';

// function to setup axios with common configurations
const setupAxios = () => {
    // set base URL for API requests
    axios.defaults.baseURL = 'https://kroo-back-end.onrender.com/api/v1';

    // add request interceptor to modify request config before sending
    axios.interceptors.request.use(
        (config) => {
            // you can modify the request config here if needed (e.g., adding common headers)
            return config;
        },
        (error) => {
            // handle request errors
            return Promise.reject(error);
        }
    );

    // add response interceptor to handle responses
    axios.interceptors.response.use(
        (response) => {
            // you can modify the response data here if needed
            return response;
        },
        (error) => {
            // handle response errors
            return Promise.reject(error);
        }
    );
};

export default setupAxios;