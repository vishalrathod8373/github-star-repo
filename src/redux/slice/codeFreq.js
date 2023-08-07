import { createSlice } from "@reduxjs/toolkit";

const codeFreqInitialState = {
        isLoading: false,
        accordionData: [],
        contributors:[],
        errors: ''
}

export const codeFreqSlice = createSlice({
    name: 'codeFreq',
    initialState: codeFreqInitialState,
    reducers: {
        getCodeFreqAction: state => {
            state.isLoading = true;
            state.errors = ''
        },
        getCodeFreqSuccessAction: (state, action) => {
            state.isLoading = false;            
            state.accordionData = action.payload.items;
        },
        getCodeFreqErrorAction: (state, payload) => {
            state.isLoading = false;
            state.errors = payload;
        },
        getCommitAction: state => {
            state.isLoading = true;
            state.errors = ''
        },
        getCommitSuccessAction: (state, action) => {
            
            
            state.isLoading = false;            
            state.accordionData = action.payload;
        },
        getCommitErrorAction: (state, payload) => {
            state.isLoading = false;
            state.errors = payload;
        },
        getContributorsAction: state => {
            state.isLoading = true;
            state.errors = ''
        },
        getContributorsSuccessAction: (state, action) => {
            
            state.isLoading = false;            
            state.contributors = action.payload;
        },
        getContributorsErrorAction: (state, payload) => {
            state.isLoading = false;
            state.errors = payload;
        }
    }
});

export const {
    getCodeFreqAction,
    getCodeFreqSuccessAction,
    getCodeFreqErrorAction,
    getCommitAction,
    getCommitSuccessAction,
    getCommitErrorAction,
    getContributorsAction,
    getContributorsSuccessAction,
    getContributorsErrorAction
    
} = codeFreqSlice.actions;

export default codeFreqSlice.reducer;