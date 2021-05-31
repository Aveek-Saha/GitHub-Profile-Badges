const simpleIcons = require('simple-icons');

const { hexToRGB } = require('./utils')

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
console.log(hexToRGB(data[1].hex));
