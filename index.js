const simpleIcons = require("simple-icons");
const fs = require("fs");
const path = require("path");

const { hexToRGB, brightness, generate, groupNames } = require("./utils");

var data = [];
var dataStore = {};
var count = 0;

for (const title in simpleIcons) {
    const icon = simpleIcons.get(title);

    const rgb = hexToRGB(icon.hex);
    const br = brightness(...rgb);

    const titleNorm = icon.title;
    let logo = titleNorm.split(" ").join("-");
    if (titleNorm.split("&").length > 1 || titleNorm.split(".").length > 1)
        logo = icon.slug;
    const name = titleNorm.split("-").join("");
    const src = `https://img.shields.io/badge/${name}-${
        icon.hex
    }.svg?style=for-the-badge&logo=${logo}&logoColor=${
        br <= 0.69 ? "white" : "black"
    }`;
    const link = `\`${src}\``;
    count += 1;

    dataStore[titleNorm] = {
        hex: icon.hex,
        src: src,
    };

    const iconData = [
        titleNorm,
        `[![Alt][${count}]][${count}]`,
        link,
        `[${count}]: ${encodeURI(src)}`,
    ];
    data.push(iconData);
}

try {
    fs.writeFileSync(
        path.join(__dirname, "data", "icons.json"),
        JSON.stringify(dataStore)
    );
} catch (err) {
    console.error(err);
}

const catData = groupNames(data);

generate(catData);

// console.log(data);
