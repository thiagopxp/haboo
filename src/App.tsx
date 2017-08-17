import * as React from "react";
import HabooSdk from '@haboo/sdk';
import { config } from './config/config.dev';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import * as css from './App.scss';

export default class App extends React.Component<{}, { count: number; }> {
    interval: number;
    state = { count: 0 };

    //This state will be maintained during hot reloads
    componentWillMount() {
        this.interval = window.setInterval(() => {
            this.setState({ count: this.state.count + 1 })
        }, 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    static childContextTypes: React.ValidationMap<any> = {
        habooSdk: React.PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            habooSdk: new HabooSdk(config.apiUrl, config.publicKey)
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <h1>Hello world!</h1>
                    <div className={css.foo}>Welcome to hot-reloading React written in TypeScript! {this.state.count}</div>
                    <div>
                        <Login />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
