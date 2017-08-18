import * as React from "react";
import HabooSdk from '@haboo/haboo-sdk';
import {config} from './config/config.dev';
import Menu from './Menu';
import { createStore } from 'redux';

type State = { 
    email: string
};

export default class Login extends React.Component<{}, State> {
    
    context:{habooSdk: HabooSdk}

    static contextTypes: React.ValidationMap<any> = {
		habooSdk: React.PropTypes.object.isRequired
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    login() { 
        this.context.habooSdk.login('email@gmail', 'password').then(res => console.log(res));
    }

    render() {
        return (
            <div>
                <button onClick={() => this.login()}>Login</button>
            </div>
        );
    }
}
