import Api from "./Api";

export default {
    getRepo(data) {
        const { payload } = data
        
        return Api.get(`/search/repositories?q=created:>${payload.date}&sort=stars&order=desc&page=${payload.page}&per_page=10`)
    },
    codeFreq(data) {
        
        const { payload } = data
        return Api.get(`/repos/${payload?.owner}/${payload?.repo}/stats/code_frequency`)
    },
    commitActivity(data){
        const { payload } = data
        return Api.get(`/repos/${payload?.owner}/${payload?.repo}/stats/commit_activity`)
    },
    contributors(data){
        const { payload } = data
        return Api.get(`/repos/${payload?.owner}/${payload?.repo}/stats/contributors`)
    }
};
