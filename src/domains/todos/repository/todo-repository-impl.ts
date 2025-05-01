// src/domains/todos/repository/todo-repository-impl.ts

import { TodoRepository } from './todo-repository';
import { Todo } from '../entities/todo';
import { TodoService } from '../services/todo.service';
import { NetworkFailure, UnexpectedFailure } from '../../../shared/utils/application-failure';
import { TodoDto } from '../dtos/todo.dto';

function mapDtoToEntity(dto: TodoDto): Todo {
    return new Todo({ id: dto.id, title: dto.title, completed: dto.completed });
}

export class TodoRepositoryImpl extends TodoRepository {
    private service: TodoService;

    constructor(service: TodoService) {
        super();
        this.service = service;
    }

    async getTodos(): Promise<Todo[]> {
        try {
            const dtos = await this.service.getList();
            return dtos.map(mapDtoToEntity);
        } catch (error: any) {
            if (error.isAxiosError) throw new NetworkFailure(error.message);
            throw new UnexpectedFailure(error.message);
        }
    }

    async getTodo(id: string): Promise<Todo | null> {
        try {
            const dto = await this.service.get(id);
            return dto ? mapDtoToEntity(dto) : null;
        } catch (error: any) {
            if (error.isAxiosError) throw new NetworkFailure(error.message);
            throw new UnexpectedFailure(error.message);
        }
    }

    async saveTodo(todo: Todo): Promise<Todo> {
        try {
            const dto = await this.service.save(todo);
            return mapDtoToEntity(dto);
        } catch (error: any) {
            if (error.isAxiosError) throw new NetworkFailure(error.message);
            throw new UnexpectedFailure(error.message);
        }
    }

    async updateTodo(todo: Todo): Promise<Todo> {
        try {
            const dto = await this.service.update(todo);
            return mapDtoToEntity(dto);
        } catch (error: any) {
            if (error.isAxiosError) throw new NetworkFailure(error.message);
            throw new UnexpectedFailure(error.message);
        }
    }

    async deleteTodo(id: string): Promise<void> {
        try {
            await this.service.delete(id);
        } catch (error: any) {
            if (error.isAxiosError) throw new NetworkFailure(error.message);
            throw new UnexpectedFailure(error.message);
        }
    }
}