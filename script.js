const searchInput = document.querySelector("#search-input"),
	searchColor = document.querySelector(".search-color"),
	searchImage = document.querySelector("#search-image"),
	typeSelect = document.querySelector("#palette-type"),
	typeText = document.querySelector("#type-text"),
	countSelect = document.querySelector("#palette-count"),
	randomBtn = document.querySelector("#random-btn"),
	paletteContainer = document.querySelector("#palette"),
	relatedContainer = document.querySelector("#related"),
	imageColorsContainer = document.querySelector("#image-colors"),
	imageColorsWrapper = document.querySelector(".image-colors-wrapper");

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
	if (type === "image-colors") {
		palette = imageColors;
	} else {
		palette = generatePalette(hsl, type, count);
	}
	palette.forEach((color) => {
		if (type != "image-colors") {
			color = HslToHex(color);
		}
		const colorEl = document.createElement("div");
		colorEl.classList.add("color");
		colorEl.style.backgroundColor = color;
		colorEl.innerHTML = `
			<div class="overlay">
				<div class="icons">
					<div class="copy-color" title="Copy Color Code">
						<i class="far fa-copy"></i>
					</div>
					<div class="generate-palette" title="Generate Palette">
						<i class="fas fa-palette"></i>
					</div>
				</div>
				<div class="code">${color}</div>
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

function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
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

typeSelect.addEventListener("change", (e) => {
	const value = e.target.value;
	currentType = value;
	typeText.innerHTML = value + " Palette";
	generatePaletteHTML(currentType, paletteContainer);
});

countSelect.addEventListener("change", (e) => {
	const value = e.target.value;
	currentCount = value;
	generatePaletteHTML(currentType, paletteContainer);
});

randomBtn.addEventListener("click", () => {
	const randomColor = getRandomColor();
	searchInput.value = randomColor;
	searchColor.style.backgroundColor = randomColor;
	currentColor = randomColor;
	generatePaletteHTML(currentType, paletteContainer);
	generatePaletteHTML("related", relatedContainer);
});

const palettes = document.querySelectorAll(".palette");
palettes.forEach((palette) => {
	palette.addEventListener("click", (e) => {
		const target = e.target;
		const color =
			target.parentElement.parentElement.children[1].textContent;
		if (target.classList.contains("copy-color")) {
			copyToClipboard(color);
			toast(`Color ${color} copied to clipboard`);
		}
		if (target.classList.contains("generate-palette")) {
			searchInput.value = color;
			searchColor.style.backgroundColor = color;
			currentColor = color;
			generatePaletteHTML(currentType, paletteContainer);
			generatePaletteHTML("related", relatedContainer);
			toast(`Palette generated for color ${color}`);
		}
	});
});

function copyToClipboard(text) {
	const input = document.createElement("input");
	input.value = text;
	document.body.appendChild(input);
	input.select();
	document.execCommand("copy");
	input.remove();
}

function toast(message) {
	const toast = document.createElement("div");
	toast.classList.add("toast");
	toast.textContent = message;
	document.body.appendChild(toast);
	setTimeout(() => {
		toast.classList.add("show");
	}, 10);
	setTimeout(() => {
		toast.classList.remove("show");
		toast.addEventListener("transitionend", () => {
			toast.remove();
		});
	}, 2000);
}
searchImage.addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			const image = new Image();
			image.src = reader.result;
			image.onload = function () {
				extractColorsFromImage(image);
			};
		};
	}
});

function extractColorsFromImage(image) {
	colorjs.prominent(image, { amount: 6, format: "hex" }).then((color) => {
		imageColors = [];
		imageColors.push(...color);
		generatePaletteHTML("image-colors", imageColorsContainer);
		imageColorsWrapper.classList.remove("hidden");
	});
}

const downloadBtn = document.querySelector("#download-btn"),
	downloadFormat = document.querySelector("#download-format"),
	downloadName = document.querySelector("#download-name");

downloadBtn.addEventListener("click", () => {
	const format = downloadFormat.value;
	let name = downloadName.value;
	name = name == "" ? "Palette" : name;
	downloadPalette(format, name);
});

function downloadPalette(format, name) {
	const palette = document.querySelector("#palette");
	const paletteColors = palette.querySelectorAll(".color");
	const colors = [];
	paletteColors.forEach((color) => {
		colors.push(color.style.backgroundColor);
	});
	switch (format) {
		case "png":
			downloadPaletteAsPng(colors, name);
			break;
		case "svg":
			downloadPaletteAsSvg(colors, name);
			break;
		case "css":
			downloadPaletteAsCss(colors, name);
			break;
		case "json":
			downloadPaletteAsJson(colors, name);
			break;
		default:
			break;
	}
}

function downloadPaletteAsPng(colors, name) {
	const canvas = document.createElement("canvas");
	canvas.width = colors.length * 200;
	canvas.height = 1000;
	const ctx = canvas.getContext("2d");
	colors.forEach((color, index) => {
		ctx.fillStyle = color;
		ctx.fillRect(index * 200, 0, 200, 1000);
	});
	const link = document.createElement("a");
	link.download = name + ".png";
	link.href = canvas.toDataURL();
	link.click();
}

function downloadPaletteAsSvg(colors, name) {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", "100%");
	svg.setAttribute("viewbox", "0 0 100 100");
	svg.setAttribute("preserveAspectRatio", "none");
	colors.forEach((color, index) => {
		const rect = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"rect"
		);
		const width = 100 / colors.length;
		rect.setAttribute("x", index * width);
		rect.setAttribute("y", 0);
		rect.setAttribute("width", width);
		rect.setAttribute("height", 100);
		rect.setAttribute("fill", color);
		svg.appendChild(rect);
	});

	const svgData = new XMLSerializer().serializeToString(svg);
	const svgBlob = new Blob([svgData], {
		type: "image/svg+xml;charset=utf-8",
	});
	const svgUrl = URL.createObjectURL(svgBlob);
	const downloadLink = document.createElement("a");
	downloadLink.download = name + ".svg";
	downloadLink.href = svgUrl;
	downloadLink.click();
}

function downloadPaletteAsCss(colors, name) {
	const css = `:root {
		${colors.map((color, index) => `--color-${index + 1}: ${color};`).join("\n")}
	}`;
	const blob = new Blob([css], { type: "text/css" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.download = name + ".css";
	link.href = url;
	link.click();
}

function downloadPaletteAsJson(colors, name) {
	const json = JSON.stringify(colors);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.download = name + ".json";
	link.href = url;
	link.click();
}

const toggle = document.querySelector("#toggle");

toggle.addEventListener("change", (e) => {
	if (e.target.checked) {
		document.body.classList.add("dark");
	} else {
		document.body.classList.remove("dark");
	}
});