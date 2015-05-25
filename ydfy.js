#!/usr/bin/env node


// #!/usr/local/bin/node


//1
//console.log('hello world');


//console.log(process.argv);



var program = require('commander');
var request = require('request');
var chalk = require('chalk');
//
//处理传入参数
program
    .version('0.0.1')
    .usage('<words>')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {
    //console.log('words: ' + program.args);

    var words = program.args;
    var url = 'http://fanyi.youdao.com/openapi.do?keyfrom=skyler&key=900086440&type=data&doctype=json&version=1.1&q='+ encodeURIComponent(words);

}

//发起请求

request({
    method: 'GET',
    url: url
}, function(error, response, data) {

    if (!error && response.statusCode == 200) {
        var data = JSON.parse(data);
        //console.log(data);

        //处理返回值
        var str = chalk.green( '~  ' + data.translation[0]) + chalk.gray('  ~  ');
        if (data.basic && data.basic.phonetic) {
            str += chalk.magenta('['+ data.basic.phonetic+']');
        }

        console.log('~  翻译  ' + words);

        console.log();

        console.log( str );

        console.log();


        if(data.basic && data.basic.explains){
            for (var i = 0; i< data.basic.explains.length; i++){
                console.log(chalk.yellow('-  '+ data.basic.explains[i]));
            }

            console.log();

        }

        if (data.web && data.web.length > 0){
            for (var i = 0; i< data.web.length; i++){
                console.log(chalk.gray((i+1)+'. '+ data.web[i].key));
                console.log(chalk.cyan('   ' + data.web[i].value));
            }
        }

        process.exit(0);


    } else if (error) {
        console.log('Error: ' + error);

        process.exit(1);
    }
});



