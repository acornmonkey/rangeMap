function kadic(n,k,r) {
	const m = Math.floor(n/k);
	const c = n%k;
	const ceilog = Math.ceil(Math.log2(m+1));
	const h = ((2*(m-ceilog)+1)/2**ceilog+c)*360/k;
	const s = 100-Math.floor(n/r/3)%2*50;
	const l = 75-Math.floor(n/r)%3*25;
	return 'hsl(' + h + ',' + s + ',' + l + ')';
}
async function rangeMap(parent,extra,colFunc,colArgs) {
	const parentInfo=await (await fetch('https://api.inaturalist.org/v1/taxa/'+parent)).json();
	const children=parentInfo.results[0].children;
	const sObj={queries:[],tab:"map",taxonFrequenciesSortOrder:"asc",colorScheme:"categorical"};
	if (extra==null) {
		extra='';
	}
	for (let i=0;i<children.length;i++) {
		sObj.queries.push({});
		let nameArray=children[i].name.split(' ');
		let wordCount=nameArray.length;
		if ( !children[i].name.includes('×') || (children[i].name[0]==='×' && wordCount===3) ) {
			children[i].name=nameArray[wordCount-1];
		} else if (wordCount===5 && nameArray[3]==='×') {
			children[i].name=nameArray[2] + ' × ' + nameArray[4];
		} else if (wordCount>=3 && wordCount<=6 && wordCount!==5) {
			children[i].name=nameArray[1] + ' ' + nameArray[2];
			for (let j=3;j<wordCount;j++) {
				children[i].name+=' ';
				children[i].name+=nameArray[j];
			}
		}
		sObj.queries[i].name=String.fromCharCode.apply(null,new TextEncoder().encode(children[i].name));
		sObj.queries[i].params='taxon_id='+children[i].id+extra;
		if (colFunc!=null) {
			if (colArgs!=null) {
				sObj.queries[i].color=colFunc(i,...colArgs);
			} else {
				sObj.queries[i].color=colFunc(i);
			}
		}
	}
	const base64=encodeURIComponent(btoa(JSON.stringify(sObj)));
	const url='https://www.inaturalist.org/observations/compare?s='+base64;
	open(url);
}
