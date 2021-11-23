
import store from '@/store';
import axios from 'axios';

store.subscribe((mutations) => {
    console.log(mutations);
    switch (mutations.type) {
        case 'auth/SET_TOKEN':
        if (mutations.payload) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${mutations.payload}`;
            localStorage.setItem('token', mutations.payload);
        }
         else {
            axios.defaults.headers.common['Authorization'] = null;
            localStorage.removeItem('token');
        }
            // if (mutations.payload) {
            //     axios.defaults.headers.common[
            //         'token_type'
            //     ] = `bearer ${mutations.payload}`;
            //     localStorage.setItem('token', mutations.payload);
            // }
            //  else {
            //     axios.defaults.headers.common['token_type'] = null;
            //     localStorage.removeItem('token');
            // }
            // console.log(mutations.payload)
            break;
    }
});