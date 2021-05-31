const simpleIcons = require("simple-icons");

const { hexToRGB, luminance } = require("./utils");

const lumWhite = luminance(255, 255, 255);
var data = [];

for (const title in simpleIcons) {
    const icon = simpleIcons.get(title);

    const rgb = hexToRGB(icon.hex);
    const lumBg = luminance(...rgb);
    const ratio =
        lumBg > lumWhite
            ? (lumWhite + 0.05) / (lumBg + 0.05)
            : (lumBg + 0.05) / (lumWhite + 0.05);

    const iconData = {
        title: icon.title,
        slug: icon.slug,
        hex: icon.hex,
        icon: ratio < 1 / 3 ? "ffffff" : "000000"
    };
    data.push(iconData);
}

console.log(data);
