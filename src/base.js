const R = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var Base = {
    getOctalOfAnyBase: function(n) {
            var b=0;
            for ( b= 0 ; b< R.length ; b++) {
            if( R[b] == n ) {
                break;
            }
            }
            return (R[b]==n) ? b : false ;
    },
    getAnyBaseOfOctal: function(n) {
            return R.length > n ? R[n] : false;
    },
    convertFrom10ToB: function(n,to){

        if ( Number(n) !== false ) {

            let lastrest = Number(n);
            let t = new Array;

            while(lastrest>0){
            t[t.length]= Base.getAnyBaseOfOctal(lastrest%to);
            lastrest= Math.floor(lastrest/to);
            }

            return Number(n) != 0 ? Base.fromAtoZ(t) : "0";

        } else {
            return false;
        }

    },
    convertFromBTo10: function(n,from){
    var number = String(n);
    var selectedNumber;
    var s=0;
    var sp=1;
    for(let i=1;i<=number.length;i++){
        selectedNumber = Base.getOctalOfAnyBase(String(number[ number.length - i]));

        if( selectedNumber === false && selectedNumber >= from ) {
        return false;
        } else {
            s+= (sp)*selectedNumber;
            sp*=from;
        }

    }
    return (s);
    },
    convertBase: function(n,from,to){

    if( from != to ) {
        if( from == 10 ) {
        return Base.convertFrom10ToB(n,to);
        } else {
        return Base.convertFrom10ToB(Base.convertFromBTo10(n,from),to);
        }
    } else {
        return n;
    }

    },
    fromAtoZ: function(t){
        var i=0;
        var k = 0
        var j=(t.length)-1;
        var help=0;
        var array = [];

        for ( k = 0 ; k < t.length; k++) {
        array[k] = t[k];
        }

        while(i<j){
        help= array[i];
        array[i]=array[j];
        array[j]=help;

        i++;
        j--;
        }

        var result = "";
        for ( k = 0 ; k < array.length ; k++) {
        result += array[k];
        }

        return result;
    }
}
export default Base