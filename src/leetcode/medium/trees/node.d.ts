declare module 'node' {
    export interface Path {
        resolve(path: string): void;
        relative(path: string): void;
    }
}