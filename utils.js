module.exports = {
  hexToRGB(h) {
    let r = 0,
      g = 0,
      b = 0;
    r = h[1] + h[2];
    g = h[3] + h[4];
    b = h[5] + h[6];

    return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16)
      };
  },
};
