#!/usr/bin/env node

import { Option, program } from 'commander';
import inquirer from 'inquirer';
import constants from './constants';
import { convert } from './main';

function parseArgumentsIntoOptions(rawArgs) {
	program.version('1.0.2');

	program
		.addOption(new Option('-a, --action <action>', 'sets the required convert action').choices(['htr', 'rth']))
		.option('-v, --value <value>', 'sets the value to convert')
		.helpOption('-h, --help', 'get more information about the options')
		.addHelpText(
			'after',
			`Example calls: \n\t$ hexchange -V\n\t$ hexchange -a <action> -v <value>\n\t$ hexchange --help\n`
		);

	program.parse(process.argv);

	return program.opts();
}

export async function promptForMissingOptions(options) {
	const defaultAction = constants.HEX_TO_RGB_PRETTY;

	const questions = [];
	if (!options.action) {
		questions.push({
			type: 'list',
			name: 'action',
			message: 'Please select which coversion you need',
			choices: [constants.HEX_TO_RGB_PRETTY, constants.RGB_TO_HEX_PRETTY],
			default: defaultAction
		});
	}

	if (!options.value) {
		questions.push({
			type: 'input',
			name: 'value',
			message: 'Please enter value to convert'
		});
	}

	const answers = await inquirer.prompt(questions);
	return {
		...options,
		action: options.action || answers.action,
		value: options.value || answers.value
	};
}

export async function cli(args) {
	let options = parseArgumentsIntoOptions(args);
	options = await promptForMissingOptions(options);
	convert(options);
}
