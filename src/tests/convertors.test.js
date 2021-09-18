import { hexToRgb, rgbToHex } from '../convertors';

const processExitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('convertors tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should convert from 6 digit hex to rgb', () => {
		// Arrange
		const hexValue = '#111111';

		// Act
		const result = hexToRgb(hexValue);

		// Assert
		expect(result).toBe('rgb(17,17,17)');
	});

	it('should convert from 3 digit hex to rgb', () => {
		// Arrange
		const hexValue = '#111';

		// Act
		const result = hexToRgb(hexValue);

		// Assert
		expect(result).toBe('rgb(17,17,17)');
	});

	it('should exit on wrong hex format - length', () => {
		// Arrange
		const hexValue = '#1111';

		// Act
		hexToRgb(hexValue);

		// Assert
		expect(processExitMock).toHaveBeenCalled();
	});

	it('should exit on wrong hex format - no hash', () => {
		// Arrange
		const hexValue = '111111';

		// Act
		hexToRgb(hexValue);

		// Assert
		expect(processExitMock).toHaveBeenCalled();
	});

	it('should convert from rgb to hex', () => {
		// Arrange
		const hexValue = 'rgb(17,17,17)';

		// Act
		const result = rgbToHex(hexValue);

		// Assert
		expect(result).toBe('#111111');
	});

	it('should exit on wrong rgb format', () => {
		// Arrange
		const hexValue = '(17,17,17)';

		// Act
		const result = rgbToHex(hexValue);

		// Assert
		expect(processExitMock).toHaveBeenCalled();
	});
});
