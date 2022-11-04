(async() => {

const d3 = require('d3');
//const geoJson = require('./japan.geo.json')
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Path = require('path');
const {Axios} = require('axios');
const Util = require('./util/changesindo.js')
const request = require('request');
const createtime = new Date();

//新しいドキュメントの宣言

const document = new JSDOM().window.document

//ここから保存関係

    const dir = process.cwd();
    const datadir = Path.join(dir, "data");
    const fullPath = Path.join(datadir, "eq_map.csv");
    const targetPath = Path.format({
                dir: Path.join(dir, "svg"),
                name: Path.basename(fullPath, Path.extname(fullPath)),
                ext: ".svg"
            });

//サイズ指定
    const width = 1234; 
    const height = 694; 
    const scale = 2000; 

//一時的
  let pref = "";
  let maxscale = 00;
 // let p2p;
//おまじない

       request.get('https://api.p2pquake.net/v2/history?codes=551&limit=1',async(res,req,body) => {
       // console.log(body[0])
        p2p = JSON.parse(body);
        //console.log(p2p[0])
  
    const projection = d3.geoMercator().center([137.0, 38.2]).translate([width / 2, height / 2]).scale(scale);
    const path = d3.geoPath().projection(projection);

//あたらしい地図のベース作成
    const svg = d3.select(document.body)
              .append('svg')
              .attr("xmlns",'http://www.w3.org/2000/svg')
              .attr('width', width)
              .attr('height', height)
              .style(`background-color`,"#001639")

              const data = await d3.json(`https://images.akika.ga/japan.json`);

              //console.log(data);

              svg
              .selectAll('path')
              .data(data.features)
              .enter()
              .append(`path`)
              .attr(`d`, path)
              .attr(`stroke`, `#666`)
              .attr(`stroke-width`, 0.25)
              .attr(`fill`, (item) => {
                function check() {
                  for(var point of p2p[0].points){
                      if(!pref){
                         maxscale = 0;
                         pref = point.pref;
                         maxscale = point.scale;
                      }

                      //console.log(`[確認] ${item.properties.nam_ja} / ${point.pref} != ${pref} + ${new Util().changesindo(maxscale)}`)

                      if((pref === item.properties.nam_ja)){
                       // console.log(`[〈適合〉確認 ] ${item.properties.nam_ja} / ${pref} + ${new Util().changesindo(maxscale)}`)
                         
                        return new Util().changesindo(maxscale)
                      } else {
                        pref = "";
                      }
                   }
                   
                }
                return check();
              })
           
              //タイトル
              svg.append("text")
              .attr("x", 10)
              .attr("y", 50)
              .attr("font-size", "50px")
              .attr("text-anchor", "top")
              .attr("font-family", "Kokuri")
              .attr("font-weight", 700)
              .attr('font-color',"#FFFFFF")
              .text("各地の震度");

              fs.writeFileSync(targetPath, document.body.innerHTML ,(e) =>  {
                if(err){
                    console.error('[地図描画] エラー : '+err.message ? err.message : err)
                } else {
                    console.log(`[地図描画] 成功しました。 処理時間 : ${new Date() - createtime}`)
                }
        })
    })
    })()

