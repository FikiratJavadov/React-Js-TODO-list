import React,{Component} from "react";


export default class InputField extends Component{
    constructor(props){
        super(props);

        this.state = {
            value: "",  
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
       

    }



        onChange(e){
            this.setState({
                value: e.target.value,
            })
        }

        onSubmit(e){
            e.preventDefault();
            this.props.onAdd(this.state.value);
            this.state.value = "";
        }   

        
        changeFilter(e){
            let target = e.target.value;
            this.props.changeFilterState(target);

        }
       
    

    render(){

        return(
        <form onSubmit = {this.onSubmit} >
             <input onChange = {this.onChange} value = {this.state.value} type="text" className="todo-input" />
            <button className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select onChange={this.changeFilter}  name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
        )
    }
}