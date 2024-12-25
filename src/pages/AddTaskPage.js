
import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { addTask } from "../features/tasksSlice";

const AddTaskPage = () => {
    const [task, setTask] = useState("");
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (task.trim()) {
            dispatch(addTask(task));
            setTask("");
            console.log(task)
        }
    };

    return (
        <div>
            <h1>Add Task</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task"
            />
            <button onClick={handleAddTask}>Add</button>
        </div>
    );
};

export default AddTaskPage;