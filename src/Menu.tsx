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
        const menuItems = [
            { label: 'Sales', link: '/sales', icon: 'credit_card' },
            { label: 'Students', link: '/students', icon: 'school' },
            { label: 'Settings', link: '/settings', icon: 'settings' }
        ].map((item) => {
            return (
                <li key={item.link}> <a href={item.link}>
                    <i className="material-icons">{item.icon}</i> {item.label} </a>
                </li>
            )
        });


        return (
            <aside className={css['ui-app-frame__aside']}>
                <ul>
                    {menuItems}
                </ul>
            </aside>

        );
    }
}
