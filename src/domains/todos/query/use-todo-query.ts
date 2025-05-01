import { useQuery } from '@tanstack/react-query';
import { TodoRepository } from '../repository/todo-repository';
import { ApplicationFailure } from '@/src/shared/utils/failures';
import { Todo } from '../entities/todo';

export function useTodosQuery(repository: TodoRepository) {
    return useQuery<Todo[], ApplicationFailure>({
        queryKey: ['todos'],
        queryFn: async () => {
            const result = await repository.getTodos();
            return result.fold(
                (fail) => { throw fail; },
                (succ) => succ,
            );
        },
    });
}