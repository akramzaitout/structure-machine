function TruthTable(f = "") {
    this.f = f;
    this.vars = function() {
        let result = [];
        for (let i=0; i<(this.f).length; i++) {
            if((this.f)[i] != "+" && (this.f)[i] != "." && (this.f)[i] != "!" && (this.f)[i] != "(" && (this.f)[i] != ")" ) {
                if(result.indexOf((this.f)[i])  === -1) {
                    result.push((this.f)[i]);
                }
            }
        }
        return result.sort();
    }
    this.varsCount = function() {
        return this.vars().length;
    }
    this.prob = function(vars = this.vars() ) {
        let allProb = {};
        let r = Math.pow(2, vars.length );
        for(let v=0;v< vars.length ;v++) {
            allProb[ String(vars[v]) ] = [];
            r = r/2;
            let p  = r;
            for(let i=0;i<( Math.pow(2, vars.length ) );i++) {
                allProb[vars[v]][i] = (p>0) ? 0 : 1;
                p--;
                if( p ===  -(r) ) {
                    p = p*-1;
                }
            }
        }
        return allProb;
    }
    this.c = ["a","AND","b"];
    this.infixToPostfix = function(){
        let v = this.f.split('');
        let stock = [];
        const opr = { '(':3,')':3,"+":2,".":1,"!":0 };
        let result = []; 
        v.forEach( (item) => {
            if( item != '(' && item != ')' && item != '+' && item != '.' && item != '!' ) {
                result.push(item);
            } else if( item == '(' ) {
                stock.push(item);
            } else if( item == ')' ) {
                while( stock[ stock.length-1 ] != '(' ) {
                    result.push(stock[ stock.length-1 ]);
                    stock.pop();
                }	
                stock.pop();
            } else if( item == "+" || item == "." || item == "!" ) {
                while( opr[ stock[ stock.length-1 ] ] < opr[item] ) {
                    result.push(stock[ stock.length-1 ]);
                    stock.pop();
                }
                stock.push(item);
            }
        });
        while( stock.length > 0 ) {
            result.push(stock[ stock.length-1 ]);
            stock.pop();
        }
        return result;
    }
    this.result = function() {
        let fun = this.infixToPostfix();
        let result = [];
        let pr = this.prob();
        let i = 0;
        while( fun.length > 1 && i < fun.length ) {
            let id = result.length;
            let u = {
                'id': id,
                'exp': '',
                'result':[]
            }
            if( fun[i] == "!" ) {
                u.exp = "!"+fun[i-1];
                let s = ( ( typeof( fun[i-1] ) != "number" ) ? pr[ fun[i-1] ] : result[ Number( fun[i-1] ) ].result );
                for(let k=0;k<( Math.pow(2,this.varsCount()) );k++) { 
                    u['result'][k] = this.not(  s[ k ] );
                }
                fun.splice( i-1 , 2, id );
                result.push(u);
                i=-1;
            } else if( fun[i] == "+" || fun[i] == "." ) {
                let f = ( ( typeof( fun[i-1] ) != "number" ) ? pr[ fun[i-1] ] : result[ Number( fun[i-1] ) ].result );
                let s = ( ( typeof( fun[i-2] ) != "number" ) ? pr[ fun[i-2] ] : result[ Number( fun[i-2] ) ].result );
                switch(fun[i]) {
                    case '+' : 
                        u.exp = fun[i-2]+"+"+fun[i-1];
                        for(let k=0;k<( Math.pow(2,this.varsCount()) );k++) { 
                            u['result'][k] = this.or(f[k],s[k]);
                        }
                        break;
                    case '.' :
                        u.exp = fun[i-2]+"."+fun[i-1]; 
                        for(let k=0;k<( Math.pow(2,this.varsCount()) );k++) { 
                            u['result'][k] = this.and(f[k],s[k]);
                        }
                        break;
                }
                fun.splice( i-2 , 3, id );
                result.push(u);
                i=-1;
            }
            i++;
        }
        let helper = [];
        Object.keys(pr).forEach(function (item) {
            helper.push( {exp : item , result : pr[item]} );
        });

        result.unshift(...helper);
        return {result,...{ "vars" : pr },final : result[fun[0]]};
    }
    this.and = function(a,b) {
        return a && b ? 1 : 0;
    }
    this.or = function(a,b) {
        return a || b ? 1 : 0;
    }
    this.not = function(a) {
        return (a == 1) ? 0 : 1;
    }
}

export default TruthTable