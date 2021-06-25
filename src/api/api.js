import {get, postForm, post} from './request'

let requestURL = {
    toGetUsers: () => get('/api/users/getUsers'),
    toDelUserById: id => get('/api/users/delUserById?id=' + id),
    toAddUser: data => postForm('/api/users/addUser/', data),

    toLogin: data => post('/api/users/login/', data),

}


export default requestURL
