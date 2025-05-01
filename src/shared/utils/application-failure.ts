// src/shared/utils/application-failure.ts

export class ApplicationFailure extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApplicationFailure';
    }
}

export class NetworkFailure extends ApplicationFailure {
    constructor(message = 'Network error occurred') {
        super(message);
        this.name = 'NetworkFailure';
    }
}

export class UnexpectedFailure extends ApplicationFailure {
    constructor(message = 'An unexpected error occurred') {
        super(message);
        this.name = 'UnexpectedFailure';
    }
}