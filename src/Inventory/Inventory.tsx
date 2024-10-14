import React, { Component } from 'react';
import './Inventory.css';
import { InventoryItem, Skill } from '../DefaultCharacterSheets';
import Plus from '../Icons/Plus';
import IconButton from '../IconButton/IconButton';
import Save from '../Icons/Save';
import Trash from '../Icons/Trash';


interface InventoryProps {
  items: InventoryItem[];
  updateItem: (index: number, item: InventoryItem) => void;
  deleteItem: (index: number) => void;
}

interface InventoryState {
  editingItemIndex: number;
  editingItemAmount: string;
  editingItemName: string;
}

class SkillBlock extends Component<InventoryProps, InventoryState> {
  constructor(props: InventoryProps) {
    super(props);

    this.state = {
      editingItemName: "",
      editingItemIndex: -1,
      editingItemAmount: ""
    }
  }

  saveEditingItem = () => {
    const updatedItem = this.props.items[this.state.editingItemIndex];
    updatedItem.amount = this.state.editingItemAmount;
    updatedItem.name = this.state.editingItemName;
    this.props.updateItem(this.state.editingItemIndex, updatedItem);
    this.setState({editingItemIndex: -1})
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
    this.setState({editingItemIndex: -1});
  }

  createNewSkill = () => {
    this.props.updateItem(this.props.items.length, this.generateNewItem());
  }

  render() {
    const { items } = this.props;

    return (
      <div className="Container">
        <div className="SkillCategoryHeader">
          <IconButton onClick={this.createNewSkill}><Plus /></IconButton>
        </div>
        {items.map((item, index) => {
          return (
            <div key={index} className="InventoryItem"
              onClick={() => {this.setState({ editingItemIndex: index, editingItemAmount: items[index].amount, editingItemName: items[index].name})}}
            >

               
              {this.state.editingItemIndex === index ? 
                (
                  <div className={"InventoryItemAmount"}>
                    <input autoFocus 
                      value={this.state.editingItemAmount} 
                      onChange={(e) => {this.setState({editingItemAmount: e.target.value})}}
                      onKeyDown={this.handleKeyDown}>
                    </input>
                  </div>
                )
                :
                (
                  <div className={"InventoryItemAmount"}>
                    <span><b>{items[index].amount}</b></span>
                  </div>
                )
              }

              <div className={"InventoryItemName"}>
                {this.state.editingItemIndex === index ? 
                  (
                    <div className={"InventoryItemNameEdit"}>
                      <input autoFocus 
                        value={this.state.editingItemName} 
                        onChange={(e) => {this.setState({editingItemName: e.target.value})}}
                        onKeyDown={this.handleKeyDown}>
                      </input>
                    </div>
                  )
                  :
                  (
                    <span>{items[index].name}</span>
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
