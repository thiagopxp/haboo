import * as React from "react";
import * as PropTypes from "prop-types";
import { Store, Unsubscribe } from "redux";
import { connect, Dispatch } from "react-redux";
import { IUserProfile } from "@haboo/haboo-sdk";

import { userDispatcher } from "../flux/actions";
import { IUserLoginState } from "../flux/stores";

import {
    Button,
    Card,
    Layout,
    FormLayout,
    TextField,
} from "@shopify/polaris";

interface IUserProfileProp {
    logout(): void;
}

class Profile extends React.Component<IUserProfile & IUserProfileProp, any> {
    public static contextTypes = {
        router: PropTypes.object,
        store: PropTypes.object,
    };

    private router: any;
    private store: Store<IUserLoginState>;
    private unsubscribe: Unsubscribe;

    constructor(props: any, context: any) {
        super(props, context);

        this.store = context.store;
        this.router = context.router;
        this.state = this.store.getState();

        this.onlogout = this.onlogout.bind(this);
    }

    public componentWillMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        });
    }

    public componentWillUnmount() {
        this.unsubscribe();
    }

    public onlogout() {
        this.props.logout();
    }

    public render() {
        const { firstName, lastName, isFetching } = this.state;
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Profile"
                    description="User profile."
                >
                    <h1>Hi {firstName}</h1>

                    <Button destructive disabled={isFetching} onClick={this.onlogout}>Logout</Button>
                </Layout.AnnotatedSection>
            </Layout>
        );
    }

}

export default connect((state: any, props: IUserProfile) => {
    return Object.assign(state, props);
}, userDispatcher)(Profile);
