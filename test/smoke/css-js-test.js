const glob = require('glob');
const path = require('path');

describe('Checking generated css js files',()=>{
  it('should generate css js files',(done)=>{
    const csfiles = glob.sync('./dist/*.css',)
    const jsfile = glob.sync('./dist/*.js')
  
    if((csfiles.length + jsfile.length) > 0){
      done()
    }else{
      throw new Error('no css js files generated')
    }
  })
})