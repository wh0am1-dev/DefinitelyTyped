// Type definitions for dotenv-flow 3.3
// Project: https://github.com/kerimdzhanov/dotenv-flow
// Definitions by: Vincent Langlet <https://github.com/vincentlanglet>
//                 Dan Kerimdzhanov <https://github.com/kerimdzhanov>
//                 James Greenleaf <https://github.com/aMoniker>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface DotenvListFilesOptions {
    /**
     * Node environment (development/test/production/etc,.).
     */
    node_env?: string | undefined;
}

/**
 * Returns a list of `.env*` filenames ordered by the env files priority from lowest to highest.
 *
 * @param dirname - path to `.env*` files' directory
 * @param options - `.env*` files listing options
 * @return a list of filenames for a given environment
 */
export function listFiles(dirname: string, options?: DotenvListFilesOptions): string[];

/**
 * Alias for `#listFiles` for backward compatibility.
 *
 * @param dirname - path to `.env*` files' directory
 * @param options - `.env*` files listing options
 * @return a list of filenames for a given environment
 */
export function listDotenvFiles(dirname: string, options?: DotenvListFilesOptions): string[];

export interface DotenvReadFileOptions {
    /**
     * Encoding for reading the `.env*` files.
     */
    encoding?: string | undefined;
}

export interface DotenvParseOutput {
    [name: string]: string;
}

/**
 * Parse a given file(s) to use the result programmatically.
 * When several filenames are given, the parsed variables are merged using the "overwrite" strategy.
 *
 * @param filenames - filename or a list of filenames to parse
 * @param options - `fs.readFileSync` options
 * @return the resulting map of `{ env_var: value }` as an object
 */
export function parse(filenames: string | string[], options?: DotenvReadFileOptions): DotenvParseOutput;

export interface DotenvLoadOptions extends DotenvReadFileOptions {
    silent?: boolean;
}

export interface DotenvLoadOutput {
    error?: Error | undefined;
    parsed?: DotenvParseOutput | undefined;
}

/**
 * Load variables defined in a given file(s) into `process.env`.
 *
 * @param filenames - filename or a list of filenames to load
 * @param options - `fs.readFileSync` options
 * @return an object with a `parsed` key containing the loaded content or an `error` key with an error that is occurred
 */
export function load(filenames: string | string[], options?: DotenvLoadOptions): DotenvLoadOutput;

/**
 * Unload variables defined in a given file(s) from `process.env`.
 *
 * @param filenames - filename or a list of filenames to unload
 * @param options - `fs.readFileSync` options
 */
export function unload(filenames: string | string[], options?: DotenvReadFileOptions): void;

export interface DotenvConfigOptions {
    /**
     * Node environment (development/test/production/etc,.).
     */
    node_env?: string | undefined;

    /**
     * Default node environment to use if `process.env.NODE_ENV` is not present.
     */
    default_node_env?: string | undefined;

    /**
     * Path to `.env*` files directory.
     */
    path?: string | undefined;

    /**
     * Encoding for reading the `.env*` files.
     */
    encoding?: string | null | undefined;

    /**
     * In some cases the original "dotenv" library can be used by one of the dependent npm modules.
     * It causes calling the original `dotenv.config()` that loads the `.env` file from your project before you can call `dotenv-flow.config()`.
     *
     * Such cases breaks `.env*` files priority because the previously loaded environment variables are treated as shell-defined thus having the higher priority.
     *
     * Setting the `purge_dotenv` option to `true` can gracefully fix this issue.
     */
    purge_dotenv?: boolean | undefined;

    /**
     * Suppress all console outputs except errors and deprecation warnings.
     */
    silent?: boolean | undefined;
}

/**
 * Main entry point into the "dotenv-flow". Allows configuration before loading `.env*` files.
 *
 * @param options - configuration options
 * @return an object with a `parsed` key containing the loaded content or an `error` key with an error that is occurred
 */
export function config(options?: DotenvConfigOptions): DotenvLoadOutput;

declare const DotenvFlow: {
    listFiles: typeof listFiles;
    parse: typeof parse;
    load: typeof load;
    unload: typeof unload;
    config: typeof config;
};

export default DotenvFlow;
