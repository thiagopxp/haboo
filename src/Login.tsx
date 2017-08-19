import * as React from "react";
import HabooSdk from '@haboo/haboo-sdk';
import { config } from './config/config.dev';
import Menu from './Menu';
import { createStore, bindActionCreators, Action, Store, Unsubscribe } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { userActions } from "./flux/actions";
import { IUserLoginState, userLoginInitialState } from "./flux/stores";

import {
    Layout,
    Card,    
    Button,
    FormLayout,
    TextField,
} from '@shopify/polaris';

class Login extends React.Component<any, IUserLoginState> {

    constructor(props: any, context: any) {
        super(props, context);

        this.store = context.store;
        this.state = userLoginInitialState;

        this.onsubmit = this.onsubmit.bind(this);
        this.valueUpdater = this.valueUpdater.bind(this);
    }

    static contextTypes = {
        store: React.PropTypes.object
    }

    store: Store<IUserLoginState>;
    unsubscribe: Unsubscribe;

    componentWillMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    isValid() {
        //todo: validator
        return true;
    }

    onsubmit() {
        if (this.isValid()) {1
            this.setState({errors: {}, isLoading: true});
            this.props.login(this.state);
        }
    }

    valueUpdater(field: any) {
        return (value: any) => this.setState({ [field]: value });
    }

    render() {
        const { errors, email, password, isLoading } = this.state;
        return (<Layout.AnnotatedSection
            title="Login"
            description="User login."
        >
            <Card sectioned>
                <FormLayout>
                        <TextField
                            value={email}
                            label="Email"
                            placeholder="example@email.com"
                            onChange={this.valueUpdater('email')}
                        />
                        <TextField
                            value={password}
                            label="Password"
                            placeholder="Password"
                            onChange={this.valueUpdater('password')}
                        />

                        <div>
                            {
                                Object.keys(errors).map((item, index) => {
                                    return (<div key={index}>{errors[item]}</div>)
                                })
                            }
                        </div>

                        <Button primary disabled={isLoading} onClick={this.onsubmit}>Submit</Button>
                </FormLayout>
            </Card>
        </Layout.AnnotatedSection>);
    }
}

export default connect((state: IUserLoginState) => state, userActions)(Login);
