import React, {Component} from 'react';
import '../App.css';
import InputField from "./input-field";
import Lists from "./list";


export default class App extends Component{

    constructor(props){
      super(props);
      this.state = {
        todos: JSON.parse(localStorage.getItem("l")) || [],
        filter: "all",
      }
      
      this.addItem = this.addItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.doneItem = this.doneItem.bind(this);
      this.filterItems = this.filterItems.bind(this);
      this.changeFilterState = this.changeFilterState.bind(this);

      

      
      

      if(JSON.parse(localStorage.getItem('l')) == null){
        localStorage.setItem("l", JSON.stringify([]))
      }

      if(JSON.parse(localStorage.getItem("l")).length === 0){
        this.max = 1;
      } else {
        this.max = (JSON.parse(localStorage.getItem("l"))[JSON.parse(localStorage.getItem("l")).length-1].id) + 1;
      }
    }


    addItem(value){
      const newObj = {
        list: value,
        done: false,
        id: this.max++,
      }
      this.setState(({todos}) =>{
          const allItems = [...todos, newObj];
          localStorage.setItem("l", JSON.stringify(allItems));

          return{
            todos: allItems,      
          }
      })
    }



    deleteItem(id){
      this.setState(({todos}) =>{
        const index = todos.findIndex((item) => item.id === id);
        const before = todos.slice(0, index);
        const after = todos.slice(index+1)
        let newArr = [...before, ...after];
        localStorage.setItem("l", JSON.stringify(newArr));

        
        return{
          todos: newArr,
        }
      });
    }


    doneItem(id){
      this.setState(({todos}) =>{
        const index = todos.findIndex((item) => item.id === id);
        const old = todos[index];
        const newitem = {...old, done: !old.done};

        const before = todos.slice(0, index);
        const after = todos.slice(index+1)
        let newArr = [...before, newitem, ...after];
        localStorage.setItem("l", JSON.stringify(newArr));
        
        return{
          todos: newArr,
        }
      });
    }


    filterItems(selectValue, items){    

        if (selectValue === "completed"){
          return items.filter(item => item.done)
        } else if (selectValue === "uncompleted"){
          return items.filter(item => !item.done)
        }else {
          return items;
        }
    }


    changeFilterState(target){
      this.setState({
        filter: target,
      })
    }


  render(){

    const {todos, filter} = this.state;
    const visible = this.filterItems(filter, todos);
    return(
      <>
        <header>
           <h1>Fika's Todo List</h1>
        </header>
        <InputField  onAdd = {this.addItem} changeFilterState = {this.changeFilterState} />
        <Lists items = {visible} onDelete ={this.deleteItem} onDone = {this.doneItem}/>
      </>
    )
  }
}
