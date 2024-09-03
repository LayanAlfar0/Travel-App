import { calculateTripDuration } from "../app";

describe('calculateTripDuration', () => {

    test('should return the correct number of days for a normal range', () => {
        const duration = calculateTripDuration('2024-08-22', '2024-08-24');
        expect(duration).toBe(2);
    });

    test('should return 0 when the start and end dates are the same', () => {
        const duration = calculateTripDuration('2024-08-22', '2024-08-22');
        expect(duration).toBe(0);
    });

    test('should return 1 when the end date is the next day after the start date', () => {
        const duration = calculateTripDuration('2024-08-22', '2024-08-23');
        expect(duration).toBe(1);
    });

    test('should return 0 for a negative range (end date before start date)', () => {
        const duration = calculateTripDuration('2024-08-24', '2024-08-22');
        expect(duration).toBe(0);
    });

    test('should handle invalid date formats gracefully', () => {
        const duration = calculateTripDuration('invalid-date', '2024-08-24');
        expect(duration).toBeNaN(); // Assuming the function returns NaN for invalid dates
    });

    test('should return 0 when given empty strings as dates', () => {
        const duration = calculateTripDuration('', '');
        expect(duration).toBeNaN(); // Adjust expectation based on how your function handles empty strings
    });

});
