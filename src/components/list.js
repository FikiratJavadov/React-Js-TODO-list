import React, {Component} from 'react';


export default class Lists extends Component{


    render(){
        let {items, onDelete, onDone} = this.props;
      

        let finalList = items.map(({list, id, done}) =>{
            let clazz = done ?  "todo completed" : "todo";
            return (
                <div key={id} className={clazz}>
                    <li  className="todo-item">{list}</li>
                    <button onClick = {()=> onDone(id)} className="complete-btn">
                        <i className="fas fa-check"></i>
                    </button>
                    <button onClick={() => onDelete(id)} className="trash-btn">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            )
        })

       
        return(
            <div className="todo-container">
                <ul className="todo-list">
                    {finalList}
                </ul>
            </div>
        )
    }
}