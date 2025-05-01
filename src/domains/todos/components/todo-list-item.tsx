import React from 'react';
import { Todo } from '../entities/todo';

interface TodoListItemProps {
    todo: Todo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => (
    <li
        className={`flex items-center justify-between p-3 border-b ${todo.completed ? 'bg-green-50' : ''
            }`}
    >
        <span className={todo.completed ? 'line-through text-gray-400' : ''}>
            {todo.title}
        </span>
        {todo.completed && (
            <span className="text-xs text-green-600 font-semibold">Done</span>
        )}
    </li>
);