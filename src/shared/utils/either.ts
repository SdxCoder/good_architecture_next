
// src/shared/utils/either.ts

export type Either<F, S> = Failure<F, S> | Success<F, S>;

export class Failure<F, S> {
    readonly value: F;
    readonly _tag: 'Failure' = 'Failure';

    constructor(value: F) {
        this.value = value;
        Object.freeze(this);
    }

    isFailure(): this is Failure<F, S> {
        return true;
    }

    isSuccess(): this is Success<F, S> {
        return false;
    }

    // Map both failure and success
    map<F2, S2>(onFailure: (f: F) => F2, onSuccess: (s: S) => S2): Either<F2, S2> {
        return new Failure<F2, S2>(onFailure(this.value));
    }

    fold<R>(onFailure: (e: F) => R, _: (t: S) => R): R {
        return onFailure(this.value);
    }

}

export class Success<F, S> {
    readonly value: S;
    readonly _tag: 'Success' = 'Success';

    constructor(value: S) {
        this.value = value;
        Object.freeze(this);
    }

    isFailure(): this is Failure<F, S> {
        return false;
    }

    isSuccess(): this is Success<F, S> {
        return true;
    }

    // Map both failure and success
    map<F2, S2>(onFailure: (f: F) => F2, onSuccess: (s: S) => S2): Either<F2, S2> {
        return new Success<F2, S2>(onSuccess(this.value));
    }

    // Apply a function to the value depending on whether it's Failure or Success
    fold<R>(_: (e: F) => R, onSuccess: (t: S) => R): R {
        return onSuccess(this.value);
    }

}

// Helper functions
export const failure = <F, S>(f: F): Either<F, S> => new Failure<F, S>(f);
export const success = <F, S>(s: S): Either<F, S> => new Success<F, S>(s);