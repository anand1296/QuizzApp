import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setLoader } from '../store/loader/loader.slice';
import store from '../store/store';

axios.interceptors.request.use(function (config) {

    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    // document.body.classList.add('loading-indicator');
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

    // spinning hide
    // UPDATE: Add this code to hide global loading indicator
    // document.body.classList.remove('loading-indicator');
    store.dispatch(setLoader(false));

    return response;
}, function (error) {
    store.dispatch(setLoader(false));
    return Promise.reject(error);
});

export default axios;