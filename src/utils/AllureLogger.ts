import allure from '@wdio/allure-reporter';

/**
 * @function allureLogger - Function to display relevant information in Allure report steps.
 * Use this function to replace console.log statements.
 * @param {string} message Text message to display in Allure report
 * @param {any} value Optional - Value to display in Allure report
 */
export const allureLogger = (message: string, value?: any) => {
    try {
        // Simple approach - just add step
        const stepName = value === undefined || !value ? message : `${message} ▶️ ${JSON.stringify(value)}`;
        allure.addStep(stepName);
        
        // Also log to console for debugging
        console.log(`[Allure Step] ${stepName}`);
    } catch (error) {
        console.log(`[Allure Error] ${message}${value ? ` ▶️ ${JSON.stringify(value)}` : ''}`);
    }
}
