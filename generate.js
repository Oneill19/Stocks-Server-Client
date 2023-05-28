const fs = require('fs').promises;
const path = require('path');

const args = process.argv.slice(2); // Get arguments

if (args.length !== 1) {
    console.log("Please provide a name as an argument.");
    process.exit(-1);
}

const name = args[0];

async function generateFiles() {
    try {
        // Read the template file
        const template = await fs.readFile(path.resolve(__dirname, 'template.html'), 'utf8');

        // Replace {{title}} with the name in the template
        const htmlContent = template.replace(/{{title}}/g, name);

        // Write the new HTML file
        await fs.writeFile(path.join(__dirname, `src/views/html/${name}.html`), htmlContent, 'utf8');

        // Create CSS and JS files
        await fs.writeFile(path.join(__dirname, `src/views/css/${name}.css`), '', 'utf8');
        await fs.writeFile(path.join(__dirname, `src/views/javascript/${name}.js`), '', 'utf8');

        console.log(`Files ${name}.html, ${name}.css and ${name}.js have been created.`);
    } catch (err) {
        console.error(err);
    }
}

generateFiles();