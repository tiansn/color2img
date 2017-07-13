var express = require('express');
var router = express.Router();
var Canvas = require('canvas');
var fs = require('fs');

var currentArr = [];

function drawRect(arr, callback) {
  let Image = Canvas.Image,
    canvas = new Canvas(800, 800),
    ctx = canvas.getContext('2d');

  ctx.fillStyle = '#' + arr[0] || '';
  ctx.fillRect(0, 0, 400, 400);

  ctx.fillStyle = '#' + arr[1] || '';
  ctx.fillRect(0, 400, 400, 400);

  ctx.fillStyle = '#' + arr[2] || '';
  ctx.fillRect(400, 0, 400, 400);

  ctx.fillStyle = '#' + arr[3] || '';
  ctx.fillRect(400, 400, 400, 400);

  var imgData = canvas.toDataURL();
  //过滤data:URL
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  var fileDir = __dirname + "/../public/generateImg/";
  var fileName = arr[0] + "-" + arr[1] + "-" + arr[2] + "-" + arr[3] + ".png";
  currentArr.length = 0;
  fs.readFile(fileDir + fileName, (err, data) => {
    if (data) {
      console.log(fileName + '已存在');
      callback(null);
    };
  });

  fs.writeFile(fileDir + fileName, dataBuffer, function(err) {
    if (err) {
      throw err
    } else {
      console.log(fileName + "已生成");
      callback(null);
    }
  });
}

router.post('/', function(req, res, next) {
  var colorArr = req.body.params;
  for (let i = 0, len = colorArr.length; i < len; i++) {
    let index = i + 1;
    let flag = index % 4;
    let lastIndex = len % 4;
    if (flag === 0) {
      currentArr.push(colorArr[i]);
      currentArr.push(colorArr[i - 1]);
      currentArr.push(colorArr[i - 2]);
      currentArr.push(colorArr[i - 3]);
      drawRect(currentArr,(cbval)=>{
      });
    }
    //最后余下的颜色值
    if(i == len-lastIndex && lastIndex){
      if(lastIndex == 1){
        currentArr.push(colorArr[i]);
        drawRect(currentArr,(cbval)=>{
        });
      }
      if(lastIndex == 2){
        currentArr.push(colorArr[i]);
        currentArr.push(colorArr[i+1]);
        drawRect(currentArr,(cbval)=>{
        });
      }
      if(lastIndex == 3){
        currentArr.push(colorArr[i]);
        currentArr.push(colorArr[i+1]);
        currentArr.push(colorArr[i+2]);
        drawRect(currentArr,(cbval)=>{
        });
      }
    }
  }
  res.json({'finish': true})
});

module.exports = router;
