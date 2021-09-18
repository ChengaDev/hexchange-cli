import chalk from 'chalk';
import constants from './constants';

const log = console.log;

export function hexToRgb(hex) {
	if (hex.indexOf('#') === -1) {
		log(chalk.red.bold(`\n${constants.HEX_MISSING_HAS_ERR_MSG}`));
		process.exit(1);
	}

	let numericValue = hex.replace('#', '');
	const { MAXIMUM_HEX_VALUE_LENGTH, MINIMUM_HEX_VALUE_LENGTH } = constants;

	// validate
	if (numericValue.length != MINIMUM_HEX_VALUE_LENGTH && numericValue.length != MAXIMUM_HEX_VALUE_LENGTH) {
		log(chalk.red.bold(`\n${constants.HEX_LENGTH_ERR_MSG}`));
		process.exit(1);
	}

	if (numericValue.length === MINIMUM_HEX_VALUE_LENGTH) {
		numericValue = numericValue.replace(/.{1,1}/g, '$&$&');
	}

	let rgb = numericValue.match(/.{1,2}/g);
	const { HEXADECIMAL_BASE } = constants;

	const red = parseInt(rgb[0], HEXADECIMAL_BASE);
	const green = parseInt(rgb[1], HEXADECIMAL_BASE);
	const blue = parseInt(rgb[2], HEXADECIMAL_BASE);

	const rgbResult = `rgb(${red},${green},${blue})`;

	log(chalk.blue.bold(rgbResult));
	return rgbResult;
}

export function rgbToHex(value) {
	let rgbValueRegularExpression = /^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/;

	let hexOutput = '#';
	let rgbInput = value;

	if (rgbValueRegularExpression.test(value)) {
		rgbInput = rgbInput.replace(/[rgb()]+/g, '') || rgbInput;
		rgbInput = rgbInput.split(',');
		let allRgbValuesAreValid = rgbInput.every((RgbValue) => {
			return parseInt(RgbValue) <= 255;
		});
		if (allRgbValuesAreValid) {
			rgbInput.forEach((rgb) => {
				value = parseInt(rgb).toString(constants.HEXADECIMAL_BASE);
				hexOutput += value.length === 1 ? `0${value}` : value;
			});
		}
	} else {
		log(chalk.red.bold(`\n${constants.RGB_WRONG_INPUT_FORMAT}`));
		process.exit(1);
	}

	log(chalk.bold.blue(hexOutput));
	return hexOutput;
}

export default {
	hexToRgb,
	rgbToHex
};
