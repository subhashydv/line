const fs = require('fs');

class Style {
  constructor() {
    this.styles = [];
  }

  generateStyle() {
    return this.styles.map((x) => x.join(': '));
  }
  addStyles(property, value) {
    this.styles.push([property, value]);
  }
}

class Line {
  constructor(slope, intercept) {
    this.slope = slope;
    this.intercept = intercept;
  }

  yPoint(x) {
    return this.slope * x + this.intercept;
  }

  coordinate(x) {
    return { x, y: this.yPoint(x) };
  }

  toHtml(x) {
    const coordinate = this.coordinate(x);
    const styles = new Style();

    styles.addStyles('height', '2px');
    styles.addStyles('width', '2px');
    styles.addStyles('position', 'absolute');
    styles.addStyles('background-color', 'black');
    styles.addStyles('left', `${coordinate.x}`);
    styles.addStyles('top', `${coordinate.y}`);

    const html = styles.generateStyle().join(';');
    return `<div style="${html}"></div>`;
  }
}

const xAxis = (length, pix) => Array(length).fill(pix).map((x, i) => x * i);

const line = (length, slope, intercept) => {
  const slopedLine = new Line(slope, intercept);
  const angle = Math.atan(slope);
  const pix = (Math.cos(angle) * length) / 100;
  const bottomAxis = xAxis(length, pix);
  const html = bottomAxis.map((x) => slopedLine.toHtml(x));

  const defaultStyle = 'style = "position:absolute;top :300px;left:700px"';
  return `<div ${defaultStyle}>${html.join('')}</div>`;
}

fs.writeFileSync('./line.html', line(150, 0, 0), 'utf8');
