// src/domains/todos/hooks/use-todo-hook.ts

import { TodoRepository } from '../repository/todo-repository';
import { useTodosQuery } from '../query/use-todo-query';

// Accepts a repository instance (injected for testability)
export function useTodosActions(repository: TodoRepository) {
    // Use React Query for fetching todos
    const { data: todos, isLoading, error, refetch } = useTodosQuery(repository);

    // You can add more actions (mutations) here later

    return {
        todos,
        isLoading,
        error,
        refetchTodos: refetch,
    };
}