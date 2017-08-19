import * as React from "react";
import HabooSdk from '@haboo/haboo-sdk';
import { config } from './config/config.dev';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import * as css from './App.scss';
import { userStore } from './flux/stores';
import { Provider } from 'react-redux';

import {
    Layout,
    Page,
    FooterHelp,
    Card,
    Link,
    Button,
    FormLayout,
    TextField,
    AccountConnection,
    ChoiceList,
    SettingToggle,
    EmptyState
} from '@shopify/polaris';


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
            connected: false
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

    /** EXAMPLE: ADDING ITEMS IN CHILD CONTEXT ***************
     * 
    static childContextTypes: React.ValidationMap<any> = {
        habooSdk: React.PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            habooSdk: new HabooSdk(config.apiUrl, config.publicKey)
        }
    }
    */

    render() {
        const breadcrumbs = [
            { content: 'Sample apps' },
            { content: 'Create React App' },
        ];
        const primaryAction = { content: 'New product' };
        const secondaryActions = [{ content: 'Import', icon: 'import' }];

        return (
            <div>
                {this.renderHeader()}
                {this.renderMenu()}
                <div className={css['ui-app-frame__main']}>
                    <Page
                        title="Haboo">
                        {this.state.connected ?
                            <Layout>
                                {this.renderAccount()}

                                {this.renderForm()}

                                <Provider store={userStore}>
                                    <Login/>
                                </Provider>

                                <Layout.Section>
                                    <FooterHelp>
                                        <div className={css.foo}>Welcome to hot-reloading React written in TypeScript! {this.state.count}.</div>
                                    </FooterHelp>
                                </Layout.Section>

                            </Layout>
                            : this.renderEmptyState()
                        }
                    </Page>
                </div>
                {/* 
                <div>
                    <Login />
                </div>
                <Footer /> */}
            </div>
        );
    }

    valueUpdater(field: string) {
        return (value:any) => this.setState({ [field]: value });
    }

    toggleConnection() {
        this.setState(({ connected }) => ({ connected: !connected }));
    }

    connectAccountMarkup() {
        return (
            <Layout.AnnotatedSection
                title="Membership"
                description="Enter to your Haboo Account."
            >
                <AccountConnection
                    action={{
                        content: 'Enter',
                        onAction: this.toggleConnection.bind(this, this.state),
                    }}
                    details="No account connected"
                    termsOfService={<p>By clicking Enter, you are accepting Haboo’s <Link url="https://haboo.org">Terms and Conditions</Link>.</p>}
                />
            </Layout.AnnotatedSection>
        );
    }

    disconnectAccountMarkup() {
        return (
            <Layout.AnnotatedSection
                title="Membership"
                description="Logout from your account."
            >
                <AccountConnection
                    connected
                    action={{
                        content: 'Logout',
                        onAction: this.toggleConnection.bind(this, this.state),
                    }}
                    accountName="Thiago Passos"
                    title={<Link url="javascript://">Thiago Passos</Link>}
                    details="Account id: d587647ae4"
                />
            </Layout.AnnotatedSection>
        );
    }

    renderHeader() {
        return this.state.connected ? <Header /> : <div />;
    }

    renderMenu() {
        return this.state.connected ? <Menu /> : <div />;
    }

    renderEmptyState() {
        return this.state.connected ? <div /> : <EmptyState
            heading="Work with Haboo"
            image="http://i.imgur.com/tIeh3wW.png"
            action={{ content: 'Enter', onAction: this.toggleConnection.bind(this, this.state) }}
            secondaryAction={{
                content: 'Learn more',
                url: 'http://haboo.org',
            }}
        >
            <p>A simple and connected hub for the international education industry.</p>
        </EmptyState>
    }

    renderAccount() {
        return this.state.connected
            ? this.disconnectAccountMarkup()
            : this.connectAccountMarkup();
    }

    renderForm() {
        const choiceListItems = [
            { label: 'I accept the Terms of Service', value: 'false' },
            { label: 'I consent to receiving emails', value: 'false2' },
        ];

        return (<Layout.AnnotatedSection
            title="Form"
            description="A sample form using Haboo components."
        >
            <Card sectioned>
                <FormLayout>
                    <FormLayout.Group>
                        <TextField
                            value={this.state.first}
                            label="First Name"
                            placeholder="Tom"
                            onChange={this.valueUpdater('first')}
                        />
                        <TextField
                            value={this.state.last}
                            label="Last Name"
                            placeholder="Ford"
                            onChange={this.valueUpdater('last')}
                        />
                    </FormLayout.Group>

                    <TextField
                        value={this.state.email}
                        label="Email"
                        placeholder="example@email.com"
                        onChange={this.valueUpdater('email')}
                    />

                    <TextField
                        multiline
                        label="How did you hear about us?"
                        placeholder="Website, ads, email, etc."
                        value={this.state.autoGrow}
                        onChange={this.valueUpdater('autoGrow')}
                    />

                    <ChoiceList
                        allowMultiple
                        choices={choiceListItems}
                        selected={this.state.checkboxes}
                        onChange={this.valueUpdater('checkboxes')}
                    />

                    <Button primary>Submit</Button>
                </FormLayout>
            </Card>
        </Layout.AnnotatedSection>);
    }
}
