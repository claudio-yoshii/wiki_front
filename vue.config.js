const path = require('path');
module.exports = {	
	configureWebpack: {
        resolve: {
            alias: {
                "Http": path.resolve(__dirname, './src/http/http.js')				
            }
        }
    }
}
