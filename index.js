const fs=require('fs');
const inquirer= require('inquirer');
const generate=require("./generateHTML.js");
const axios=require('axios');
const questions = [
  {
      type:'checkbox',
      message:'Enter you favorite color',
      name:'color',
      choices:['green','blue','pink','red']
  },
  {
      type:'input',
      message:'Enter your GitHub username',
      name:'username'
  }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName,data,function(err){
        if(err){
            return console.log(err)
        }
        console.log("Success!")
    });
}

function init() {
        const ans=inquirer.prompt(questions).then(function(response){
        const queryUrl=`https://api.github.com/users/${response.username}`;
        axios.get(queryUrl)
        .then(function(obj) {
            obj.data.color=response.color[0];
        axios.get(`https://api.github.com/users/${response.username}/starred`)
        .then(function(object){
            //console.log(object.data[0]);
            obj.data.stars=object.data[0].stargazers_count;
            const res=generate.generateHTML(obj);
            writeToFile("index.html",res);
            
            convertFactory = require('electron-html-to');
 
            let conversion = convertFactory({
            converterPath: convertFactory.converters.PDF
            });
            
            conversion({ html: res }, function(err, result) {
            if (err) {
                
                return console.error(err);
            }
            
            console.log(result.numberOfPages);
            console.log(result.logs);
            result.stream.pipe(fs.createWriteStream('./pdfs/test.pdf'));
            conversion.kill(); 
            });

    });
        
        
    });
        
    });
}

init();
