/**
 * Custom validation utilities with descriptive error messages
 */
export class ValidationUtils {
    /**
     * Validate that a value contains expected text with descriptive error message
     */
    static expectToContain(actual: string, expected: string, context: string): void {
        if (!actual.includes(expected)) {
            throw new Error(`${context}: Expected text to contain '${expected}', but got: '${actual}'`);
        }
    }

    /**
     * Validate that a value equals expected value with descriptive error message
     */
    static expectToBe(actual: any, expected: any, context: string): void {
        if (actual !== expected) {
            throw new Error(`${context}: Expected value to be '${expected}', but got: '${actual}'`);
        }
    }

    /**
     * Validate that a value is greater than expected with descriptive error message
     */
    static expectToBeGreaterThan(actual: number, expected: number, context: string): void {
        if (actual <= expected) {
            throw new Error(`${context}: Expected value to be greater than ${expected}, but got: ${actual}`);
        }
    }

    /**
     * Validate that a value is defined with descriptive error message
     */
    static expectToBeDefined(actual: any, context: string): void {
        if (actual === undefined || actual === null) {
            throw new Error(`${context}: Expected value to be defined, but got: ${actual}`);
        }
    }

    /**
     * Validate that a boolean is true with descriptive error message
     */
    static expectToBeTrue(actual: boolean, context: string): void {
        if (actual !== true) {
            throw new Error(`${context}: Expected value to be true, but got: ${actual}`);
        }
    }

    /**
     * Validate that a boolean is false with descriptive error message
     */
    static expectToBeFalse(actual: boolean, context: string): void {
        if (actual !== false) {
            throw new Error(`${context}: Expected value to be false, but got: ${actual}`);
        }
    }

    /**
     * Validate that an array contains an item matching a condition with descriptive error message
     */
    static expectArrayToContain<T>(actual: T[], condition: (item: T) => boolean, context: string): void {
        if (!actual.some(condition)) {
            throw new Error(`${context}: Expected array to contain matching item, but no match found. Array contents: ${JSON.stringify(actual)}`);
        }
    }
}
