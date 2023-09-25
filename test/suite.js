const assert = require('node:assert').strict;
const { promises: fs } = require('fs');

const pjs = require('..');

describe("Basic bundling", () => {
	before(async () => {
		await fs.rm(__dirname + '/output', { recursive: true, force: true });
		await fs.mkdir(__dirname + '/output', { recursive: true });
	});
	it("bundles independent files", async () => {
		const inputs = [__dirname + '/js/sample1.js', __dirname + '/js/sample2.js'];
		const output = __dirname + '/output/sample.js';
		await pjs(
			inputs,
			output,
			{}
		);
		const result = await fs.readFile(output);
		assert.equal(result.toString(), `document.addEventListener("coco",function(n){n.type+=1,console.log(n)}),document.addEventListener("caca",function(n){console.log(n)});`);
	});

	it("bundles with async support", async () => {
		const inputs = [__dirname + '/js/sample3.js'];
		const output = __dirname + '/output/sample3.js';
		await pjs(
			inputs,
			output,
			{ browsers: "supports async-functions and not dead and not firefox < 53" }
		);
		const result = await fs.readFile(output);
		assert.equal(result.toString(), `document.addEventListener("coco",async e=>{console.log(await fetch("/test"))});`);
	});
});

