import React, { useState } from 'react';
import axios from 'axios';

const TodoList = ({ todos }) => {
    const [editingTodo, setEditingTodo] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');

    const handleEditClick = (todo) => {
        setEditingTodo(todo);
        setUpdatedTitle(todo.title); // Initialize the input with current title
    };

    const handleSaveClick = async () => {
        try {
            const updatedTodo = await axios.put(`/todos/${editingTodo._id}`, { title: updatedTitle });
            // Handle success (e.g., update state or refresh todos)
            console.log('Updated todo:', updatedTodo.data);
            setEditingTodo(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo._id}>
                    {editingTodo === todo ? (
                        <div>
                            <input
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                            />
                            <button onClick={handleSaveClick}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <span>{todo.title}</span>
                            <p>{todo.description}</p> {/* Display description */}
                            <button onClick={() => handleEditClick(todo)}>Edit</button>
                        </div>
                    )}
                    <button>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;