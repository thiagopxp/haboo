import * as React from "react";
import HabooSdk from '@haboo/sdk';
import {config} from './config/config.dev';
import * as css from './App.css';

export default class App extends React.Component<{}, { count: number; }> {
    interval: number;
    state = { count: 0 };

    //This state will be maintained during hot reloads
    componentWillMount() {

        this.example();

        this.interval = window.setInterval(() => {
            this.setState({ count: this.state.count + 1 })
        }, 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    example() {
        const sdk = new HabooSdk(config.apiUrl);
        const data = sdk.login('ZhVjEN3IRpBs7kzrdcz0i4XSrUIjtDrh7kMAVdjt5qg=');
        data.then(data => console.log(data));
    }

    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <div className={css.foo}>Welcome to hot-reloading React written in TypeScript! {this.state.count}</div>
            </div>
        );
    }
}
