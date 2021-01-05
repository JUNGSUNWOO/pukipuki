var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
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
        <input type="button" value="Music Search" onClick="location.href='/search'">
    </body>
    </html>`;

    res.send(html);
})

app.get('/search', function(req, res){

    // document.domain = 'youtube.com';
    // if (document.domain.toString().indexOf("youtube.com") != -1) document.domain="youtube.com";

    
    var html = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Perfect Dancer</title>
        </head>
        <body>
            <table border="1" width="1500" height="1000" cellspacing="0">
            <tr>
                <td width="1500" height="1000"><object style="width: 900px; height: 1000px" data="https://sel.jnu.ac.kr/login.php?lang=ko"></object></td>
            </tr>
            </table>
        </body>
    </html>
    `;

    res.send(html);
})

app.get('/active', function(req, res){

    var id = req.query.v;

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
        <div style="
        position: absolute;
        bottom: 0px;
        background-color: #F5F5F7;
        width: 100%;
        height: 16.5%;
        max-height: 120px;
        min-height: 53px;
        z-index: 99999;
        "></div>
        <!--//제목 가리는 하단 div-->
        
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?controls=0&rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    
                </div>
            </div>  
        </div>
    </html>
    `;
    
    res.send(html);
})

app.get('/finish', function(req, res){
    var html = ``;

    res.send(html);
})

app.listen(3000, function(){
    console.log('Listening...');
})