import React, { Component } from 'react';
import './Inventory.css';
import { InventoryItem, Skill } from '../DefaultCharacterSheets';
import Plus from '../Icons/Plus';
import IconButton from '../IconButton/IconButton';
import Save from '../Icons/Save';
import Trash from '../Icons/Trash';
import UnfocusHandler from '../UnfocusHandler/UnfocusHandler';


interface InventoryProps {
  items: InventoryItem[];
  updateItem: (index: number, item: InventoryItem) => void;
  deleteItem: (index: number) => void;
}

interface InventoryState {
  editingItemIndex: number;
  editingItemAmount?: string;
  editingItemName?: string;
}

class SkillBlock extends Component<InventoryProps, InventoryState> {
  constructor(props: InventoryProps) {
    super(props);

    this.state = {
      editingItemIndex: -1,
    }
  }

  saveEditingItem = () => {
    const updatedItem = this.props.items[this.state.editingItemIndex];
    if(this.state.editingItemAmount !== undefined) updatedItem.amount = this.state.editingItemAmount;
    if(this.state.editingItemName !== undefined) updatedItem.name = this.state.editingItemName;
    this.props.updateItem(this.state.editingItemIndex, updatedItem);
    this.discardEdits();
  }

  generateNewItem = (): InventoryItem => {
    return {
      name: "new",
      amount: "1"
    }
  }

  handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      this.saveEditingItem();
      return;
    }
    if (event.key === 'Escape') {
      this.discardEdits();
    }
  };

  discardEdits = () => {
    this.setState({editingItemIndex: -1, editingItemAmount: undefined, editingItemName: undefined});
  }

  createNewItem = () => {
    this.props.updateItem(this.props.items.length, this.generateNewItem());
  }

  render() {
    const { items } = this.props;

    return (
      <div className="Container">
        <div className="SkillCategoryHeader">
          <IconButton onClick={this.createNewItem}><Plus /></IconButton>
        </div>
        {items.map((item, index) => {
          return (
            <div key={index} className="InventoryItem">

               
              {this.state.editingItemIndex === index && this.state.editingItemAmount !== undefined ? 
                (
                  <div className={"InventoryItemAmount"}>
                    <UnfocusHandler
                      handleUnfocus={this.saveEditingItem}
                    >
                      <input 
                        autoFocus 
                        className="TransparentInput InputLeft"
                        value={this.state.editingItemAmount} 
                        onChange={(e) => {this.setState({editingItemAmount: e.target.value})}}
                        onKeyDown={this.handleKeyDown}>
                      </input>
                    </UnfocusHandler>
                    
                  </div>
                )
                :
                (
                  <div className={"InventoryItemAmount"}
                    onClick={() => {this.setState({editingItemIndex: index, editingItemAmount: this.props.items[index].amount})}}
                  >
                    <span ><b>{items[index].amount}</b></span>
                  </div>
                )
              }

              <div className={"InventoryItemName"}>
                {this.state.editingItemIndex === index && this.state.editingItemName !== undefined ? 
                  (
                    <div className={"InventoryItemNameEdit"}>
                      <UnfocusHandler
                        handleUnfocus={this.saveEditingItem}
                      >
                        <input 
                          autoFocus
                          className="TransparentInput InputLeft"
                          value={this.state.editingItemName} 
                          onChange={(e) => {this.setState({editingItemName: e.target.value})}}
                          onKeyDown={this.handleKeyDown}>
                        </input>
                      </UnfocusHandler>
                    </div>
                  )
                  :
                  (
                    <span onClick={() => {this.setState({editingItemIndex: index, editingItemName: this.props.items[index].name})}}>{items[index].name}</span>
                  )
                }
                
               </div>
               


              {this.state.editingItemIndex === index &&
                (
                  <IconButton onClick={(event: any) => {this.saveEditingItem(); event?.stopPropagation();}}><Save /></IconButton>
                )
              }
              <IconButton onClick={(event: any) => {this.props.deleteItem(index); event?.stopPropagation();}}><Trash /></IconButton>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SkillBlock;
