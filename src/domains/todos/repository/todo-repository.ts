// src/domains/todos/repository/todo-repository.ts

import { Todo } from '../entities/todo';

export abstract class TodoRepository {
    abstract getTodos(): Promise<Todo[]>;
    abstract getTodo(id: string): Promise<Todo | null>;
    abstract saveTodo(todo: Todo): Promise<Todo>;
    abstract updateTodo(todo: Todo): Promise<Todo>;
    abstract deleteTodo(id: string): Promise<void>;
}