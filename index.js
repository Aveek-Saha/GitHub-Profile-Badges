const simpleIcons = require("simple-icons");
const { hexToRGB, brightness, generate, groupNames } = require("./utils");

var data = [];
var count = 0;

for (const title in simpleIcons) {
    const icon = simpleIcons.get(title);

    const rgb = hexToRGB(icon.hex);
    const br = brightness(...rgb);

    const titleNorm = icon.title;
    const logo = titleNorm.split(" ").join("-");
    const name = titleNorm.split("-").join("");
    const src = `https://img.shields.io/badge/${name}-${
        icon.hex
    }.svg?style=for-the-badge&logo=${logo}&logoColor=${
        br <= 0.69 ? "white" : "black"
    }`;
    const link = `\`${src}\``;
    count += 1;

    const iconData = [
        titleNorm,
        `[![Alt][${count}]][${count}]`,
        link,
        `[${count}]: ${encodeURI(src)}`,
    ];
    data.push(iconData);
}

const catData = groupNames(data);

generate(catData);

// console.log(data);
