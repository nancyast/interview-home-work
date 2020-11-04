import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  types,
  fetchPostsCompleted,
  fetchCommentsCompleted,
  fetchUsersCompleted,
} from './actions';
import apiClient from '../../utils/apiClient';

function* fetchPosts() {
  const response = yield call(() => apiClient.get('posts'));
  if (response.length > 0) {
    yield put(fetchPostsCompleted(response));
  }
}

function* fetchUsers() {
  const response = yield call(() => apiClient.get('users'));
  if (response.length > 0) {
    yield put(fetchUsersCompleted(response));
  }
}

function* fetchComments(action) {
  const response = yield call(() =>
    apiClient.get(`comments?postId=${action.payload}`)
  );
  if (response.length > 0) {
    yield put(
      fetchCommentsCompleted({ postId: action.payload, comments: response })
    );
  }
}

function* createPostSaga() {
  yield takeLatest(types.FETCH_POSTS, fetchPosts);
  yield takeLatest(types.FETCH_USERS, fetchUsers);
  yield takeEvery(types.FETCH_COMMENTS, fetchComments);
}

export { createPostSaga };
