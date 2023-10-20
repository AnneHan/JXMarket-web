
import * as React from 'react';
import './loading.scss';
import { LoadingProps } from "./type";
import classNames from 'classnames';

export default class Loading extends React.PureComponent<LoadingProps, any>{

    render() {
        const { className } = this.props;
        return (
            <div className={classNames('flex-center loading_4', className)} >
            <div id="load">
                    <div>G</div>
                    <div>N</div>
                    <div>I</div>
                    <div>D</div>
                    <div>A</div>
                    <div>O</div>
                    <div>L</div>
                </div>
        </div>
        )
    }

}