import { Dispatch }  from 'react-redux';
import { UserActionType } from '../constants'
import sdk from '../habooProvider';

// ours actions
export const userActions = (dispatch: Dispatch<any>) => ({
    login: (user:any) => {
        return sdk.login(user.email, user.password).then((res) => { 
            dispatch({ type: UserActionType.LOGIN_USER, data: res});
        }).catch((error)=> {
            dispatch({ type: UserActionType.LOGIN_USER, data: {error: 'UNEXPECTED ERROR'}});
        });

    }
});