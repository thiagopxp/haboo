import * as React from "react";
import HabooSdk from '@haboo/sdk';
import {config} from './config/config.dev';

export default class Menu extends React.Component<{}, {}> {
    
    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ul>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
            </ul>
                    
        );
    }
}
