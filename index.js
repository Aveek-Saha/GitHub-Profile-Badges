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

    const iconData = [
        icon.title,
        `	<img alt="Python" src="https://img.shields.io/badge/${icon.title}-${
            icon.hex
        }.svg?style=for-the-badge&logo=${icon.slug}&logoColor=${
            ratio < 1 / 3 ? "ffffff" : "000000"
        }"/>`,
    ];
    data.push(iconData);
}

function generate(data) {
    const config = {
        transforms: {
            BADGES() {
                return table([["Name", "Badge"], ...data]);
            },
        },
    };

    markdownMagic(path.join(__dirname, "README.md"), config, (d) => {
        console.log(`Added badges`);
    });
}

generate(data)

console.log(data);
