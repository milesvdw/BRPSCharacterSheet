import React, { Component } from 'react';
import './Collapsible.css'; // Import your CSS file
import CaretRight from '../Icons/CaretRight';
import CaretDown from '../Icons/CaretDown';
import IconButton from '../IconButton/IconButton';
import Plus from '../Icons/Plus';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  open?: boolean
}

interface CollapsibleState {
  isOpen: boolean;
}

class Collapsible extends Component<CollapsibleProps, CollapsibleState> {
  constructor(props: CollapsibleProps) {
    super(props);
    this.state = {
      isOpen: this.props.open !== undefined ? this.props.open : true,
    };
  }

  toggleCollapse = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { title, children } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <h2 className="toggle-button" onClick={this.toggleCollapse}>
            <IconButton onClick={() => {}}>{isOpen ? <CaretDown /> : <CaretRight />}</IconButton> {title}
        </h2>
        <div
          className="collapsible"
          style={{
            maxHeight: isOpen ? '1000px' : '0',
          }}
        >
          <div className="collapsible-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Collapsible;
