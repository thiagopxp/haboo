import * as React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HabooSdk from '@haboo/haboo-sdk';
import { Page, Layout, FooterHelp } from '@shopify/polaris';

import { config } from '../config';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/home';
import Account from '../account/account';
import * as css from './App.scss';

export default class App extends React.Component<{}, any> {
    interval: number;

    constructor(props: any) {
        super(props);

        this.state = {
            count: 0,
            first: '',
            last: '',
            email: '',
            checkboxes: [],
            connected: true // TODO: This value should came from Store
        };
    }


    //This state will be maintained during hot reloads
    componentWillMount() {
        this.interval = window.setInterval(() => {
            this.setState({ count: this.state.count + 1 })
        }, 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <Router>
                <div>
                    {this.renderHeader()}
                    {this.renderMenu()}
                    <div className={css['ui-app-frame__main']}>
                        <Page title="Haboo">

                            <Route exact path="/" component={Home} />
                            <Route path="/account" component={Account} />

                            <Layout.Section>
                                <FooterHelp>
                                    <div>Welcome to hot-reloading React written in TypeScript! {this.state.count}.</div>
                                </FooterHelp>
                            </Layout.Section>

                        </Page>
                    </div>
                </div>
            </Router>
        );
    }

    valueUpdater(field: string) {
        return (value: any) => this.setState({ [field]: value });
    }

    toggleConnection() {
        this.setState(({ connected }) => ({ connected: !connected }));
    }

    renderHeader() {
        // TODO: Connected state should came from Store
        return this.state.connected ? <Header /> : <div />;
    }

    renderMenu() {
        // TODO: Connected state should came from Store
        return this.state.connected ? <Menu /> : <div />;
    }
}
