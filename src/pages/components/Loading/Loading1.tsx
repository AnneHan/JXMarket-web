
import * as React from 'react';
import './loading.scss'
import { LoadingProps } from "./type";
import classNames from 'classnames';

export default class Loading extends React.PureComponent<LoadingProps, any>{
    render() {
        const { className } = this.props;
        return (
            <div className={classNames('flex-center loading_1', className)} >
                <div className="pulse-container">
                    <div className="pulse-bubble pulse-bubble-1"></div>
                    <div className="pulse-bubble pulse-bubble-2"></div>
                    <div className="pulse-bubble pulse-bubble-3"></div>
                </div>
            </ div>
        )
    }
}
