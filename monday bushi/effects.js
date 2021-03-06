const r = Math.round;
const a = document.querySelector('.a');
const b = document.querySelector('.b');
const hex = document.querySelector('#hex');
const atext = document.querySelector('#atext');
const btext = document.querySelector('#btext');
const result = document.querySelector('.result');
const ett = document.querySelectorAll(".ett");
const två = document.querySelectorAll(".två");
const tre = document.querySelectorAll(".tre");
const pInput = document.querySelector('[data-p]');
const aInput = document.querySelector('[data-a]');
const bInput = document.querySelector('[data-b]');

pInput.oninput = aInput.oninput = bInput.oninput = update;
update();

function update() {
	result.style.background = blend(aInput.value, bInput.value, Number(pInput.value));
	reset();
}

function reset() {
	const colormix = blend(aInput.value, bInput.value, Number(pInput.value));
	const boxshadow = 'inset 0 0 100vw ' + colormix;
	for(var i = 0; i < 2; i++){
		två[i].style['boxShadow'] = 'inset 0 0 100vw ' + aInput.value;
	}
	for(var i = 0; i < 2; i++){
		ett[i].style['boxShadow'] = 'inset 0 0 100vw ' + bInput.value;
	}
	for(var i = 0; i < 2; i++){
		tre[i].style['boxShadow'] = boxshadow;
	}
	hex.innerHTML = colormix;
	atext.innerHTML = aInput.value;
	btext.innerHTML = bInput.value;
}

function toRGBA(d) {
	const l = d.length;
	const rgba = {};
	if (d.slice(0, 3).toLowerCase() === 'rgb') {
		d = d.replace(' ', '').split(',');
		rgba[0] = parseInt(d[0].slice(d[3].toLowerCase() === 'a' ? 5 : 4), 10);
		rgba[1] = parseInt(d[1], 10);
		rgba[2] = parseInt(d[2], 10);
		rgba[3] = d[3] ? parseFloat(d[3]) : -1;
	} else {
		if (l < 6) d = parseInt(String(d[1]) + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? String(d[4]) + d[4] : ''), 16);
		else d = parseInt(d.slice(1), 16);
		rgba[0] = (d >> 16) & 255;
		rgba[1] = (d >> 8) & 255;
		rgba[2] = d & 255;
		rgba[3] = l === 9 || l === 5 ? r((((d >> 24) & 255) / 255) * 10000) / 10000 : -1;
	}
	return rgba;
}

function blend(from, to, p = 0.5) {
	from = from.trim();
	to = to.trim();
	const b = p < 0;
	p = b ? p * -1 : p;
	const f = toRGBA(from);
	const t = toRGBA(to);
	if (to[0] === 'r') {
		return 'rgb' + (to[3] === 'a' ? 'a(' : '(') +
			r(((t[0] - f[0]) * p) + f[0]) + ',' +
			r(((t[1] - f[1]) * p) + f[1]) + ',' +
			r(((t[2] - f[2]) * p) + f[2]) + (
				f[3] < 0 && t[3] < 0 ? '' : ',' + (
					f[3] > -1 && t[3] > -1
						? r((((t[3] - f[3]) * p) + f[3]) * 10000) / 10000
						: t[3] < 0 ? f[3] : t[3]
				)
			) + ')';
	}

	return '#' + (0x100000000 + ((
		f[3] > -1 && t[3] > -1
			? r((((t[3] - f[3]) * p) + f[3]) * 255)
			: t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255
		) * 0x1000000) +
		(r(((t[0] - f[0]) * p) + f[0]) * 0x10000) +
		(r(((t[1] - f[1]) * p) + f[1]) * 0x100) +
		r(((t[2] - f[2]) * p) + f[2])
	).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
}

function copyText() {
	/* Get the text field */
	var copyText = document.getElementById("hex");
  
	/* Select the text field */
	// copyText.select();
	// copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
	 /* Copy the text inside the text field */
	navigator.clipboard.writeText(copyText.innerHTML);
  
	/* Alert the copied text */
	alert(copyText.innerHTML + " has been copied to the clipboard!");
  }

  function handleChange(checkbox) {
	var all = document.getElementsByTagName("*");
    if(checkbox.checked == true){
        document.getElementsByClassName("resultbody")[0].style.backgroundColor ='#FFFFFF';
		for (var i=0, max=all.length; i < max; i++) {
			all[i].style.color = 'black';
	   }
	   document.getElementsByTagName("body")[0].style["fontWeight"] = 'bold';
	   document.getElementsByClassName("sider")[0].style.backgroundColor = '#ECECEC';
    }else{
		document.getElementsByClassName("resultbody")[0].style.backgroundColor ='#303030';
		for (var i=0, max=all.length; i < max; i++) {
			all[i].style.color = '#FFFFFF';
	   }
	   document.getElementsByClassName("sider")[0].style.backgroundColor = '#212121';
	   document.getElementsByTagName("body")[0].style["fontWeight"] = 'normal';
   }
   var bajs = document.getElementById("hex");
   var bajs2 = document.getElementById("blabla");
   bajs.style.color = '#FFFFFF';
   bajs.style["fontWeight"] = 'normal';
   bajs2.style.color = '#FFFFFF';
}