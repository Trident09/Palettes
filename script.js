const searchInput = document.querySelector("#search-input"),
	searchColor = document.querySelector(".search-color"),
	searchImage = document.querySelector("#search-image"),
	typeSelect = document.querySelector("#palette-type"),
	countSelect = document.querySelector("#palette-count"),
	randomBtn = document.querySelector("#random-btn"),
	paletteContainer = document.querySelector("#palette"),
	relatedContainer = document.querySelector("#related");

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

function generatePaletteHTML(type, container) {
	let color = currentColor;
	let count = currentCount;
	let hsl = getHslFromcolor(color);
	if (!hsl) {
		return;
	}
	let palette = [];
	container.innerHTML = "";
	palette = generatePalette(hsl, type, count);
	palette.forEach((color) => {
		color = HslToHex(color);
		const colorEl = document.createElement("div");
		colorEl.classList.add("color");
		colorEl.style.backgroundColor = color;
		colorEl.innerHTML = `
			<div class="overlay">
				<div class="icons">
					<div class="copy-color">
						<i class="far fa-copy"></i>
					</div>
					<div class="generate-palette">
						<i class="fas fa-palette"></i>
					</div>
				</div>
				<div class="code">
					${color}
				</div>
			</div>
		`;
		container.appendChild(colorEl);
	});
}

function getHslFromcolor(color) {
	let hsl;
	if (isValidColor(color)) {
		let temp = document.createElement("div");
		temp.style.color = color;
		document.body.appendChild(temp);
		let style = window.getComputedStyle(temp, null);
		let rgb = style.getPropertyValue("color");
		document.body.removeChild(temp);
		rgb = removeRGB(rgb);
		hsl = rbgToHsl(rgb);
		return hsl;
	}
}

function isValidColor(color) {
	return CSS.supports("color", color);
}

function removeRGB(rgb) {
	return rgb.replace("rgb(", "").replace(")", "").split(",");
}

function rbgToHsl(rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	let cmin = Math.min(r, g, b);
	let cmax = Math.max(r, g, b);
	let delta = cmax - cmin;
	let h = 0;
	let s = 0;
	let l = (cmax + cmin) / 2;

	if (delta == 0) {
		h = 0;
		s = 0;
	} else {
		if (cmax == r) {
			h = ((g - b) / delta) % 6;
		} else if (cmax == g) {
			h = (b - r) / delta + 2;
		} else {
			h = (r - g) / delta + 4;
		}
		h = Math.round(h * 60);
		if (h < 0) {
			h += 360;
		}
		s = delta != 0 ? delta / (1 - Math.abs(2 * l - 1)) : 0;
	}

	s = Math.round(s * 100);
	l = Math.round(l * 100);

	return [h, s, l];
}

function HslToHex(hsl) {
	let h = hsl[0];
	let s = hsl[1];
	let l = hsl[2];
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0");
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

generatePaletteHTML(currentType, paletteContainer);
generatePaletteHTML("related", relatedContainer);

searchInput.addEventListener("keyup", (e) => {
	const value = e.target.value;
	if (isValidColor(value)) {
		searchColor.style.backgroundColor = value;
		currentColor = value;
		generatePaletteHTML(currentType, paletteContainer);
		generatePaletteHTML("related", relatedContainer);
	}
});

