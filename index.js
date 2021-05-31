const simpleIcons = require('simple-icons');

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
console.log(data);
