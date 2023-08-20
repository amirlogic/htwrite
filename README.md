# Dynamic HTML Generator

Provides an easy way to generate good looking HTML

Designed for use with Bootstrap CSS library

Super lightweight, no dependencies

## Server Side Rendering

```javascript

const { getHtml, webpage } = require('htwrite')

const http = require('http');


let devhtml = getHtml([
    
    ['b63ac4e2-6ba6-48cd-a774-58d51e1eac12', 
    
    {title:"demo",list:['first','second']}]

])

http.createServer(function (req, res) {

    res.write(webpage("DEMO",'',devhtml)); //write a response to the client
    res.end(); //end the response
  }).listen(8080);


```

If you visit http://localhost:8080 you should be able to view the webpage


## Server Side generation

You can also generate static .html files

```javascript

const { getHtml, webpage } = require('htwrite')

const fs = require('fs');


let devhtml = getHtml([
    
    ['b63ac4e2-6ba6-48cd-a774-58d51e1eac12', 
    
    {title:"demo",list:['first','second']}]

])


let filecontent = webpage("DEMO",'',devhtml)

fs.writeFile('demo.html', filecontent, function (err) {

    if (err) throw err;
    console.log('demo.html created!');
});


```

## Webpage wrapper

`webpage(title,xhead,body,opts)`


`title` (string) webpage title  

`xhead` (string) extra CSS and scripts for the head section  

`body` (string) html for the body section  

`opts` (object) extra options  


| key       | description                               |
|-----------|-------------------------------------------|
| apipath   | backend api path                          |


See also: https://nestedlogic.vercel.app/htwrite