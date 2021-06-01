const simpleIcons = require("simple-icons");
const path = require("path");
const table = require("markdown-table");
const markdownMagic = require("markdown-magic");
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

    // const iconData = {
    //     title: icon.title,
    //     slug: icon.slug,
    //     hex: icon.hex,
    //     icon: ratio < 1 / 3 ? "ffffff" : "000000"
    // };
    const logo = icon.title.split(" ").join("-");
    const name = icon.title.split("-").join("");
    const src = `https://img.shields.io/badge/${name}-${
        icon.hex
    }.svg?style=for-the-badge&logo=${logo}&logoColor=${
        lumBg < 0.69 ? "white" : "black"
    }`;
    const link = `<pre lang="html">${src}</pre>`

    const iconData = [`	<img alt="${icon.title}" src="${src}"/>`, link];
    data.push(iconData);
}

function generate(data) {
    const config = {
        transforms: {
            BADGES() {
                return table([["Badge", "Link"], ...data]);
            },
        },
    };

    markdownMagic(path.join(__dirname, "README.md"), config, (d) => {
        console.log(`Added badges`);
    });
}

generate(data);

// console.log(data);
