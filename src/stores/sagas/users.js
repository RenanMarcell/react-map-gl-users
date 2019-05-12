import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { Creators as UserActions } from "../ducks/users";

export function* addUser(action) {
    const { user, coordinates } = action.payload;
    try {
        const { data } = yield call(api.get, user);

        const isDuplicated = yield select(state => state.users.find(user => (
            user.id === data.id
        )));

        if (isDuplicated) {
            return toast.error('O usuário ja foi adicionado');
        }
        const userData = {
            avatar: data.avatar_url,
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
            name: data.name,
            id: data.id,
            login: data.login
        };

        toast.success('Usuário adicionado com sucesso');
        yield put(UserActions.addUserSuccess(userData));
    } catch (err) {
        toast.error('Ocorreu um erro ao adicionar o usuário');
    }
}

export function* removeUser(action) {
    const updatedUsers = yield select(state => state.users.filter(user => (
        user.id !== action.payload.id
    )));

    toast.info('Usuário removido com sucesso');
    yield put(UserActions.removeUserSuccess(updatedUsers));
}