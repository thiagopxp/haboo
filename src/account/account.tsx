import * as React from "react";
import * as PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Layout, EmptyState, FooterHelp, AccountConnection, Link as PrettyLink } from "@shopify/polaris";
import { userStore, IUserLoginState } from "../flux/stores";
import Login from "./Login";
import Profile from "./Profile";
import userSecurity from "../flux/userSecurity";


export default class Account extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const { } = this.state;

        return (
            <Provider store={userStore}>
                <div>
                    {
                        !userSecurity.isExpired()
                            ? <Profile {...userSecurity.getProfile()} />
                            : <Login />
                    }
                </div>
            </Provider>
        );
    }
}
