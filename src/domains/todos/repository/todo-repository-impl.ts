import { TodoRepository } from './todo-repository';
import { Todo } from '../entities/todo';
import { TodoService } from '../services/todo.service';
import { ApplicationFailure, NetworkFailure, NotFoundFailure, UnexpectedFailure } from '../../../shared/utils/failures';
import { TodoDto } from '../dtos/todo.dto';
import { Either, failure, success } from '../../../shared/utils/either';

function mapDtoToEntity(dto: TodoDto): Todo {
    return new Todo({ id: dto.id, title: dto.title, completed: dto.completed });
}

export class TodoRepositoryImpl extends TodoRepository {
    private service: TodoService;

    constructor(service: TodoService) {
        super();
        this.service = service;
    }

    async getTodos(): Promise<Either<ApplicationFailure, Todo[]>> {
        try {
            const dtos = await this.service.getList();
            return success(dtos.map(mapDtoToEntity));
        } catch (error: any) {
            if (error.isAxiosError) return failure(new NetworkFailure(error.message));
            return failure(new UnexpectedFailure(error.message));
        }
    }

    async getTodo(id: string): Promise<Either<ApplicationFailure, Todo>> {
        try {
            const dto = await this.service.get(id);
            if (!dto) return failure(new NotFoundFailure());
            return success(mapDtoToEntity(dto));
        } catch (error: any) {
            if (error.isAxiosError) return failure(new NetworkFailure(error.message));
            return failure(new UnexpectedFailure(error.message));
        }
    }

    async saveTodo(todo: Todo): Promise<Either<ApplicationFailure, Todo>> {
        try {
            const dto = await this.service.save(todo);
            return success(mapDtoToEntity(dto));
        } catch (error: any) {
            if (error.isAxiosError) return failure(new NetworkFailure(error.message));
            return failure(new UnexpectedFailure(error.message));
        }
    }

    async updateTodo(todo: Todo): Promise<Either<ApplicationFailure, Todo>> {
        try {
            const dto = await this.service.update(todo);
            return success(mapDtoToEntity(dto));
        } catch (error: any) {
            if (error.isAxiosError) return failure(new NetworkFailure(error.message));
            return failure(new UnexpectedFailure(error.message));
        }
    }

    async deleteTodo(id: string): Promise<Either<ApplicationFailure, void>> {
        try {
            await this.service.delete(id);
            return success(undefined);
        } catch (error: any) {
            if (error.isAxiosError) return failure(new NetworkFailure(error.message));
            return failure(new UnexpectedFailure(error.message));
        }
    }
}