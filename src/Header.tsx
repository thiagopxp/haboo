import * as React from "react";
import Menu from './Menu';


export default class Header extends React.Component<{}, {}> {
    
    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Menu />
        );
    }
}
