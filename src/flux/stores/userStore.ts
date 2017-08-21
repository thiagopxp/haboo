import { createStore, Action } from "redux";
import { UserAction } from "../actions";
import userSecurity from "../userSecurity";

export interface IAction<T> {
    errors: { [key: string]: string };
    isFetching: boolean;
}

export interface IUserLoginState extends IAction<IUserLoginState> {
    email: string;
    password: string;
    isAuthenticated: boolean;
}

export const userStore = createStore((state: IUserLoginState = {
    email: "demo@node-crm.com",
    password: "demo_password",
    errors: {},
    isFetching: false,
    isAuthenticated: !userSecurity.isExpired(),
}, action: any) => {
    switch (action.type) {
        case UserAction.LOGIN_REQUEST:
        case UserAction.LOGIN_SUCCESS:
        case UserAction.LOGIN_ERROR:
        case UserAction.LOGOUT_SUCCESS:
        case UserAction.LOGOUT_REQUEST:
            return { ...state, ...action.data };
        default:
            return state;
    }
});
