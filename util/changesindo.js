const svgexport = require('svgexport');


class Util {

    texttsunami(tsunami){
        //"None" | "Unknown" | "Checking" | "NoneEffective" | "Watch" | "Warning"
        switch(tsunami){
            case "None":
                return "津波の心配はありません。"
            case "Unknown":
                return "津波の有無は不明です。"
            case "Checking":
                return "津波の有無は現在調査中です。"
            case "NoneEffective":
                return "若干の海面変動はありますが、津波の心配はありません。"
            case "Watch":
                return "津波注意報を発令中です。"
            case "Warning":
                return "津波警報を発令中です。"
            case "MajorWarning":
                return "大津波警報を発令中です。"
            default:
                return "情報のフォーマットに失敗しました。"
        }
    }

    maps(item,p2p,pref,maxscale){
        for(var point of p2p[0].points){
            if(!pref){
               maxscale = 0;
               pref = point.pref;
               maxscale = point.scale;
               //console.log(`${pref} is ${maxscale}`)
            }
            if((pref === item.properties.nam_ja)){
                if((maxscale > point.scale)) return console.log(`${pref} is ${maxscale} > ${point.scale}`)
                else {
                    console.log(`${pref} is ${maxscale} < ${point.scale}`)
                    return new Util().changesindo(maxscale)
                }
            } else {
              pref = "";
            }
         }
    }

    zoom(sindopointlength){
        if((sindopointlength >= 20)) sindopointlength = sindopointlength + 3400 * 1.5 
        else sindopointlength = 2900
        return 20000/sindopointlength
    }

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