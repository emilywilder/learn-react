import { useEffect, useMemo, useState } from "react";
import ProfileComponent from "@/components/profiling";

function EffectTodoList({ todos, filter }) {
    const [newTodo, setNewTodo] = useState('');
  
    // 🔴 Avoid: redundant state and unnecessary Effect
    const [visibleTodos, setVisibleTodos] = useState([]);
    useEffect(() => {
      setVisibleTodos(getFilteredTodos(todos, filter));
    }, [todos, filter]);
    // ...
    return <RenderTodos todos={visibleTodos} />
}

function BlockingTodoList({ todos, filter }) {
    const [newTodo, setNewTodo] = useState('');
    // ✅ This is fine if getFilteredTodos() is not slow.
    const visibleTodos = getFilteredTodos(todos, filter);
    // ...
    return <RenderTodos todos={visibleTodos} />
}

function CachingTodoList({ todos, filter }) {
    const [newTodo, setNewTodo] = useState('');
    const visibleTodos = useMemo(() => {
      // ✅ Does not re-run unless todos or filter change
      return getFilteredTodos(todos, filter);
    }, [todos, filter]);
    // ...
    return <RenderTodos todos={visibleTodos} />
}

function RenderTodos({ todos }) {
    return (
        <ul>
            {todos.map(x => 
                <li key={x.id}>
                    {x.task}
                </li>
            )}
        </ul>
    )
}

function getFilteredTodos(todos, filter) {
    return todos.filter(filter)
}

export default function App() {
    const [filterName, setFilterName] = useState('Alice')
    const todos = [
        {
            id: 1,
            person: 'Alice',
            task: 'Clean living room'
        },
        {
            id: 2,
            person: 'Alice',
            task: 'Brush cat'
        },
        {
            id: 3,
            person: 'Bobbie',
            task: 'Clean bedroom'
        },
        {
            id: 4,
            person: 'Bobbie',
            task: 'Take out trash'
        }
    ]
    const filterTodos = (todo) => todo.person === filterName
    const props = { todos: todos, filter: filterTodos }
    return (
        <>
            <h1>Select a person:</h1>
            <select
                value={filterName}
                onChange={e => setFilterName(e.target.value)}
            >
                <option>Alice</option>
                <option>Bobbie</option>
            </select>
            <h2>{filterName}&apos;s Todos</h2>
            <ProfileComponent
                name="useEffect Todo List"
                Component={EffectTodoList}
                props={props}
            />
            <ProfileComponent
                name="Blocking Todo List"
                Component={BlockingTodoList}
                props={props}
            />
            <ProfileComponent
                name="Caching Todo List"
                Component={CachingTodoList}
                props={props}
            />
        </>
    )
}