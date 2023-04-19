import auth from '@/store/modules/auth.js'

const modules = {};

modules.auth = auth

const requireModules = require.context('@/views', true, /\.js$/);

requireModules.keys().forEach(fileName => {

  const folders = fileName.split('/')  

  if(folders[folders.length - 1] == 'index.js' && folders[folders.length - 2] == 'store'){    
    
    modules[folders[1]] = requireModules(fileName).default    

  } 
  
});

export default modules;