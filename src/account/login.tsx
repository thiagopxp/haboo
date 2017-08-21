import * as React from "react";
import * as PropTypes from "prop-types";
import { Store, Unsubscribe } from "redux";
import { connect, Dispatch } from "react-redux";
import HabooSdk from "@haboo/haboo-sdk";

import { config } from "../config";
import Menu from "../app/Menu";
import { userDispatcher } from "../flux/actions";
import { IUserLoginState } from "../flux/stores";

import {
    Button,
    Card,
    Layout,
    FormLayout,
    TextField,
} from "@shopify/polaris";

class Login extends React.Component<any, IUserLoginState> {

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

        this.onsubmit = this.onsubmit.bind(this);
        this.valueUpdater = this.valueUpdater.bind(this);
    }

    public componentWillMount() {
        this.unsubscribe = this.store.subscribe(() => {

            const newState = this.store.getState();

            if (newState.isAuthenticated) {
                return this.router.history.push("/sales");
            }

            this.setState(newState);
        });
    }

    public componentWillUnmount() {
        this.unsubscribe();
    }

    public isValid() {
        // todo: validator
        return true;
    }

    public onsubmit() {
        if (this.isValid()) {
            this.props.login(this.state);
        }
    }

    public valueUpdater(field: any) {
        return (value: any) => this.setState({ [field]: value });
    }

    public render() {
        const { errors, email, password, isFetching } = this.state;
      
        return (
            <Layout>
                <Layout.AnnotatedSection
                    title="Login"
                    description="User login."
                >
                    <Card sectioned>
                        <FormLayout>
                            <TextField
                                value={email}
                                label="Email"
                                placeholder="example@email.com"
                                onChange={this.valueUpdater("email")}
                            />
                            <TextField
                                value={password}
                                label="Password"
                                placeholder="Password"
                                type="password"
                                onChange={this.valueUpdater("password")}
                            />

                            <div>
                                {Object.keys(errors).map((item, index) => (<div key={index}>{errors[item]}</div>))}
                            </div>

                            <Button primary disabled={isFetching} onClick={this.onsubmit}>Submit</Button>
                        </FormLayout>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>);
    }
}

export default connect((state: IUserLoginState) => state, userDispatcher)(Login);
