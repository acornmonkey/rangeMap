async function rangeMap(parent,extra) {
	const parentInfo=await (await fetch('https://api.inaturalist.org/v1/taxa/'+parent)).json();
	const children=parentInfo.results[0].children;
	let sObj={queries:[],tab:"map",taxonFrequenciesSortOrder:"asc",colorScheme:"categorical"};
	if (extra==null) {
		extra='';
	}
	for (let i=0;i<children.length;i++) {
		sObj.queries.push({});
		sObj.queries[i].name=String.fromCharCode.apply(null,new TextEncoder().encode(children[i].name));
		sObj.queries[i].params='taxon_id='+children[i].id+extra;
	}
	const base64=encodeURIComponent(btoa(JSON.stringify(sObj)));
	const url='https://www.inaturalist.org/observations/compare?s='+base64;
	open(url);
}