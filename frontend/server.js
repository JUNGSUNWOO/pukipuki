var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');

app.use(express.static("image"));
app.use(express.static("second"));
app.use(express.static("user"));
app.use(express.static("correct"));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    var html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

<!-- 부가적인 테마 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
        <title>Perfect Dancer</title>
        <style>
        .entry{
             
            height: 100vh;
            background-image:url('shadow.jpg');
            background-size:cover;
        }

        .title{
            text-shadow:1px 1px 2px #666666;
            color : #01DF01;
            padding-top : 107px;
            text-align : center;
        }
        
        .form-inline{
            text-align:center;
            padding-top:300px;
        }

        </style>
    </head>
    <body>
    <div class = "entry">
    <h1 class="title">Perfect Dancer</h1>
      
      <form class="form-inline" action="http://localhost:3000/link_process" method="get">
  <div class="form-group">
    <label for="exampleInputName2">Youtube Video ID</label>
    <input type="text" class="form-control" name="id" id="exampleInputName2" placeholder="Video ID">
  </div>
  <button type="submit" class="btn-success btn-lg">Game Start</button>
</form>
        </div>
    </body>
    </html>`;

    res.send(html);
})

app.get('/link_process', function (req, res) {
    var id = req.query.id;


//     var ps = require('python-shell');
//     var options = {
//      mode: 'text',
//      pythonPath:'',
//      pythonOptions: ['-u'],
//      scriptPath:'',
//      args: ['url']};
//     ps.PythonShell.run('test.py', options, function (err,results) { 
//     if (err) throw err;
//     //console.log('finished');
//     console.log('results : ',results[0]);
// });


    var html = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="5; url=http://localhost:3000/game"> 
            <title>Perfect Dancer</title>
        </head>
        <body>
        <style>

        .title{
            text-shadow:1px 1px 2px #666666;
            color : #01DF01;
            padding-top : 107px;
            text-align : center;
        }

        div{
            text-align:center;
        }
        </style>

        <h1 class="title">로딩 중입니다 ...</h1>
        <div>
            <img class="entry" src="Loading.gif">
        </div>
        <form id="sample_form" action="http://localhost:3000/game" method="get">  
        <input type="hidden" name="id" value="${id}">
        </form> 
        <script type="text/javascript"> 
        setTimeout(function(){
            this.document.getElementById("sample_form").submit();
        }, 3000);
        </script>
        </body>
    </html>
    `;

    res.send(html);
})

app.get('/game', function (req, res) {

    var id = req.query.id;

    const dir = './second/'
    const list = fs.readdirSync(dir).map(filename => {
        return {
            filename: filename,
            mtime: fs.statSync(dir + filename).mtime
        }
    })

    list.sort((a,b) => a.mtime - b.mtime)

    console.dir(list[0].filename)

    var temp = "";
    var i = 0;
    while (i < list.length) {
        temp = temp + `<img class="image" src="${list[i].filename}">`;
        i++;
    }
    var html = `
    <!DOCTYPE html>
    <html>
        <style>

        .entry{
            height: 100vh;
            background-image:url('shadow.jpg');
            background-size:cover;
        }

        .youtubevideowrapperdiv1-1 {
        position: relative;
        padding-bottom: 50%; /* 영상비율에 따른 수치 */
        padding-top: 25px;
        height: 0;
        }

        .youtubevideowrapperdiv4-3 {
        position: relative;
        padding-bottom: 75%; /* 영상비율에 따른 수치 */
        padding-top: 25px;
        height: 0;
        }


        .youtubevideowrapperdiv16-9blind {
        position: relative;
        padding-bottom: 83%; /* 영상비율에 따른 수치 */
        padding-top: 0%;
        height: 0;    
        }

        .youtubevideowrapperdiv16-9 {
        position: relative;
        padding-bottom: 56.25%; /* 영상비율에 따른 수치 */
        padding-top: 3%;
        height: 0;
        }

        .youtubevideowrapperdiv17-9 {
        position: relative;
        padding-bottom: 52.94%; /* 영상비율에 따른 수치 */
        padding-top: 25px;
        height: 0;
        }

        .youtubevideowrapperdiv18-9 {
        position: relative;
        padding-bottom: 50%; /* 영상비율에 따른 수치 */
        padding-top: 25px;
        height: 0;
        }


        .youtubevideowrapperdiv19-9 {
        position: relative;
        padding-bottom: 47.37%; /* 영상비율에 따른 수치 */
        padding-top: 25px;
        height: 0;  
        }


        .youtubevideowrapperdiv20-9 {
        position: relative;
        padding-bottom: 45%; /* 영상비율에 따른 수치 */
        padding-top: 25px;
        height: 0;
        }

        .youtubevideowrapperdiv iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        }

        .youtubevideowrapper 
        {max-width: 900px;
        margin:auto;
        }

        #footer{
            position:fixed;
            bottom: 0;
            width:100%;
        }

        #container {
            margin: 0px auto;
            width: 400px;
            height: 300px;
            border: 10px #333 solid;
            position: fixed;
            right: 0px;
            top: 0px;
            margin-right:45px;
            margin-top: 10px;

        }
        #videoElement {
            width: 400px;
            height: 300px;
            background-color: #666;
        }

        .image{
            width:350px;
            margin-right:100px;
        }
        </style>

        <div class = "entry">
        <!-- 유튜브 영상 리소스-->
        <div style="text-align:center;">
        <div class="youtubevideowrapper">   

        <!-- 영상 한 묶음. 영상이 연속으로 있을 경우 이 묶음을 더 추가하면 됨-->



        <div class="youtubevideowrapperdiv youtubevideowrapperdiv16-9blind" >
            

        <!-- 제목 가리는 상단 div-->
        <div style="
        position: absolute;
        top: 0px;
        background-color: #F5F5F7;
        width: 100%;
        height: 16.5%;
        max-height: 120px;
        min-height: 53px;
        z-index: 99999;"></div>
        <!--//제목 가리는 상단 div-->
        
        <!-- 제목 가리는 하단 div-->
        <div id="player" style="
        position: absolute;
        bottom: 0px;
        background-color: #F5F5F7;
        width: 100%;
        height: 100%;
        max-height: 80%;
        min-height: 53px;
        z-index: 99999;
        "></div>

        <script src="http://www.youtube.com/player_api"></script>
        <script type="text/javascript">
        var player;
        function onYouTubePlayerAPIReady() {
            player = new YT.Player("player", {
                width: "100%",
                height: "100%",
                videoId: "${id}",
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event){
            event.target.playVideo();
        }

        function onPlayerStateChange(event) {
            if(event.data === 0) {
                window.location = "http://localhost:3000/game_process";
            }
        }
        </script>
        <!--//제목 가리는 하단 div-->
                </div>
            </div>  
            <div id="container">
    <video autoplay="true" id="videoElement"></video>
    <form id="sample_form" action="http://localhost:3000/game_process" method="get"> 
            <input type="hidden" name="link" value="check">  
    </form> 
</div>
<script>
    var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
        video.srcObject = stream;
        })
        .catch(function (err0r) {
        console.log("Something went wrong!");
        });
    }
</script>
        <div id="footer">
        <marquee direction="left" scrollamount=13> 
        ${temp}
        </marquee>
        </div>
    </html>
    `;

    res.send(html);
})


app.get('/game_process', function (req, res) {
    var html = `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="5; url=http://localhost:3000/finish">
        <title>Perfect Dancer</title>
    </head>
    <body>
    <style>
    .title{
        text-shadow:1px 1px 2px #666666;
        color : #01DF01;
        padding-top : 107px;
        text-align : center;
    }

    div{
        text-align:center;
    }
    </style>
    <h1 class="title">결과페이지 로딩중입니다.</h1>  
    <div>
            <img class="entry" src="Loading.gif">
        </div> 
    </body>
    </html>
    `;
    res.send(html);
});

app.get('/finish', function (req, res) {

    var score = 70;
    fs.readdir("./user", function (error, filelist) {
        var list = "";
        var i = 0;
        while (i < filelist.length) {
            list = list + `<video class="video" src="${filelist[i]}">`;
            i++;
        }
    });

    fs.readdir("./correct", function (error, filelist) {
        var list = "";
        var i = 0;
        while (i < filelist.length) {
            list = list + `<img class="image" src="${filelist[i]}">`;
            i++;
        }
    });
    var html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Perfect Dancer</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    </head>
    <body>
    <style>
    .entry{
        position: relative;
        height: 100vh;
        background-image:url('shadow.jpg');
        background-size:cover;
        z-index:1;

    }
    #des{
        position:absolute;
        top: 200px;
        z-index:2;
    }
    .video{
        margin-top:10px;
        margin-left:20px;
    }

    .title{
        position:absolute;
        top:10px;
        text-shadow:1px 1px 2px #666666;
        color : #01DF01;
        padding-top : 10px;
        margin-left:47%;
        text-align : center;
        z-index:3;
    }

    #small{
        margin-left:300px;
        text-shadow:1px 1px 2px #666666;
        color : #01DF01;
        padding-top : 10px;
        z-index:3;
    }
    #vertgraph {                    
        width: 378px; 
        height: 207px; 
        position: relative; 
        background: url("/data/201010/IJ12882288192086/g_backbar.gif") no-repeat; 
    }
    #vertgraph ul { 
        width: 378px; 
        height: 207px; 
        margin: 0; 
        padding: 0; 
    }
    #vertgraph ul li {  
        position: absolute; 
        width: 28px; 
        height: 160px; 
        bottom: 34px; 
        padding: 0 !important; 
        margin: 0 !important; 
        background: url("/data/201010/IJ12882288192086/g_colorbar3.jpg") no-repeat !important;
        text-align: center; 
        font-weight: bold; 
        color: white; 
        line-height: 2.5em;
    }
    .score{
        position:absolute;
        top:10px;
        text-shadow:1px 1px 2px #666666;
        color : #01DF01;
        padding-top : 300px;
        margin-left:80%;
        text-align : right;
        z-index:3;
    }
    .score1{
        position:absolute;
        top:10px;
        text-shadow:3px 3px 6px #666666;
        color : red;
        padding-top : 400px;
        margin-left:80%;
        text-align : right;
        z-index:3;
        font-weight:bold;
        font-size:200px;
    }
    </style>

    <div class="entry"></div>
    <h1 class="title">결과보고서</h1> 
    <h1 class="score">당신의 점수는?</h1>
    <h1 class="score1">${score}</h1>
    <div id="des">
    <p><div id="small">사용자 틀린 안무&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;정확한 안무</div></p>
    
    <p>
    <video controls width="700" class="video"> <source src="bad171.mp4" type="video/mp4"></video>
    <video controls width="700" class="video"> <source src="ans171.mp4" type="video/mp4"></video>
    </p>
    <p>
    <video controls width="700" class="video"> <source src="bad231.mp4" type="video/mp4"></video>
    <video controls width="700" class="video"> <source src="ans231.mp4" type="video/mp4"></video>
    </p>
    <p>
    <video controls width="700" class="video"> <source src="user/bad242.mp4" type="video/mp4"></video>
    <video controls width="700" class="video"> <source src="ans242.mp4" type="video/mp4"></video>
    </p>
    </div>
  </div>
  <div id="vertgraph">
    <ul>
        <li class="critical" style="height: 150px;">22</li>
        <li class="high" style="height: 80px;">7</li>
        <li class="medium" style="height: 50px;">3</li>
        <li class="low" style="height: 90px;">8</li>
        <li class="info" style="height: 40px;">2</li>
    </ul>
</div>
    </body>
    </html>
`;
    res.send(html);
})

app.listen(3000, function () {
    console.log('Listening...');
})
