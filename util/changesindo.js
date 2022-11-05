const svgexport = require('svgexport');


class Util {
    changesindo(sindo){
        switch(sindo){
            case 10: return "#778899"
            case 20: return "#4682b4"
            case 30: return "#008000"
            case 40: return "#ffd700"
            case 45: return "#ffa500"
            case 50: return "#d2691e"
            case 55: return "#800000"
            case 60: return "#b22222"
            case 70: return "#4b0082"
            default: return "#FFFFFF"
        }
    }

    changesindotosindoname(sindo){
        switch(sindo){
            case 10: return "1"
            case 20: return "2"
            case 30: return "3"
            case 40: return "4"
            case 45: return "5弱"
            case 50: return "5強"
            case 55: return "6弱"
            case 60: return "6強"
            case 70: return "7"
            default: return "不明"
        }
    }

    svgtopng(){
        const input = [{
            "input": ["./svg/eq_map.svg"],
            "output": [["./images/eqmap.png",]]
        }]

        svgexport.render(input, function (result) {
            console.log("done", result);
          });
    }
}

module.exports = Util;