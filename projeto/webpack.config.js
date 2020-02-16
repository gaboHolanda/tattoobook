const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        entry: path.join(__dirname , 'assets/js/app.js')
    },
    output: {
        path:path.join(__dirname , 'static/js'),
        filename: 'app.js'
    },
    mode:'development'
}