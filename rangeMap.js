async function rangeMap(parent,extra) {
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
			children[i]=nameArray[2] + ' × ' + nameArray[4];
		} else if (wordCount>==3 && wordCount<==6 && wordCount!==5) {
			children[i]=nameArray[1] + ' ' + nameArray[2];
			for (let j=3;j<wordCount;j++) {
				children[i]+=' ';
				children[i]+=nameArray[j];
			}
		}
		sObj.queries[i].name=String.fromCharCode.apply(null,new TextEncoder().encode(children[i].name));
		sObj.queries[i].params='taxon_id='+children[i].id+extra;
	}
	const base64=encodeURIComponent(btoa(JSON.stringify(sObj)));
	const url='https://www.inaturalist.org/observations/compare?s='+base64;
	open(url);
}
