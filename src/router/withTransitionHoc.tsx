import React from 'react'
import { CSSTransition } from 'react-transition-group'

/**
 * 组件加载动画 HOC
 * @param WrapperComponent
 * @returns
 */
const withTransition = WrapperComponent => {
  return class extends React.Component {
    constructor() {
      // @ts-ignore
      super()
      this.state = {
        show: false,
      }
    }
    componentDidMount(): void {
      this.setState({ show: true })
    }
    componentWillUnmount(): void {
      this.setState({ show: false })
    }

    render() {
      return (
        <CSSTransition
          // @ts-ignore
          in={this.state.show}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          <WrapperComponent {...this.props} />
        </CSSTransition>
      )
    }
  }
}

export default withTransition
