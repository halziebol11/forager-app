import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield console.log("response", response.data)
    yield put({ type: 'SET_USER', payload: response.data });
    yield put({type: 'FETCH_USER_REGION', payload: response.data })
  } catch (error) {
    console.log('User get request failed', error);
  }
}

//saga function to fetch user region name
function* fetchUserRegion(action) {
  try {
    const userRegionResponse = yield axios.get(`/api/userdata/region/${action.payload.region_id}`);
    yield put({ type: 'SET_USER_REGION', payload: userRegionResponse.data});
  } catch (error) {
    console.log(error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeEvery('FETCH_USER_REGION', fetchUserRegion);
}

export default userSaga;
