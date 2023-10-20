import React from 'react';
import { CSSTransition } from 'react-transition-group';

interface MaskProps {
    show?: boolean;
    onClick?: Function
}
const DefaultProps = {
    show: false,
    onClick: () => { console.log('mask clicked') }
}

export default class Mask extends React.PureComponent<MaskProps & typeof DefaultProps, any>{

    static defaultProps = DefaultProps;

    render() {
        const { show, onClick } = this.props;
        return (
          <CSSTransition in={show} classNames={'mask'} timeout={500} unmountOnExit={true}>
            <div className="layout-mask flex-1" onClick={onClick}></div>
          </CSSTransition>
        )
    }
}