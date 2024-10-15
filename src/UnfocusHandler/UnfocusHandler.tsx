import React, { Component } from "react";

interface UnfocusHandlerProps {
    handleUnfocus: (event: any) => void
    children: any
}

class UnfocusHandler extends Component<UnfocusHandlerProps> {
  wrapperRef: any;

  constructor(props: UnfocusHandlerProps) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event: { target: any; }) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.handleUnfocus(event);
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}

export default UnfocusHandler;