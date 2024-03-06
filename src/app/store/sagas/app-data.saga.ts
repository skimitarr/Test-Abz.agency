import { call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import { getAPIAnswer, getAllUsers, getPositions, newUser} from '../slices/app-data.slice';
import { ApiResponseUsers, ApiResponsePositions, ApiResponseToken, ApiResponseAddUser, Form } from '../types';

const BaseURL = 'https://frontend-test-assignment-api.abz.agency/api/v1'

function* handleGetAllUsers(action: { type: string; payload: { url: string } }) {
  try {
    const response: Response = yield call(fetch, BaseURL + action.payload.url);
    const data: ApiResponseUsers = yield call([response, 'json']);
    console.log(data);

    yield put(getAPIAnswer(data));
    yield put(getAllUsers(data.users));
  } catch (error) {
    console.error('Error getting users:', error);
  }
}

function* handleGetPositions() {
  try {
    const response: Response = yield call(fetch, BaseURL+'/positions');
    const data: ApiResponsePositions = yield call([response, 'json']);
    yield put(getPositions(data));
  } catch (error) {
    console.error('Error getting users:', error);
  }
}

function* getToken() {
  try {
    const response: Response = yield call(fetch, `${BaseURL}/token`);
    const data: ApiResponseToken = yield call([response, 'json']);

    if (data.token) {
      return data.token;
    } else {
      throw new Error('Token not found in response');
    }
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
}

function* handleAddUser(action: PayloadAction<Form> ) {
  try {
    const token: string = yield call(getToken);

    const formData = new FormData();
    formData.append('name', action.payload.name);
    formData.append('email', action.payload.email);
    formData.append('phone', action.payload.phone);
    formData.append('position_id', String(action.payload.position_id));
    if (action.payload.photo) {
      formData.append('photo', action.payload.photo);
    }

    const response: Response = yield call(fetch, `${BaseURL}/users`, {
      method: 'POST',
      headers: {
        'Token': token,
      },
      body: formData,
    });

    const responseData: ApiResponseAddUser = yield call([response, 'json']);
    yield put(newUser(responseData));
  } catch (error) {
    console.error('Error posting data:', error);
  }
}

export function* appDataSaga() {
  yield takeLatest('actionType/getAllUsers', handleGetAllUsers);
  yield takeLatest('actionType/getPositions', handleGetPositions);
  yield takeLatest('actionType/addUser', handleAddUser);
}
