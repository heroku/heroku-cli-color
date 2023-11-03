# Heroku CLI Color

heroku-cli-color`` is a command-line interface (CLI) tool for Heroku, a cloud platform for building, deploying, and managing applications. The project provides custom color options for the Heroku CLI using the chalk module.

## Installation

1. Clone the repository: `git clone https://github.com/heroku/heroku-cli-color.git`
2. Install dependencies: `yarn install`
3. Build the project: `yarn build`

## Usage

1. See example below

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b my-branch-name`
3. Make your changes and commit them: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-branch-name`
5. Submit a pull request

## Example
```
import { color } from './color';

console.log(color.attachment('This text is in cyan.'));
console.log(color.addon('This text is in yellow.'));
console.log(color.configVar('This text is in green.'));
console.log(color.release('This text is in blue and bold.'));
console.log(color.cmd('This text is in cyan and bold.'));
console.log(color.pipeline('This text is in green and bold.'));
console.log(color.app('This text is in magenta and prefixed with "⬢".'));
console.log(color.heroku('This text is in magenta.'));

const coloredText = color.app('My App');
console.log(`Welcome to ${coloredText}!`);
```
