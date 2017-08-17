import * as React from "react";
import HabooSdk from '@haboo/haboo-sdk';
import { config } from './config/config.dev';
import * as css from './Menu.scss';

export default class Menu extends React.Component<{}, {}> {

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <aside className={css['ui-app-frame__aside']}>
                <ul>
                    <li>Menu Item 1</li>
                    <li>Menu Item 2</li>
                </ul>
            </aside>

        );
    }
}
