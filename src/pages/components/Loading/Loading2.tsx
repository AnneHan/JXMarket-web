

import * as React from 'react';
import './loading.scss';
import { LoadingProps } from "./type";
import classNames from 'classnames';

export default class Loading extends React.PureComponent<LoadingProps, any>{

    render() {
        const { className } = this.props;
        return (
            <div className={classNames('flex-center loading_2', className)} >
                <div className="configure-border-1">
                    <div className="configure-core"></div>
                </div>
                <div className="configure-border-2">
                    <div className="configure-core"></div>
                </div>
            </div>
        )
    }

}