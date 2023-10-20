

import * as React from 'react';
import './loading.scss';
import { LoadingProps } from "./type";
import classNames from 'classnames';

export default class Loading extends React.PureComponent<LoadingProps, any>{

    render() {
        const { className } = this.props;
        return (
            <div className={classNames('flex-center loading_3', className)} >
            <div className="circle-border">
                <div className="circle-core"></div>
            </div>
        </div>
        )
    }

}