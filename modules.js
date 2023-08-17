
module.exports = (target, hdata) => {
	if (target == 'c40ab6b8-8c48-4532-b49d-cb7c3624f67a') {
		// White Bg - Black Title

		return [
			['hwrite', true, '8e29403c-f4f4-4cfd-adc6-d5ea134e1b4c', `New App`],
			['hwrite', true, '549fbce2-b1bc-4e79-a120-0a76efe3f5bb', `Content`],
		]; // test
	} else if (target == '3e9301a2-f4fc-4304-bd4b-34b5530f4f63') {
		// Media top + Text bottom

		return [
			['hwrite', true, '7aa09576-d39a-4116-967b-0a002fe8768f', hdata?.media],
			['hwrite', true, 'f70cc0fa-1619-4a78-8c72-bfd2dc454ff7', hdata?.htcont],
			['htrefresh', '1584ab29-ce52-4c55-91db-8bd152f71152'],
		];
	} else if (target == '88013783-4581-470d-8995-92c1b951ecce') {
		// Image top + HText Bottom

		let img = `<figure><img alt="image" src="${hdata?.src}" class="d-block mx-auto" /><figcaption class="text-center text-black-50">${hdata?.caption}</figcaption></figure>`;

		return [
			['hwrite', true, '7aa09576-d39a-4116-967b-0a002fe8768f', img],
			['hwrite', true, 'f70cc0fa-1619-4a78-8c72-bfd2dc454ff7', hdata?.htcont],
			['htrefresh', '1584ab29-ce52-4c55-91db-8bd152f71152'],
		];
	} else if (target == '507bd06d-3806-4e72-a8ed-514e09fc40b1') {
		// Image + Selector + Text

		let k = 0;

		let imgselect = hdata?.payload.map((opt, indx) => {
			if (hdata?.imgkey === opt.key) k = indx;

			return `<div class="p-2 border my-2${
				hdata?.imgkey === opt.key ? ' bg-light' : ''
			}" data-bindto="${hdata?.bindto}" data-func="click" data-aval="${
				opt.key
			}">${opt.title}</div>`;
		});

		let htcont = `<div class="row py-4"><div class="col">${imgselect.join(
			'',
		)}</div><div class="col">${hdata?.payload[k].body}</div></div>`;

		let img = `<figure><img alt="image" src="${hdata?.payload[k].src}" class="d-block mx-auto" /><figcaption class="text-center text-black-50">${hdata?.payload[k].caption}</figcaption></figure>`;

		return [
			['hwrite', true, '7aa09576-d39a-4116-967b-0a002fe8768f', img],
			['hwrite', true, 'f70cc0fa-1619-4a78-8c72-bfd2dc454ff7', htcont],
			['htrefresh', '1584ab29-ce52-4c55-91db-8bd152f71152'],
		];
	}
	else if( target == "b290a78d-4d92-4c2f-8f5c-6f8e9949c082" ){ // Image selector [ leftcol + maincol ] 

		let k = 0;
		
		let imgselect = hdata?.payload.map((opt,indx)=>{
		
		    if(hdata?.imgkey === opt.key) k = indx;
		
		    return `<div class="p-2 my-2 fs-5${(hdata?.imgkey === opt.key) ? ' bg-light border text-dark' : ' text-black-50'}" data-bindto="${hdata?.bindto}" data-func="click" data-aval="${opt.key}">
						${opt.title}
				   </div>`
		}).join('')
		
		let imght = `<div class="py-4">
			<figure>
				<img alt="image" src="${hdata?.payload[k].src}" class="d-block mx-auto" style="height:70vh;" />
				<figcaption class="text-center text-black-50">${hdata?.payload[k].caption}</figcaption>
			</figure>
		</div>
		<div class="p-4 fs-5 mx-4 text-body">${hdata?.payload[k].body}</div>`
		
		return [ 
					["hwrite",true,"50110a76-fa72-42bf-9f66-69fb449ab60b", imgselect ], 
					["hwrite",true,"f7cf9396-967d-4204-9c67-b540f4c299d2", imght ], 
					["htrefresh","1584ab29-ce52-4c55-91db-8bd152f71152"] 
		]


	}
	else if (target == 'b63ac4e2-6ba6-48cd-a774-58d51e1eac12') {
		// Simple one col list

		let htrows = hdata?.list
			.map(row => {
				return `<div class="row">${row}</div>`;
			})
			.join('');

		return [
			['hwrite', true, '392d4701-9236-4a2e-bd7a-393bef4b5144', hdata?.title],
			['hwrite', true, '662a1e49-4e12-4689-9156-de979d68ee33', htrows],
			['htrefresh', '1584ab29-ce52-4c55-91db-8bd152f71152'],
		];
	} else if (target == '7262c360-e8a9-4244-90ba-b7fa53c4fb80') {
		// Simple dialog message

		let bht = `<button class="d-block w-75 mx-auto" data-bindto="${hdata?.bindto}" data-func="click">
		${hdata?.btxt}</button>`;

		return [
			['hwrite', true, '6fc8eb1e-ed79-459b-8040-481ffd075b6a', hdata?.message],
			['hwrite', true, 'cdc2d870-9973-4d04-a19d-ad5cefcce490', bht],
			['htrefresh', '8765b43a-3bda-4817-be1c-03bd5a04541c'],
		];
	} else if (target == 'c6456163-a6db-4d5c-9fac-02f8565f89ae') {
		// Dual choice Dialog

		let leftbtn = `<button class="d-block w-75 mx-auto" data-bindto="${hdata?.bindto}" data-func="click">
		${hdata?.left}</button>`;

		let rightbtn = `<button class="d-block w-75 mx-auto" data-bindto="${hdata?.bindto}" data-func="click">
		${hdata?.right}</button>`;

		return [
			['hwrite', true, '83aa8fa5-a82f-4823-a954-0fd0d6c91ec6', hdata?.message],
			['hwrite', true, '0e8d18c7-35fe-4eec-bc01-98da0ab22b05', leftbtn],
			['hwrite', true, 'd758214a-afec-449f-9781-1b69d7e3da02', rightbtn],
			['htrefresh', '8765b43a-3bda-4817-be1c-03bd5a04541c'],
		];
	}
};
