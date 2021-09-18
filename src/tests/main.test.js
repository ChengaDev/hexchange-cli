import main from '../main';
import constants from '../constants';
import convertors from '../convertors';

const rgbToHexMock = jest.spyOn(convertors, 'rgbToHex').mockImplementation(() => {});
const hexToRgbMock = jest.spyOn(convertors, 'hexToRgb').mockImplementation(() => {});
const processExitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});

describe('main tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call hexToRgb in the action is "htr"', () => {
		// Act
		main.convert({ action: constants.HEX_TO_RGB });

		// Assert
		expect(hexToRgbMock).toHaveBeenCalled();
	});

	it('should call hexToRgb in the action is "Hex to RGB"', () => {
		// Act
		main.convert({ action: constants.HEX_TO_RGB_PRETTY });

		// Assert
		expect(hexToRgbMock).toHaveBeenCalled();
	});

	it('should call rgbToHex in the action is "rth"', () => {
		// Act
		main.convert({ action: constants.RGB_TO_HEX });

		// Assert
		expect(rgbToHexMock).toHaveBeenCalled();
	});

	it('should call rgbToHex in the action is "RGB to Hex"', () => {
		// Act
		main.convert({ action: constants.RGB_TO_HEX_PRETTY });

		// Assert
		expect(rgbToHexMock).toHaveBeenCalled();
	});

	it('should call rgbToHex in the action is "RGB to Hex"', () => {
		// Act
		main.convert({ action: 'chenga' });

		// Assert
		expect(rgbToHexMock).toHaveBeenCalledTimes(0);
		expect(hexToRgbMock).toHaveBeenCalledTimes(0);
		expect(processExitMock).toHaveBeenCalledTimes(1);
	});
});
