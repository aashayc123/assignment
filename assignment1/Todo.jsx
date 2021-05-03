import { useState } from 'react';

export default function Todo(props) {
    const [inputValue, setValue ] = useState(props.task);
    
    const [mode, setMode] = useState('null');

    function handleChange(e) {
        setValue(e.target.value);
    }

    function checkClick(){
        props.movetoCompleted();
    }

    function deleteClick(){
        props.deleteItem("todo",props.id);
    }

    function editClick() {
        if (mode === 'editMode') {
            props.saveItem(inputValue, props.id, "todo");
            setMode('null');
        }
        else if(mode === 'null') {
            setMode('editMode');
        }
    }

    return (
        <div> 
            <li className={mode}>
                <input type="checkbox" onClick={checkClick} />
                <label>{props.task}</label>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button className="edit" onClick={editClick}>Edit</button>
                <button className="delete" onClick={deleteClick}>Delete</button>
            </li>                 
        </div>
    )
}