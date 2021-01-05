
var ps = require('python-shell');

var options = {
 mode: 'text',
 pythonPath:'',
 pythonOptions: ['-u'],
 scriptPath:'',
 args: ['https://www.youtube.com/watch?v=UNy3zEPYNo4']};

ps.PythonShell.run('test1.py', options, function (err,results) { 
if (err) throw err;
//console.log('finished');
console.log('results : ',results);
});

