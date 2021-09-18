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
		main.convert({ action: constants.HEX_TO_RGB, value: '#111' });

		// Assert
		expect(hexToRgbMock).toHaveBeenCalled();
	});

	it('should call hexToRgb in the action is "Hex to RGB"', () => {
		// Act
		main.convert({ action: constants.HEX_TO_RGB_PRETTY, value: '#111' });

		// Assert
		expect(hexToRgbMock).toHaveBeenCalled();
	});

	it('should call rgbToHex in the action is "rth"', () => {
		// Act
		main.convert({ action: constants.RGB_TO_HEX, value: 'rgb(17, 17, 17)' });

		// Assert
		expect(rgbToHexMock).toHaveBeenCalled();
	});

	it('should call rgbToHex in the action is "RGB to Hex"', () => {
		// Act
		main.convert({ action: constants.RGB_TO_HEX_PRETTY, value: 'rgb(17,17,17)' });

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

	it('should exit while there is valid action and no value', () => {
		// Act
		main.convert({ action: 'rth' });

		// Assert
		expect(rgbToHexMock).toHaveBeenCalledTimes(0);
		expect(hexToRgbMock).toHaveBeenCalledTimes(0);
		expect(processExitMock).toHaveBeenCalledTimes(1);
	});
});
