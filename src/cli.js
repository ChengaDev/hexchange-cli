#!/usr/bin/env node

import arg from 'arg';
import inquirer from 'inquirer';
import { convert } from './main';

function parseArgumentsIntoOptions(rawArgs) {
	const args = arg(
		{
			'--action': String,
			'--value': String,
			'-a': '--action',
			'-v': '--value'
		},
		{
			argv: rawArgs.slice(2)
		}
	);

	return {
		action: args['--action'] || false,
		value: args['--value'] || false
	};
}

export async function promptForMissingOptions(options) {
	const defaultAction = 'RGB to Hex';
	if (options.action) {
		return {
			...options,
			actions: options.action || defaultAction
		};
	}

	const questions = [];
	if (!options.action) {
		questions.push({
			type: 'list',
			name: 'action',
			message: 'Please select which coversion you need',
			choices: ['Hex to RGB', 'RGB to Hex'],
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
