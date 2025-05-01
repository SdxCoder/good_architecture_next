// src/domains/todos/stores/todo-store.ts

import { create } from "zustand";
import { Todo } from '../entities/todo';
import { ApplicationFailure } from '@/src/shared/utils/failures';

interface TodoStoreState {
    todos: Todo[];
    isLoading: boolean;
    failure: ApplicationFailure | null;
    setTodos: (todos: Todo[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setFailure: (failure: ApplicationFailure | null) => void;
}

export const useTodoStore = create<TodoStoreState>((set) => ({
    todos: [],
    isLoading: false,
    failure: null,
    setTodos: (todos) => set({ todos }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setFailure: (failure) => set({ failure }),
}));