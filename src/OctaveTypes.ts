import { NonFunctionKeys } from "utility-types"

type KeyType = "C" | "CD" | "D" | "DE" | "E" | "F" | "FG" | "G" | "GA" | "A" | "AB" | "B";

export interface KeyAttribute<T> {
    C: T;
    CD: T;
    D: T;
    DE: T;
    E: T;
    F: T;
    FG: T;
    G: T;
    GA: T;
    A: T;
    AB: T;
    B: T;
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