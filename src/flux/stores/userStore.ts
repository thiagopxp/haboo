import { createStore, Action } from 'redux';
import { UserActionType } from '../constants';

export interface IUserLoginState {
    email: string,
    password: string,
    errors: { [key: string]: string },
    token: string,
    isLoading: boolean
}

export const userLoginInitialState:IUserLoginState= { 
    email: '',
    password: '',
    errors: {},
    token: '',
    isLoading: false
}

export const userStore = createStore((state: IUserLoginState = userLoginInitialState, action: any) => {
    switch (action.type) {
        case UserActionType.LOGIN_USER:
            {
                if (!!action.data.error)
                    return Object.assign(state, { errors: { "message": action.data.error }, isLoading: false });

                return Object.assign(state, { token: action.data.token, isLoading: false });
            }
        default:
            return state;
    }
});