const simpleIcons = require('simple-icons');

const { hexToRGB, luminance } = require('./utils')

const lumWhite = luminance(255,255,255)
var data = []

for (const title in simpleIcons) {
    const icon = simpleIcons.get(title);
    const iconData = {
        title: icon.title,
        slug: icon.slug,
        hex: icon.hex
    }
    data.push(iconData)
}
var rgb = hexToRGB(data[1].hex)
var lumBg = luminance(...rgb)
const ratio = lumBg > lumWhite 
    ? ((lumWhite + 0.05) / (lumBg + 0.05))
    : ((lumBg + 0.05) / (lumWhite + 0.05));
console.log(ratio < 1/3 ? 'ffffff' : '000000');
