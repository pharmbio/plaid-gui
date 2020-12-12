const generateHslHues = (amount) => {
  let colors = [];
  let huedelta = Math.trunc(360 / amount);

  for (let i = 0; i < amount; i++) {
    let hue = i * huedelta;
    colors.push(hue);
    /* colors.push(`hsl(${hue},${saturation}%,${lightness}%,)`); */
  }
  return colors;
};
export default generateHslHues;
