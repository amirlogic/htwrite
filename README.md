# htree

HTML Tree

Designed for use with Bootstrap CSS library

## Server Side Rendering

```javascript

const { getHtml, webpage } = require('./index.js')

let devhtml = getHtml([
    
    {target:'b63ac4e2-6ba6-48cd-a774-58d51e1eac12', 
    
    payload:{title:"demo",list:['first','second']}

}])

console.log( webpage("DEMO",'',devhtml) )


```

## Server Side generation

```javascript

```
