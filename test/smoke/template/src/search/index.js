// import './index.less';
import first from './images/1.jpg';
import bigNumber from 'li-big-number';

console.log(bigNumber('100','1'));
var div = document.createElement('div');
div.className = 'test'
div.innerText = bigNumber('100','1')
var img = document.createElement('img');
img.src = first;

var div2 = document.createElement('div');
div2.innerText="测试监听123"

document.body.appendChild(div)
document.body.appendChild(img)
document.body.appendChild(div2)

document.getElementById('btn').onclick = function () {
  import('./test_async.js').then(data=>{
    console.log(data);
    document.getElementById('async').innerText = data.default()
  })
}
// document.write('search')