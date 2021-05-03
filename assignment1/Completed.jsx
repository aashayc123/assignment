import { useState } from "react";

export default function Completed (props) {
    const [inputValue, setValue ] = useState(props.task);
    
    const [mode, setMode] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    function checkClick(){
        props.movetodo();
    }

    function deleteClick(){
        props.deleteItem("completed",props.id);
    }

    function editClick() {
        if (mode === 'editMode') {
            props.saveItem(inputValue, props.id, "completed");
            setMode('');
        }
        else if(mode === '') {
            setMode('editMode');
        }
    }
    return(
        <div>
            <li className={mode}>
                <input type="checkbox" onClick={checkClick}/>
                <label>{props.task}</label>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button className="edit" onClick={editClick}>Edit</button>
                <button className="delete" onClick={deleteClick}>Delete</button>
            </li>
        </div>
    )
}