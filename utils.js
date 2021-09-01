const path = require("path");
const table = require("markdown-table");
const markdownMagic = require("markdown-magic");

module.exports = {
    hexToRGB(h) {
        let r = 0,
            g = 0,
            b = 0;
        r = parseInt(h[0] + h[1], 16);
        g = parseInt(h[2] + h[3], 16);
        b = parseInt(h[4] + h[5], 16);

        return [r, g, b];
    },
    brightness(r, g, b) {
        return +((r * 299 + g * 587 + b * 114) / 255000).toFixed(2);
    },
    generate(data) {
        const config = {
            transforms: {
                BADGES() {
                    var output = "";
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const element = data[key];
                            output += "<h2>" + element.letter + "</h2>\n\n";
                            var cols = element.names.map((el) => {
                                return "<br>" + el[1] + "<p>" + el[0] + "</p>";
                            });
                            var links = element.names.map((el) => {
                                return el[3] + "\n\n";
                            });
                            const newCols = [];
                            while (cols.length) newCols.push(cols.splice(0, 6));
                            output +=
                                table([...newCols], {
                                    align: ["c", "c", "c", "c", "c", "c"],
                                }) + "\n\n";

                            output += links.join("");
                        }
                    }
                    return output;
                },
            },
        };

        markdownMagic(path.join(__dirname, "badges", "README.md"), config, (d) => {
            console.log(`Added badges`);
        });
    },
    groupNames(arr) {
        const map = arr.reduce((acc, val) => {
            let char = val[0]
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .charAt(0)
                .toUpperCase();
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
    },
};
