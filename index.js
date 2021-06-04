const simpleIcons = require("simple-icons");
const path = require("path");
const table = require("markdown-table");
const markdownMagic = require("markdown-magic");
const { hexToRGB, luminance } = require("./utils");

const lumWhite = luminance(255, 255, 255);
var data = [];
var count = 0;

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
    const titleNorm = icon.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    const logo = titleNorm.split(" ").join("-");
    const name = titleNorm.split("-").join("");
    const src = `https://img.shields.io/badge/${name}-${
        icon.hex
    }.svg?style=for-the-badge&logo=${logo}&logoColor=${
        lumBg < 0.69 ? "white" : "black"
    }`;
    const link = `\`${src}\``;
    count += 1;

    const iconData = [
        titleNorm,
        `[![Alt][${count}]][${count}]`,
        // `<a href="${src}"><img src="${src}"/></a>`,
        link,
        `[${count}]: ${encodeURI(src)}`
    ];
    data.push(iconData);
}

const groupNames = (arr) => {
    const map = arr.reduce((acc, val) => {
        let char = val[0].charAt(0).toUpperCase();
        let alpha = /^[a-zA-Z]+$/;
        if (!char.match(alpha)) char = "#";
        if (!acc[char]) acc[char] = [];
        else acc[char].push(val);
        return acc;
    }, {});
    const res = Object.keys(map).map((el) => ({
        letter: el,
        names: map[el],
    }));
    return res;
};

const catData = groupNames(data);
// console.log(groupNames(data));

function generate(data) {
    const config = {
        transforms: {
            BADGES() {
                var output = "";
                for (const key in catData) {
                    if (Object.hasOwnProperty.call(catData, key)) {
                        const element = catData[key];
                        output += "<h1>" + element.letter + "</h1>\n\n";
                        // "</h1>\n\n<details><summary>Click to expand!</summary> \n\n";
                        var cols = element.names.map((el) => {
                            // return [el[1], el[2]];
                            return "<br>" + el[1] + "<p>" + el[0] + "</p>";
                        });
                        var links = element.names.map((el) => {
                            // return [el[1], el[2]];
                            return el[3] + "\n\n";
                        });
                        const newCols = [];
                        while (cols.length) newCols.push(cols.splice(0, 6));
                        output +=
                            table([...newCols], {
                                align: ["c", "c", "c", "c", "c", "c"],
                            }) + "\n\n";

                        output += links.join("")

                        // + "\n\n</details>\n\n";
                        // console.log(cols);
                    }
                }
                return output;
            },
        },
    };

    markdownMagic(path.join(__dirname, "README.md"), config, (d) => {
        console.log(`Added badges`);
    });
}

generate(data);

// console.log(data);
