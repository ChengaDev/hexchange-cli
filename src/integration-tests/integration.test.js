import { exec } from 'child_process';
import constants from '../constants';
import inquirer from 'inquirer';
import { promptForMissingOptions } from '../cli';

jest.mock('inquirer');

function cli(command, cwd) {
	return new Promise((resolve) => {
		exec(command, { cwd }, (error, stdout, stderr) => {
			resolve({
				code: error && error.code ? error.code : 0,
				error,
				stdout,
				stderr
			});
		});
	});
}

describe('hexchange cli intergration tests - with params', () => {
	it('should log out the result in rgb value', async () => {
		const result = await cli('hexchange -a htr -v "#111111"', '.');
		expect(result.stdout.trim()).toEqual('rgb(17,17,17)');
	});

	it('should log out rgb format error - missing hash', async () => {
		const result = await cli('hexchange -a htr -v "111111"', '.');
		expect(result.stdout.trim()).toEqual(constants.HEX_MISSING_HAS_ERR_MSG);
	});

	it('should log out rgb format error - invalid length', async () => {
		const result = await cli('hexchange -a htr -v "#1111111"', '.');
		expect(result.stdout.trim()).toEqual(constants.HEX_LENGTH_ERR_MSG);
	});

	it('should log out the result in hex value', async () => {
		const result = await cli('hexchange -a rth -v "rgb(17,17,17)"', '.');
		expect(result.stdout.trim()).toEqual('#111111');
	});

	it('should log out rgb format error', async () => {
		const result = await cli('hexchange -a rth -v "(17,17,17)"', '.');
		expect(result.stdout.trim()).toEqual(constants.RGB_WRONG_INPUT_FORMAT);
	});
});

describe('hexchange cli intergration tests - using inquirer', () => {
	it('should fulfill the options correctly', async () => {
		// Arrange
		const rgbValue = 'rgb(13,16,16)';
		inquirer.prompt = jest.fn().mockResolvedValue({ action: constants.RGB_TO_HEX_PRETTY, value: rgbValue });

		// Act
		const result = await promptForMissingOptions({});

		// Assert
		expect(result.action).toEqual(constants.RGB_TO_HEX_PRETTY);
		expect(result.value).toEqual(rgbValue);
	});
});
