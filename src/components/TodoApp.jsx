import { useReducer, useState } from "react";
import TodoItem from "./TodoItem";
import '../styles/TodoApp.css'

const initialState = [
    {id: 1, title: "Reading books...", completed: false},
];

function todoReducer(state, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return [{ id: Date.now(), title: action.payload, completed: false }, ...state];
      case 'TOGGLE_COMPLETE':
        return state.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        );
      case 'DELETE_TODO':
        return state.filter(todo => todo.id !== action.payload);
      case 'EDIT_TODO':
        return state.map(todo =>
          todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
        );
      default:
        return state;
    }
  }
  
  function TodoApp() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [newTodo, setNewTodo] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');
  
    const handleAddTodo = () => {
      if (newTodo.trim()) {
        dispatch({ type: 'ADD_TODO', payload: newTodo });
        setNewTodo('');
      }
    };
  
    return (
      <div className="todo-app">
        <h1>Todo List</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
        <ul>
          {state.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              dispatch={dispatch}
              editingId={editingId}
              setEditingId={setEditingId}
              editingText={editingText}
              setEditingText={setEditingText}
            />
          ))}
        </ul>
      </div>
    );
  }
  
  export default TodoApp;