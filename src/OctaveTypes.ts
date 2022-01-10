
export interface KeyAttribute<T> {
    C: T;
    CsDf: T;
    D: T;
    DsEf: T;
    E: T;
    F: T;
    FsGf: T;
    G: T;
    GsAf: T;
    A: T;
    AsBf: T;
    B: T;

    [key: string]: T;
}

export interface whiteKeyAttribute<T> {
    C: T;
    D: T;
    E: T;
    F: T;
    G: T;
    A: T;
    B: T;

    [key: string]: T;
}