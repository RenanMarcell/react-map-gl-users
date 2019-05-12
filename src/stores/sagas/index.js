import { all, takeLatest } from "redux-saga/effects";
import { Types as UserTypes } from "../ducks/users";

import { addUser, removeUser } from "./users";

export default function* rootSaga() {
    yield all([
        takeLatest(UserTypes.ADD_REQUEST, addUser),
        takeLatest(UserTypes.REMOVE_REQUEST, removeUser)
    ]);
};