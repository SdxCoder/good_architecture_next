// src/domains/todos/services/TodoService.ts
import axios from 'axios';
import { TodoDto } from '../dtos/todo.dto';

const API_BASE_URL = '/api/todos';

export class TodoService {
    async getList(): Promise<TodoDto[]> {
        const response = await axios.get<TodoDto[]>(API_BASE_URL);
        return response.data;
    }

    async get(id: string): Promise<TodoDto> {
        const response = await axios.get<TodoDto>(`${API_BASE_URL}/${id}`);
        return response.data;
    }

    async update(todo: TodoDto): Promise<TodoDto> {
        const response = await axios.put<TodoDto>(`${API_BASE_URL}/${todo.id}`, todo);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }

    async save(todo: TodoDto): Promise<TodoDto> {
        const response = await axios.post<TodoDto>(API_BASE_URL, todo);
        return response.data;
    }
}