import React from 'react';
import './IconButton.css';

type IconButtonState = {
};

type IconButtonProps = {
    children: any
    disabled?: boolean
    tooltip?: string
    onClick: (event: any) => void
}

class IconButton extends React.Component<IconButtonProps, IconButtonState> {
    constructor(props: IconButtonProps) {
        super(props);

        this.state = {
        }
    }

     
    render() {
    
        return (
            <span title={this.props.tooltip} className={`IconContainer ${this.props.disabled && "Disabled"}`} onClick={this.props.disabled ? () => {} : this.props.onClick}>
                {this.props.children}
            </span>
        )
      }
}

export default IconButton;