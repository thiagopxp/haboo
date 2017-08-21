import { Dispatch } from "react-redux";
import sdk from "../habooProvider";
import { IUserLoginState } from "../stores";
import { ErrorResponse, IUserProfile } from "@haboo/haboo-sdk";
import userSecurity from "../userSecurity";

export enum UserAction { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS }

const loginRequest = (user: IUserLoginState) => {
    return {
        type: UserAction.LOGIN_REQUEST,
        data: {
            isFetching: true,
            isAuthenticated: false,
            errors: {},
            email: user.email,
            password: user.password
        }
    };
};

const loginSuccess = (user: IUserLoginState) => {
    return {
        type: UserAction.LOGIN_SUCCESS,
        data: {
            isFetching: false,
            isAuthenticated: true,
            errors: {},
            email: user.email,
            password: user.password
        }
    };
};

const loginError = (errors: any) => {
    return {
        type: UserAction.LOGIN_ERROR,
        data: {
            isFetching: false,
            isAuthenticated: false,
            errors,
            password: ""
        }
    };
};

const logoutRequest = () => {
    return {
        type: UserAction.LOGOUT_REQUEST,
        data: {
            isFetching: true
        }
    };
};

const logoutSuccess = () => {
    return {
        type: UserAction.LOGOUT_SUCCESS,
        data: {
            isFetching: false,
            isAuthenticated: false
        }
    };
};

export const userDispatcher = (dispatch: Dispatch<any>) => ({
    login: (user: IUserLoginState) => {

        dispatch(loginRequest(user));

        return sdk.login(user.email, user.password).then((data: any) => {

            userSecurity.set(data.token);

            return dispatch(loginSuccess(user));
        })
        .catch(async (ex: ErrorResponse) => dispatch(loginError(await ex.response.json())));

    },
    logout: () => {

        dispatch(logoutRequest());

        userSecurity.del();

        dispatch(logoutSuccess());
    }
});
