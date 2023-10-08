import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

export default function TaskApp() {
    const [tasks, setTasks] = useState(initialTasks)

    /* These event handlers can be moved into a reducer function,
       defined outside of the Component.

       Instead of setting state, they will dispatch an action to
       this component.
    */ 
    function handleAddTask(text) {

    }

    function handleChangeTask(task) {

    }

    function handleDeleteTask(taskId) {

    }

    return (
        <>
            <h1>Prague itinerary</h1>
            <AddTask onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onChangeTask={handleChangeTask}
                onDeleteTask={handleDeleteTask}
            />
        </>
    )
}

// Moved event handler logic to a single reducer function
function tasksReducer(tasks, action) {
    if (action.type === 'added') {
        return [
            ...tasks,
            {
                id: nextId++,
                text: text,
                done: false
            }
        ]
    } else if (action.type === 'changed') {
        return tasks.map((t) => {
            if (t.id === action.task.id) {
                return action.task
            } else {
                return t
            }
        })
    } else if (action.type === 'deleted') {
        return tasks.filter((t) => t.id !== action.id)
    } else {
        throw Error('Unknown action: ' + action.type)
    }
}

let nextId = 3
const initialTasks = [
    {id: 0, text: 'Visit Kafka Museum', done: true},
    {id: 1, text: 'Watch a puppet show', done: false},
    {id: 2, text: 'Lennon Wall pic', done: false},
]