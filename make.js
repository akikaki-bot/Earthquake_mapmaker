const d3 = require('d3');
const jsdom = require('jsdom');
const geoJson = require('./japan.geo.json')
const { JSDOM } = jsdom;

const document = new JSDOM().window.document;
const size = {
  width: 900,
  height: 1200
};
const svg = d3.select(document.body)
              .append('svg')
              .attr("xmlns",'http://www.w3.org/2000/svg')
              .attr('width', size.width)
              .attr('height', size.height)
              .style('background-color', "#363b44");

              svg
              .data(geoJson["features"])
              .enter().append(`path`)
              .attr(`d`, path)
              .attr(`stroke`, `#666`)
              .attr(`stroke-width`, 0.25)
              .attr(`fill`, `#2566CC`)
              .attr(`fill-opacity`, (item) => {
                return Math.random();
              })

console.log(document.body.innerHTML)