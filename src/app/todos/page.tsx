'use client';

import React, { useEffect } from 'react';
import { useTodosActions } from '@/src/domains/todos/hooks/use-todo-store';
import { useTodoStore } from '@/src/domains/todos/stores/todo-store';
import { TodoRepositoryImpl } from '@/src/domains/todos/repository/todo-repository-impl';
import { TodoService } from '@/src/domains/todos/services/todo.service';
import { TodoListItem } from '@/src/domains/todos/components/todo-list-item';

// Create repository instance (in real app, use DI or context)
const repository = new TodoRepositoryImpl(new TodoService());

export default function TodosListPage() {
    const { fetchTodos } = useTodosActions(repository);
    const todos = useTodoStore((state) => state.todos);
    const isLoading = useTodoStore((state) => state.isLoading);
    const failure = useTodoStore((state) => state.failure);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div className="max-w-lg mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Todos</h1>
            {isLoading && <div>Loading...</div>}
            {failure && (
                <div className="text-red-600 mb-2">
                    {failure.message}
                </div>
            )}
            <ul className="bg-white rounded shadow">
                {todos.map((todo) => (
                    <TodoListItem key={todo.id} todo={todo} />
                ))}
            </ul>
            {/* Floating Action Button */}
            <button
                className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-3xl"
                // onClick={() => router.push('/todos/add')} // To be implemented
                aria-label="Add Todo"
            >
                +
            </button>
        </div>
    );
}