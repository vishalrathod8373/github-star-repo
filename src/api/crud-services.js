import Api from "./Api";

export default {
    getUserList(param) {
        return Api.get(`/users`, { params: param })
    },
    createUser(data) {
        return Api.post('/users', data)
    }
};
