import chalk from 'chalk';
import constants from './constants';
import convertors from './convertors';
const log = console.log;

export function convert(options) {
	if (options.action === constants.RGB_TO_HEX_PRETTY || options.action === constants.RGB_TO_HEX) {
		convertors.rgbToHex(options.value);
	} else if (options.action === constants.HEX_TO_RGB_PRETTY || options.action === constants.HEX_TO_RGB) {
		convertors.hexToRgb(options.value);
	} else {
		log(chalk.red.bold(constants.INVALID_CONVERSION_ACTION));
		process.exit(1);
	}
}

export default { convert };
