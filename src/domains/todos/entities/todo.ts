export class Todo {
    public readonly id: string;
    public readonly title: string;
    public readonly completed: boolean;

    constructor(params: { id: string; title: string; completed: boolean }) {
        this.id = params.id;
        this.title = params.title;
        this.completed = params.completed;
        Object.freeze(this); // Ensures immutability at runtime
    }

    /**
     * Returns a new Todo instance with the provided fields replaced.
     */
    copyWith(params: Partial<{ id: string; title: string; completed: boolean }>): Todo {
        return new Todo({
            id: params.id ?? this.id,
            title: params.title ?? this.title,
            completed: params.completed ?? this.completed,
        });
    }
}