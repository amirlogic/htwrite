

const BOOTSRAP_LINK = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">`


const webpage = (title = 'HTML Page', xhead='', payload='') => {

	return `<!doctype html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>${title}</title>
              ${BOOTSRAP_LINK}
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script>

                let inputdata = {};

                async function sendToServer( ndl, cdata = {} ){

                  fetch('/api',{

                    method: 'POST',
                    mode: 'cors', 
                    cache: 'no-cache', 
                    credentials: 'same-origin',
                    headers: {
                      'Content-Type': 'application/json'
                      
                    },
                    redirect: 'follow', 
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify( { "ndl":ndl, "dyd":{ ...inputdata, ...cdata } } ),

                  })
                  .then(response => response.json())
                  .then( (rdata) => {

                      if( rdata.hasOwnProperty('redirect') ){

                        window.location.href = rdata.redirect;
                      }

                      if( rdata.hasOwnProperty('rawdata') ){

                        console.log(rawdata);
                      }

                    console.log(rdata)
                  } );
                }

              </script>
              ${xhead}
            </head>
            <body>
                ${payload}
            </body>
          </html>`;
};


function renderGrid(initcont='') {

	let htdata = '';

	let n = 0;

	let nxt = true;

	let sliced;

	let tobranch;

	let hstack = treestk[contree[initcont]].slice(0);

	do {
		if (hstack[n][0] == 'branch') {
			if (brandata[hstack[n][1]][0] == true) {
				tobranch = hstack[n][1];

				if (treestk[contree[brandata[tobranch][1]]].length > 0) {
					hstack.splice(n, 1);

					for (
						let s = treestk[contree[brandata[tobranch][1]]].length - 1;
						s >= 0;
						s--
					) {
						hstack.splice(n, 0, treestk[contree[brandata[tobranch][1]]][s]);
					}
				} else {
					hstack.splice(n, 1);
				}
			} else {
				hstack[n] = ['html', brandata[hstack[n][1]][2]];
			}
		} else if (hstack[n][0] == 'html') {
			n++;
		}

		if (n == hstack.length) {
			nxt = false;
		}

		if (n == 10000) {
			console.error('renderGrid: Infinite Loop');
			nxt = false;
			break;
		}
	} while (nxt === true);

	for (r = 0; r < hstack.length; r++) {
		htdata += hstack[r][1];
	}

	//document.getElementById( htroot ).innerHTML = htdata

	hstack = [];

	return htdata;
}

function setBranchHtml(brid='', bhtml='') {
	brandata[brid][2] = bhtml;
	brandata[brid][0] = false;

	let nxbranch = brid;
	let nxtree;
	let nxcont;
	let n = 0;
	let nxt = true;

	while (nxt === true) {
		nxtree = brandata[nxbranch][3];
		nxcont = treecont[brandata[nxbranch][3]];
		contree[nxcont] = nxtree;

		if (contbranch.hasOwnProperty(nxcont)) {
			if (contbranch[nxcont] == null) {
				nxt = false;
			} else {
				nxbranch = contbranch[nxcont];
				brandata[contbranch[nxcont]][0] = true;
				nxt = true;
			}
		} else {
			nxt = false;
		}

		if (n == 2000) {
			console.error('setBranchHtml: Infinite Loop');
			nxt = false;
			break;
		}

		n++;
	}

	return true;
}

function modAct(modret) {
	let mdata = {};

	for (ml in modret) {
		if (modret[ml][0] == 'hwrite') {
			setBranchHtml(modret[ml][2], modret[ml][3]);
		} else if (modret[ml][0] == 'htrefresh') {
			return renderGrid(modret[ml][1]);
		} else {
			console.warn('modAct: Unknown action');
		}
		//console.log( [modret[ml][0], modret[ml][1], modret[ml][2] ] )
	}

	return mdata;
}


module.exports = { webpage,  };