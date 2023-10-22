import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setLoader } from '../store/loader/loader.slice';
import store from '../store/store';

axios.interceptors.request.use(function (config) {

    //set loader state to true in store
    store.dispatch(setLoader(true));

    // const token = window.localStorage.token;
    // if (token) {
    //    config.headers.Authorization = `token ${token}`
    // }
    return config
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

    //set loader state to false in store
    store.dispatch(setLoader(false));

    return response;
}, function (error) {
    //set loader state to false in store
    store.dispatch(setLoader(false));
    return Promise.reject(error);
});

export default axios;