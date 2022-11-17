import React, { Component } from 'react';

export const asyncComponent = (importComponent: () => Promise<any>) => {
    return class extends Component<any, any> {
        constructor(){
            super("");
            this.state = {
                component: null
            }
        }
        componentDidMount() {
            importComponent().then((cmp: { default: any; }) => {
                this.setState({
                    component: cmp.default
                });
            });
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null
        }
    }
}