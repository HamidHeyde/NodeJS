var config = {};

config.dev = {
    'name':'development',
    'port':2500
};

config.dep = {
    'name':'deployment',
    'port':3500
};

var chosenConfig = process.env.NODE_ENV;
chosenConfig = (typeof(chosenConfig)!= 'undefined')?chosenConfig:"dev";
chosenConfig = ['dev','dep'].indexOf(chosenConfig)>-1?chosenConfig:"dev";

console.log(chosenConfig);
module.exports = config[chosenConfig];