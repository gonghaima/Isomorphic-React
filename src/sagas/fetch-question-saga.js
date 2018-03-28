import { put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
/**
 * Fetch questions saga gets a list of all new
 * questions in response to a particular view being loaded
 */
export default function*() {
  yield takeEvery(`REQUEST_FETCH_QUESTION`, handleFetchQuestion);
}

function* handleFetchQuestion({ question_id }) {
  const raw = yield fetch(`/api/questions/${question_id}`);
  const json = yield raw.json();
  const question = json.items[0];

  yield put({ type: `FETCHED_QUESTION`, question });
}
