var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');

app.use(express.static("image"));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    var html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Perfect Dancer</title>
    </head>
    <body>
        <style>
            
        </style>
        <h1>Perfect Dancer</h1>
        <form action="http://localhost:3000/link_process" method="get">
        <p><input type="text" name="link" placeholder="youtube url"></p>
        <p><input type="text" name="id" placeholder="video ID"></p>
        <p>
        <input type="submit">
        </p>
      </form>
    </body>
    </html>`;

    res.send(html);
})

app.get('/link_process', function (req, res) {
    var link = req.query.link;
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
            <meta http-equiv="refresh" content="5; url=http://localhost:3000/game"> //자동 페이지 넘기는 부분
            <title>Perfect Dancer</title>
        </head>
        <body>
        <h1>로딩 중입니다 ...</h1>
        <form id="sample_form" action="http://localhost:3000/game" method="get"> 
        <input type="hidden" name="link" value="${link}">  
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

    var link = req.query.link;
    var id = req.query.id;

    console.log(id);
    var html = `
    <!DOCTYPE html>
    <html>
        <style>
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
        <marquee direction="left" scrollamount="20" scrolldely="200" width="2000" height="290"> 
        <img class="image" src="1.jpg">
        <img class="image" src="2.jpg">
        <img class="image" src="3.jpg">
        <img class="image" src="4.jpg">
        <img class="image" src="5.jpg">
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
    <h1>결과페이지 로딩중입니다.</h1>   
    </body>
    </html>
    `;
    res.send(html);
});

app.get('/finish', function (req, res) {
    var html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Perfect Dancer</title>
    </head>
    <body>
    <h1>결과보고서</h1> 
    <div><img class="image" src="1.jpg"><img class="image" src="2.jpg"></div> 
    <div><img class="image" src="1.jpg"></div>
    <div><img class="image" src="2.jpg"></div> 
    <div><img class="image" src="2.jpg"></div>
    </body>
    </html>
`;
    res.send(html);
})

app.listen(3000, function () {
    console.log('Listening...');
})
