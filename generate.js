const fs = require('fs').promises;
const path = require('path');

const args = process.argv.slice(2); // Get arguments

if (args.length !== 1) {
	console.log("Please provide a name as an argument.");
	process.exit(-1);
}

const name = args[0].toLowerCase();

function toCamelCase(str) {
	return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

async function generateFrontend() {
	try {
		// Read the template file
		const template = await fs.readFile(path.resolve(__dirname, 'templates/template.html'), 'utf8');

		// Replace {{title}} with the name in the template
		const htmlContent = template.replace(/{{title}}/g, name);

		// Write the new HTML file
		await fs.writeFile(path.join(__dirname, `src/views/html/${name}.html`), htmlContent, 'utf8');

		// Create CSS and JS files
		await fs.writeFile(path.join(__dirname, `src/views/css/${name}.css`), '', 'utf8');
		await fs.writeFile(path.join(__dirname, `src/views/javascript/${name}.js`), '', 'utf8');

		console.log(`Frontend: Files ${name}.html, ${name}.css and ${name}.js have been created.`);
	} catch (err) {
		console.error(err);
	}
}

async function generateBackend() {
	try {
		const camelCaseName = toCamelCase(name);

		// Read the template files
		const controllerTemplate = await fs.readFile(path.resolve(__dirname, 'templates/template.controller.txt'), 'utf8');
		const routerTemplate = await fs.readFile(path.resolve(__dirname, 'templates/template.router.txt'), 'utf8');

		// Replace {{title}}, {{utitle}} and {{cutitle}} with the name in the template
		let controllerContent = controllerTemplate.replace(/{{title}}/g, name);
		controllerContent = controllerContent.replace(/{{utitle}}/g, camelCaseName);
		controllerContent = controllerContent.replace(/{{cutitle}}/g, capitalizeFirstLetter(camelCaseName));

		let routerContent = routerTemplate.replace(/{{title}}/g, name);
		routerContent = routerContent.replace(/{{utitle}}/g, camelCaseName);
		routerContent = routerContent.replace(/{{cutitle}}/g, capitalizeFirstLetter(camelCaseName));

		// Write the new controller and router files
		await fs.writeFile(path.join(__dirname, `src/controllers/${name}.controller.js`), controllerContent, 'utf8');
		await fs.writeFile(path.join(__dirname, `src/routes/${name}.router.js`), routerContent, 'utf8');

		console.log(`Backend: Files ${name}.controller.js and ${name}.router.js have been created.`);
	} catch (err) {
		console.log(err);
	}

}

async function linkRoutes() {
	try {
		const filename = path.join(__dirname, '/src/index.js');
		const camelCaseName = toCamelCase(name);
		const data = await fs.readFile(filename, 'utf8');

		// Add new router import
		let result = data.replace(
			"const cat = require('./routes/cat.router');",
			`const ${camelCaseName} = require('./routes/${name}.router');\nconst cat = require('./routes/cat.router');`
		);

		// Add new router usage
		result = result.replace(
			"// cat middlewares",
			`// ${name} middleware\napp.use('/${name}', ${camelCaseName});\n\n// cat middlewares`
		);

		await fs.writeFile(filename, result, 'utf8');
		console.log('New router added successfully');
	} catch (err) {
		console.error(err);
	}
}

async function main() {
	await generateFrontend();
	await generateBackend();
	await linkRoutes();
}

main()