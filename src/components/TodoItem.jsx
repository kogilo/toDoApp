import React from 'react';
import './styles/TodoItem.css';

function TodoItem({ todo, dispatch, editingId, setEditingId, editingText, setEditingText }) {
  return (
    <li className="todo-item">
      {editingId === todo.id ? (
        <div>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button
            onClick={() => {
              dispatch({ type: 'EDIT_TODO', payload: { id: todo.id, title: editingText } });
              setEditingId(null);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: todo.id })}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => {
            setEditingId(todo.id);
            setEditingText(todo.title);
          }}>
            Edit
          </button>
          <button
            onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
            disabled={!todo.completed}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
