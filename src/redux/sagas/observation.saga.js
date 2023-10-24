import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//saga function to retrieve observations from DB
function* fetchUserObservations(action) {
    try {
        const observationsResponse = yield axios.get(`/api/observation/user/${action.payload.user_id}`);
        yield put({ type: 'SET_USER_OBSERVATIONS', payload: observationsResponse.data});
    } catch (error) {
        console.log(error);
    }
  }
  
  //saga function to add observation to DB
  function* addNewObservation(action) {
    try {
      yield axios.post('/api/observation', action.payload);
      yield put({ type: 'FETCH_USER_OBSERVATIONS', payload: action.payload });
    } catch (error) {
        console.log('error posting observation', error);
    }    
  }

  //saga function to delete observation
  function* deleteObservation(action) {
    try {
      yield console.log("action payload is", action.payload)
      yield axios.delete(`/api/observation/userDelete/${action.payload.id}`);
      yield put({ type: 'FETCH_USER_OBSERVATIONS', payload: action.payload });
    } catch (error) {
        console.log('error posting observation', error);
    }    
  }

  //saga function to edit observation
  function* editObservation(action) {
    try {
      yield axios.put(`/api/observation/edit/${action.payload.id}`, action.payload);
      yield put({ type: 'FETCH_USER_OBSERVATIONS', payload: action.payload });
    } catch (error) {
        console.log('error posting observation', error);
    }    
  }
  

  function* observationSaga() {
    yield takeEvery('FETCH_USER_OBSERVATIONS', fetchUserObservations);
    yield takeEvery('ADD_NEW_OBSERVATION', addNewObservation);
    yield takeEvery('DELETE_OBSERVATION', deleteObservation);
    yield takeEvery('EDIT_OBSERVATION', editObservation)
  }
  
  export default observationSaga;