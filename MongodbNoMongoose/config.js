var config = {};

config.dev = {
    'name':'development',
    'port':2500,
    'db':{
        'url':'mongodb://localhost:27017'
    }
};

config.dep = {
    'name':'deployment',
    'port':3500,
    'db':{
        'url':'mongodb://localhost:27017'
    }
};

var chosenConfig = process.env.NODE_ENV;
chosenConfig = (typeof(chosenConfig)!= 'undefined')?chosenConfig:"dev";
chosenConfig = ['dev','dep'].indexOf(chosenConfig)>-1?chosenConfig:"dev";

console.log(chosenConfig);
module.exports = config[chosenConfig];