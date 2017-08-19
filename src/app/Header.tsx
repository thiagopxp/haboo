import * as React from "react";
import * as css from './Header.scss';

export default class Header extends React.Component<{}, {}> {
    
    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <header className={css['ui-app-frame__header']}>
                <div className={css['ui-top-bar']}></div>
            </header>
        );
    }
}
