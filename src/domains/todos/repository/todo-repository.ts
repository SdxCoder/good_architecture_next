import { Todo } from '../entities/todo';
import { Either } from '../../../shared/utils/either';
import { ApplicationFailure } from '../../../shared/utils/failures';

export abstract class TodoRepository {
    abstract getTodos(): Promise<Either<ApplicationFailure, Todo[]>>;
    abstract getTodo(id: string): Promise<Either<ApplicationFailure, Todo>>;
    abstract saveTodo(todo: Todo): Promise<Either<ApplicationFailure, Todo>>;
    abstract updateTodo(todo: Todo): Promise<Either<ApplicationFailure, Todo>>;
    abstract deleteTodo(id: string): Promise<Either<ApplicationFailure, void>>;
}