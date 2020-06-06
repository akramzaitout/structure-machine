
	//var tableResult = globalTable.result();
	//var tableVars = globalTable.vars();
	// varsOrder ==> table vars order
	// final.result[ order ] => value of the last cheac ( result )

	const factors = number => [...Array(number + 1).keys()].filter(i=>number % i === 0);

	const probabilityShaps = number => {
		let facs = factors(number);
		let result = [];
		for(let i=0;i<facs.length;i++){
			check:
			for(let j=0;j<facs.length;j++){
				if(facs[i]*facs[j] == number){
					result.push({ x:facs[i],y:facs[j] });
					break check;
				}
			}
		}
		return result;
	}

	const shape =  ops => {
		let p = [];
        let hX;
        let hY;
		hY = ops.pos.y;
		for (let i=1;i<=ops.size.y;i++) {
			hX = ops.pos.x;
			if(hY>=ops.area.y){
				hY=0;
			}
			for (let j=1;j<=ops.size.x;j++) {
				p.push({x:hX,y:hY,id:''+hX+''+hY});
				hX++;
				if(hX>=ops.area.x){
					hX=0;
				}
			}
			hY++;
		}
		return p;
	}

	const countOnes = (array , q = 1) => {
		let s=0;
		for (let i = 0; i < array.length; i++) {
			if(array[i] == q) {
				s++;
			}
		}
		return s;
	}

	const codeGray = (bits) =>{
		let result = [];
		let res = new Set();
			let i = 0;
			while( i < Math.pow(2,bits) ) {
				if( i == 0 ) {
					result[i] = [];
					for( let j = 0 ; j < bits ; j++ ) {
						result[i][j] = 0;
					}
				} else {
					result[i] = result[i-1];
					if( ( countOnes(result[i]) % 2) == 0 ) {
						result[i][ bits -1 ] = ( result[i][ bits -1 ] == 1 ) ? 0 : 1;
					} else {
						for( let j = bits -1 ; j >= 0 ; j-- ) {
							if( result[i-1][j] == 1 ) {
								result[i][j-1] = ( result[i][j-1] == 1 ) ? 0 : 1;
								break;
							}
						}
					}
				}
				res.add([...result[i]]);
				i++;
			}
		return [...res];
	};

	const generateTable = (varTable) => {
		let result = {};
		result.x = {vars : varTable[0] , value : codeGray(varTable[0].length)};
		result.y = {vars : varTable[1] , value : codeGray(varTable[1].length)};
		return result;
	};


// tableResult , tableVars
let simplification = function( tableResult , tableVars ) {

	if( countOnes(tableResult.final.result) == 0  ){
		return "0";
	}	else if( countOnes(tableResult.final.result , 0) == 0 )	{
		return "1";
	}	else	{

		let table = [];

		let varTable = [];
		varTable.push( tableVars.splice(0, Math.ceil(tableVars.length/2) ) );
		varTable.push( tableVars );

		const gentable = generateTable(varTable);

		// Make Real Table Function
		gentable.y.value.forEach( (firstItem,firstIndex) => {
			table[firstIndex] = [];
			gentable.x.value.forEach( (secendItem) => {
				let sIndex =  secendItem.toString().replace(/,/g,"") + firstItem.toString().replace(/,/g,"");
				let indexOfSearchIndex = tableResult.varsOrder.indexOf(sIndex);
				table[firstIndex].push( tableResult.final.result[ indexOfSearchIndex ] );
				//console.log( indexOfSearchIndex  , sIndex);
			});
		});

		const m2Size = [ table.length , table[0].length , Math.pow(2,varTable[0].length +varTable[1].length) ];

		let hVar = m2Size[2];

		let patterns = {};
		let p_s;

		do {
			let i,j;
			i=0;
			p_s = probabilityShaps(hVar).filter( (v) => v.x <= m2Size[1] && v.y <= m2Size[0]);

			patterns[hVar] =[];
			while( i < m2Size[0] ) {
				j=0;

				while ( j < m2Size[1] ) {

					for( let f =0 ; f < p_s.length ; f++ ) {

						let item =  shape({ 
							size:{ 
								x:p_s[f].x,
								y:p_s[f].y
							},
							area:{
								x:m2Size[1],
								y:m2Size[0]
							},
							pos :{
								x:j,
								y:i
							} 
						});

						let res = true;
						checkItems:
						for (let k = 0; k < item.length; k++) {
							if(table[ item[k].y ][ item[k].x ] == 0) {
								res = false;
								break checkItems;
							}
						}

						if( res ) {
							let resee =  JSON.stringify( item.sort() );
							if( patterns[hVar].indexOf( resee ) == -1 ) {
								patterns[hVar].push(resee);
							}
							
						}
					}
					j++;
				}
				i++;
			}
			hVar/=2;
		} while( hVar > 1/2 );

		let help = [];

		hVar*=2;

		do {
			for (let k = 0; k < patterns[hVar].length; k++) {
				let find = false;
				for ( const i in patterns ) {
						if( i <= hVar ) {
							continue;
						}
					for (let j = 0; j < patterns[i].length; j++) {
						let strings = patterns[hVar][k].substr(1,patterns[hVar][k].length-2 ).split('},{');
						let limitFindCount = 0;

						strings.forEach( (item) => {
							if( patterns[i][j].includes( item ) ) {
								limitFindCount++;	
							}
						});

						if(limitFindCount == strings.length) {
							find = true;
						}
						if(find) {
							continue;
						}
					}
				}
				if( !find ){
					help.push( JSON.parse( patterns[hVar][k] ) );
				}
			}
			hVar*=2;
		} while( hVar<=m2Size[2] )

		patterns = help;

		let result = [];
		let changes = [];
		let varXLen = (gentable.x.vars).length;
		let varYLen = (gentable.y.vars).length;
		let thisVars = [];

		for ( const i in patterns ) {
			changes = [];
			thisVars = [];
			for (let j = 0; j < patterns[i].length; j++) {
				// X
				for( let k = 0 ; k < varXLen ; k++ ) {
					if(! changes[ gentable.x.vars[k] ]) {
						changes[ gentable.x.vars[k] ] = [];
					}
					if(changes[ gentable.x.vars[k] ].indexOf( gentable.x.value[ patterns[i][j].x ][k] )  === -1) {
						changes[ gentable.x.vars[k] ].push(gentable.x.value[ patterns[i][j].x ][k]);
					}
				}
				// Y
				for( let k = 0 ; k < varYLen ; k++ ) {
					if(! changes[ gentable.y.vars[k] ]) {
						changes[ gentable.y.vars[k] ] = [];
					}
					if(changes[ gentable.y.vars[k] ].indexOf( gentable.y.value[ patterns[i][j].y ][k] )  === -1) {
						changes[ gentable.y.vars[k] ].push(gentable.y.value[ patterns[i][j].y ][k]);
					}
				}
			}

			Object.keys(changes).forEach(function (item) {
				if( changes[item].length == 1 ) {
					thisVars.push( ( changes[item][0] == 0 ) ? "!"+item : item );
				}
			});

			let f = "("+thisVars.join('.')+")";
			if(result.indexOf( f )  === -1) {
				result.push(f);
			}
		}
		return result.join('+');
	}
   
}

export default simplification