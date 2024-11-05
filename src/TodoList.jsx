import React, {useState, useEffect} from 'react'
import styles from './TodoList.module.css'

function TodoList(){

    useEffect(() => {
        document.title = "Online To-Do List";
    }, []);

    const[tasks, setTasks] = useState(() => {
        const data = window.localStorage.getItem('todolistitems');
        if(data !== null) return JSON.parse(data);
        return [];
    });
    const[newTask, setNewTask] = useState('');

    useEffect(() => {
        const data = window.localStorage.getItem('todolistitems');
        if(data !== null) setTasks(JSON.parse(data));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('todolistitems', JSON.stringify(tasks))
    }, [tasks]);    

    function handleEnter(event){
        if(event.key === 'Enter'){
            addTask()
        }
    }

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function clearBox(){
        setNewTask('');
    }

    function empty(){
        setTasks([]);
        setNewTask('');
    }

    function addTask(){

        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask.charAt(0).toUpperCase() + newTask.slice(1)]);
            setNewTask('');
        }
    }

    function deleteTask(index){
        setTasks(t => t.filter((task, i) => i != index));
    }

    function moveTaskUp(index){

        if(index > 0){
            const updatedList = [...tasks];
            [updatedList[index], updatedList[index-1]] = 
            [updatedList[index-1], updatedList[index]];
            setTasks(updatedList);
        }
    }

    function moveTaskDown(index){

        if(index < tasks.length - 1){
            const updatedList = [...tasks];
            [updatedList[index], updatedList[index+1]] = 
            [updatedList[index+1], updatedList[index]];
            setTasks(updatedList);
        }
    }

    return(
        <>
            <div className={styles.todoList}>
                <div className={styles.headerBar}>
                    <h1 className={styles.title}>To-Do List</h1>
                    <div className={styles.inputField}>
                        <input className={styles.input}
                            type='text'
                            placeholder="Enter a task..."
                            value={newTask}
                            onChange={handleInputChange}
                            onKeyDown={handleEnter}
                        ></input>
                        <button className={styles.add}
                                onClick={addTask}>
                        Add</button>
                        <button className={styles.clear}
                                onClick={clearBox}>
                        C</button>
                        <button className={styles.empty}
                                onClick={empty}>
                        CLEAR ALL</button>
                    </div>
                </div>  
                <div>
                    <ul className={styles.unordered}>
                        {tasks.map((task, index) => 
                        <li key={index} className={styles.listItem}>
                            <span className={styles.text}>{task}</span>
                            <button className={styles.up}
                                    onClick={() => moveTaskUp(index)}>
                                ▲
                            </button>
                            <button className={styles.down}
                                    onClick={() => moveTaskDown(index)}>
                                ▼
                            </button>
                            <button className={styles.delete}
                                    onClick={() => deleteTask(index)}>
                                DELETE
                            </button>
                        </li>)}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default TodoList