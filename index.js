const { argv } = require('process');

(async() => {

const d3 = require('d3');
//const geoJson = require('./japan.geo.json')
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Path = require('path');
const Util = require('./util/changesindo.js')
const request = require('request');
const createtime = new Date();
const { main } = require('./config/config.json');

//testdata
const json = require('./test/testdata.json')

//新しいドキュメントの宣言

const document = new JSDOM().window.document

//ここから保存関係

    const dir = process.cwd();
    const datadir = Path.join(dir, "data");
    const fullPath = Path.join(datadir, main.SVG_saveto.filename);
    const targetPath = Path.format({
                dir: Path.join(dir, main.SVG_saveto.svgtemp),
                name: Path.basename(fullPath, Path.extname(fullPath)),
                ext: ".svg"
            });

//サイズ指定
    const width = main.SVG_size.width; 
    const height = main.SVG_size.height; 
    const scale = main.SVG_size.scale; 

//一時的
  let pref = "";
  let maxscale = 00;
 // let p2p;
//おまじない

      request.get(main.importfrom.p2p,async(res,req,body) => {
       // console.log(body[0])
        p2p = JSON.parse(body);
        //p2p = json
        //console.log(p2p[0])
  
    const projection = d3.geoMercator().center([137.0, 38.2]).translate([width / 2, height / 2]).scale(scale);
    const path = d3.geoPath().projection(projection);

//あたらしい地図のベース作成
    const svg = d3.select(document.body)
              .append('svg')
              .attr("xmlns",'http://www.w3.org/2000/svg')
              .attr('width', width)
              .attr('height', height)
              .style(`background-color`,main.mconfig.background_color)

              const data = await d3.json(main.importfrom.basegeojson);

              //console.log(data);

              const zoom = projection([p2p[0].earthquake.hypocenter.longitude,p2p[0].earthquake.hypocenter.latitude])
              const zoomnum = new Util().zoom(p2p[0].points.length)

              svg
              .selectAll('path')
              .data(data.features)
              .enter()
              .append(`path`)
              .attr(`d`, path)
              .attr(`stroke`, main.mconfig.stroke_color)
              .attr(`stroke-width`, 0.25)
              .attr(`fill`, (item) => {
                   return new Util().maps(item,p2p,pref,maxscale)
                })
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")scale(" + zoomnum + ")translate(" + - zoom[0] + "," + - zoom[1] + ")");
                //.scale([zoom[0],zoom[1]])


              svg.append("text")
              .attr("x", 0)
              .attr("y", 20)
              .attr("width",80)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr('fill',"#FFFFFF")
              .text(`x${zoomnum}`)
              
           
              //震度色表示
              svg.append("rect")
              .attr("x", 20)
              .attr("y", 130)
              .attr("width",80)
              .attr("height",200)
              .attr("rx", 10)
              .attr("ry",10)
              .attr("opacity",0.5)

              //震度7から１の棒
              svg.append("rect")
              .attr("x", 30)
              .attr("y", 140)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#4b0082")

              svg.append('text')
              .attr("x",40)
              .attr("y",155)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度 7`)

              svg.append("rect")
              .attr("x", 30)
              .attr("y", 160)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#b22222")

              svg.append('text')
              .attr("x",40)
              .attr("y",175)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度6強`)

              svg.append("rect")
              .attr("x", 30)
              .attr("y", 180)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#800000")

              svg.append('text')
              .attr("x",40)
              .attr("y",195)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度6弱`)

              svg.append("rect")
              .attr("x", 30)
              .attr("y", 200)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#d2691e")

              svg.append('text')
              .attr("x",40)
              .attr("y",215)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度5強`)

              svg.append("rect")
              .attr("x", 30)
              .attr("y", 220)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#ffa500")

              svg.append('text')
              .attr("x",40)
              .attr("y",235)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度5弱`)

              svg.append("rect")
              .attr("x", 30)
              .attr("y", 240)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#ffd700")

              svg.append('text')
              .attr("x",40)
              .attr("y",255)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度 4`)

              svg.append("rect")
              .attr("x", 30)
              .attr("y", 260)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#008000")

              svg.append('text')
              .attr("x",40)
              .attr("y",275)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度 3`)

              svg.append("rect")
              .attr("x", 30)
              .attr("y", 280)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#4682b4")

              svg.append('text')
              .attr("x",40)
              .attr("y",295)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度 2`)

              svg.append("rect")
              .attr("x", 30)
              .attr("y", 300)
              .attr("width",5)
              .attr("height",20)
              .attr("opacity",0.5)
              .attr("fill","#778899")

              svg.append('text')
              .attr("x",40)
              .attr("y",315)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震度 1`)


              //拝啓15の手紙
              svg.append("rect")
              .attr("x", 20)
              .attr("y", 30)
              .attr("width",200)
              .attr("height",70)
              .attr("rx", 10)
              .attr("ry",10)
              .attr("opacity",0.5)

              svg.append('text')
              .attr("x",30)
              .attr("y",87)
              .attr("font-size", 10)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text("地図データ : 国土地理院 / Natural Earth")



              svg.append('rect')
              .attr("x",480)
              .attr("y",550)
              .attr("width",300)
              .attr("height",30)
              .attr("opacity",0.8)

              svg.append('text')
              .attr("x",485)
              .attr("y",570)
              .attr("font-size", 17)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .attr("font-weight","bold")
              .text(`${new Util().texttsunami(p2p[0].earthquake.domesticTsunami)}`)


              //インフォメーションの拝啓ボックス
              svg.append("rect")
              .attr("x", 800)
              .attr("y", 300)
              .attr("width",190)
              .attr("height",280)
              .attr("rx", 10)
              .attr("ry",10)
              .attr("opacity",0.5)

              //棒 震度
              svg.append("rect")
              .attr("x", 810)
              .attr("y", 320)
              .attr("width",5)
              .attr("height",30)
              .attr("opacity",0.5)
              .attr("fill","#d2691e")

              svg.append('text')
              .attr("x",830)
              .attr("y",345)
              .attr("font-size", 13)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text("最大震度")

              svg.append('text')
              .attr("x",885)
              .attr("y",345)
              .attr("font-size", 30)
              .attr("font-weight","bold")
              .attr('fill',new Util().changesindo(p2p[0].earthquake.maxScale))
              .attr('font-family',"Roboto")
              .text(`${new Util().changesindotosindoname(p2p[0].earthquake.maxScale)}`)

              //棒 Mag
              svg.append("rect")
              .attr("x", 810)
              .attr("y", 370)
              .attr("width",5)
              .attr("height",30)
              .attr("opacity",0.5)
              .attr("fill","#d2691e")

              svg.append('text')
              .attr("x",830)
              .attr("y",395)
              .attr("font-size", 15)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text("M")

              svg.append('text')
              .attr("x",855)
              .attr("y",395)
              .attr("font-size", 30)
              .attr("font-weight","bold")
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`${p2p[0].earthquake.hypocenter.magnitude}`)

              //棒 深さ
              svg.append("rect")
              .attr("x", 810)
              .attr("y", 420)
              .attr("width",5)
              .attr("height",30)
              .attr("opacity",0.5)
              .attr("fill","#d2691e")

              svg.append('text')
              .attr("x",830)
              .attr("y",445)
              .attr("font-size", 10)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`深さ`)

              svg.append('text')
              .attr("x",855)
              .attr("y",445)
              .attr("font-size", 30)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`${p2p[0].earthquake.hypocenter.depth}`)

              svg.append('text')
              .attr("x",915)
              .attr("y",445)
              .attr("font-size", 10)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`km`)

              //棒 津波の心配 に しようかとしたけどやっぱり震源
              svg.append("rect")
              .attr("x", 810)
              .attr("y", 470)
              .attr("width",5)
              .attr("height",40)
              .attr("opacity",0.5)
              .attr("fill","#d2691e")

              svg.append('text')
              .attr("x",830)
              .attr("y",483)
              .attr("font-size", 13)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`震源`)

              svg.append('text')
              .attr("x",830)
              .attr("y",503)
              .attr("font-size", 18)
              .attr('fill',"#FFFFFF")
              .attr("font-weight","bold")
              .attr('font-family',"Roboto")
              .text(`${p2p[0].earthquake.hypocenter.name}`)

              //棒
              svg.append("rect")
              .attr("x", 810)
              .attr("y", 527)
              .attr("width",5)
              .attr("height",40)
              .attr("opacity",0.5)
              .attr("fill","#d2691e")

              svg.append('text')
              .attr("x",830)
              .attr("y",540)
              .attr("font-size", 13)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text(`発生時刻`)

              svg.append('text')
              .attr("x",830)
              .attr("y",560)
              .attr("font-size", 18)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .attr("font-weight","bold")
              .text(`${p2p[0].earthquake.time.replace(":00","")}`)

              svg.append('text')
              .attr("x",30)
              .attr("y",64)
              .attr("font-size", 25)
              .attr('fill',"#FFFFFF")
              .attr('font-family',"Roboto")
              .text("各地の震度情報")

              console.log(`LO ${p2p[0].earthquake.hypocenter.longitude} / LA${p2p[0].earthquake.hypocenter.latitude}`)

              const singen = projection([p2p[0].earthquake.hypocenter.longitude,p2p[0].earthquake.hypocenter.latitude])

              const diff = projection([137,38])

              console.log(`X ${singen[0]} / Y ${singen[1]} Array ${singen} diff X ${diff[0]} / Y ${diff[1]}`)

              svg.append("g")
              .append('circle')
              .attr("cx", singen[0])
              .attr("cy", singen[1])
              .attr('r', 4)
              .attr('stroke', 'yellow') // 枠線色
              .attr('fill', 'red'); // 塗りつぶし色
              

              fs.writeFileSync(targetPath, document.body.innerHTML ,async(e) =>  {
                if(e){
                    console.error('[地図描画] エラー : '+err.message ? err.message : err)
                } else {
                    console.log(`[地図描画] 成功しました。 処理時間 : ${new Date() - createtime}`)
                   
                }
              
        })
       await new Util().svgtopng()
    })
    })()

