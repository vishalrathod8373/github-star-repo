import { put, takeLatest } from 'redux-saga/effects'
import crudServices from '../api/crud-services'
import { getRepoErrorAction, getRepoSuccessAction } from './slice/repo';
import { getCodeFreqErrorAction, getCodeFreqSuccessAction, getCommitAction, getCommitErrorAction, getCommitSuccessAction, getContributorsErrorAction, getContributorsSuccessAction } from './slice/codeFreq';

function* getRepoSaga(payload) {
    try {
        
        const res = yield crudServices.getRepo(payload);
        
        yield put(getRepoSuccessAction(res?.data));
    } catch (error) {
        yield put(getRepoErrorAction(error));
    }
}

function* getCodeFreq(payload){
    try {
        const res = yield crudServices.codeFreq(payload);
        yield put(getCodeFreqSuccessAction(res?.data))
    } catch (error) {
        yield put(getCodeFreqErrorAction(error))
    }
}
function* getCommitSaga(payload){
    try {
        const res = yield crudServices.commitActivity(payload);
        
        yield put(getCommitSuccessAction(res?.data))
    } catch (error) {
        
        
        yield put(getCommitErrorAction(error))
    }
}

function* getContributors(payload){
    try {
        const res = yield crudServices.contributors(payload)
        
        yield put(getContributorsSuccessAction(res?.data));
    } catch (error) {
        
        yield put(getContributorsErrorAction(error))
    }
}

export function* watchContributors(){
    yield takeLatest('GET_CONTRIBUTORS',getContributors);
}
export function* watchGetRepo() {
    yield takeLatest('GET_REPO', getRepoSaga);
}
export function* watchCodeFreq(){
    yield takeLatest('GET_CODE_FREQ',getCodeFreq);
}
export function* watchCommit(){
    yield takeLatest('GET_COMMIT',getCommitSaga);
}