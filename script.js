const searchInput = document.querySelector(".search-input"),
	searchColor = document.querySelector(".search-color"),
	searchImage = document.querySelector("#search-image"),
	typeSelect = document.querySelector("#palette-type"),
	countSelect = document.querySelector("#palette-count"),
	randomBtn = document.querySelector("#random-btn"),
	paletteContainer = document.querySelector("#palette"),
	relatedConatiner = document.querySelector("#related");

let currentColor = "skyblue",
	currentType = "analogous",
	currentCount = 6,
	imageColors = [];

function generateAnalogousPalette(hsl, count) {
	const palette = [];
	let [hue, saturation, lightness] = hsl;

	for (let i = 0; i < count; i++) {
		let newHue = hue + 30 * i;
		if (newHue > 360) {
			newHue -= 360;
		}
		palette.push([newHue, saturation, lightness]);
	}
	return palette;
}

function generateMonochromaticPalette(hsl, count) {
	const palette = [];
	let [hue, saturation, lightness] = hsl;

	for (let i = 0; i < count; i++) {
		let newLightness = lightness + 10 * i;
		if (newLightness > 100) {
			newLightness -= 100;
		}
		palette.push([hue, saturation, newLightness]);
	}
	return palette;
}

function generateTriadicPalette(hsl, count) {
	const palette = [];
	let [hue, saturation, lightness] = hsl;

	for (let i = 0; i < count; i++) {
		let newHue = hue + 120 * i;
		if (newHue > 360) {
			newHue -= 360;
		}
		palette.push([newHue, saturation, lightness]);
	}
	return palette;
}

function generateCompoundPalette(hsl, count) {
	const palette = [];
	let [hue, saturation, lightness] = hsl;

	for (let i = 0; i < count; i++) {
		let newHue = hue + 150 * i;
		if (newHue > 360) {
			newHue -= 360;
		}
		palette.push([newHue, saturation, lightness]);
	}
	return palette;
}

function generateShadesPalette(hsl, count) {
	const palette = [];
	let [hue, saturation, lightness] = hsl;

	for (let i = 0; i < count; i++) {
		let newSaturation = saturation + 10 * i;
		if (newSaturation > 100) {
			newSaturation -= 100;
		}
		palette.push([hue, newSaturation, lightness]);
	}
	return palette;
}

function generateTetradicPalette(hsl, count) {
	const palette = [];
	let [hue, saturation, lightness] = hsl;

	for (let i = 0; i < count; i++) {
		let newHue = hue + 90 * i;
		if (newHue > 360) {
			newHue -= 360;
		}
		palette.push([newHue, saturation, lightness]);
	}
	return palette;
}

function generateSquarePalette(hsl, count) {
	const palette = [];
	let [hue, saturation, lightness] = hsl;

	for (let i = 0; i < count; i++) {
		let newHue = hue + 60 * i;
		if (newHue > 360) {
			newHue -= 360;
		}
		palette.push([newHue, saturation, lightness]);
	}
	return palette;
}

function generateRelatedPalette(hsl, count) {
	const palette = [];
	let [hue, saturation, lightness] = hsl;

	palette.push([hue, (saturation + 20) % 100, lightness]);
	palette.push([hue, (saturation - 20) % 100, lightness]);
	palette.push([hue, saturation, (lightness + 20) % 100]);
	palette.push([hue, saturation, (lightness - 20) % 100]);
	palette.push([(hue + 20) % 360, saturation, lightness]);
	palette.push([(hue - 20) % 360, saturation, lightness]);

	for (let i = palette.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[palette[i], palette[j]] = [palette[j], palette[i]];
	}
	return palette;
}

function generatePalette(hsl, type, count) {
	switch (type) {
		case "analogous":
			return generateAnalogousPalette(hsl, count);
		case "monochromatic":
			return generateMonochromaticPalette(hsl, count);
		case "triadic":
			return generateTriadicPalette(hsl, count);
		case "compound":
			return generateCompoundPalette(hsl, count);
		case "shades":
			return generateShadesPalette(hsl, count);
		case "tetradic":
			return generateTetradicPalette(hsl, count);
		case "square":
			return generateSquarePalette(hsl, count);
		case "related":
			return generateRelatedPalette(hsl, count);
	}
}
