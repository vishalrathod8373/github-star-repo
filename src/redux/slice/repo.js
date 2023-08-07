import { createSlice } from "@reduxjs/toolkit";

const repoInitialState = {
    repos: {
        total_count: 0,
        data: [],
        isLoading: false,
        accordionData: [],
        errors: ''
    }
}

export const repoSlice = createSlice({
    name: 'repo',
    initialState: repoInitialState,
    reducers: {
        getRepoAction: state => {
            state.repos.isLoading = true;
            state.repos.errors = ''
        },
        getRepoSuccessAction: (state, action) => {
            state.repos.isLoading = false;
            const newRepoItems = action.payload.items;
            state.repos.data = [...state?.repos?.data, ...newRepoItems];
            state.repos.total_count = action.payload.total_count;
        },
        getRepoErrorAction: (state, payload) => {
            state.repos.isLoading = false;
            state.repos.errors = payload;
        }
    }
});

export const {
    getRepoAction,
    getRepoSuccessAction,
    getRepoErrorAction,
} = repoSlice.actions;

export default repoSlice.reducer;