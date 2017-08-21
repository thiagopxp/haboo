import * as React from "react";
import { Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout, EmptyState, FooterHelp, AccountConnection, Link as PrettyLink } from '@shopify/polaris';
import { userStore } from '../flux/stores';
import Login from './Login';

export default class Account extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);

        this.state = {
            connected: false
        };
    }

    render() {

        const connected = false; // TODO: Get value from Store
        return (
            <Provider store={userStore}>
                <div>
                    {
                        connected ? <div>This route should display user's profile</div> : <Login />

                    /* This route should have '/sign-in' appended
                    <Route path={`${this.props.match.url}`} component={Login} />

                    <Route exact path={this.props.match.url} render={() =>
                        
                    } /> */}




                </div>

            </Provider>
        );
    }
}
