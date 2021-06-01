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
    luminance(r, g, b) {
        // var a = [r, g, b].map(function (v) {
        //     v /= 255;
        //     return v <= 0.03928
        //         ? v / 12.92
        //         : Math.pow((v + 0.055) / 1.055, 2.4);
        // });
        // return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        return +((r * 299 + g * 587 + b * 114) / 255000).toFixed(2)
    },
};
