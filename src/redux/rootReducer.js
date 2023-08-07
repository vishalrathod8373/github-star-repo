import codeFreqSlice from "./slice/codeFreq";
import repoReducer from "./slice/repo";


const rootReducers = {
    repo: repoReducer,
    codeFreq: codeFreqSlice
};

export default rootReducers;