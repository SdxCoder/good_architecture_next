// src/domains/todos/hooks/use-fetch-todos.ts

import { useCallback } from 'react';
import { useTodoStore } from '../stores/todo-store';
import { TodoRepository } from '../repository/todo-repository';
import { ApplicationFailure } from '@/src/shared/utils/failures';

// Accepts a repository instance (injected for testability)
export function useTodosActions(repository: TodoRepository) {
    const setTodos = useTodoStore((state) => state.setTodos);
    const setIsLoading = useTodoStore((state) => state.setIsLoading);
    const setFailure = useTodoStore((state) => state.setFailure);

    const fetchTodos = useCallback(async () => {
        setIsLoading(true);
        setFailure(null);

        const result = await repository.getTodos();

        result.map(
            (fail) => setFailure(fail),
            (succ) => setTodos(succ),
        );

        setIsLoading(false);
    }, [repository, setTodos, setIsLoading, setFailure]);

    return { fetchTodos };
}