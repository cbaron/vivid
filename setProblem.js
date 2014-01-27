/* Hi VividSeats, here is the link to the puzzle I solved : http://rubyquiz.strd6.com/quizzes/225-distinct-sets
 * Note that the code was written in the interest of speed rather than code readability because I am solving
 * a potentially expensive problem.
 * Also note that I solve in two ways, first, I used underscore.js's intersection and union, next, I used my own.
 * On an OS X chrome environment, my solver is faster.  Excited to discuss the code with you!
*/

var inputs = [
    [ ["G", "J", "N"], ["D", "F", "G", "K"], ["E", "H"], ["B", "C", "J", "L", "Q"], ["C", "M"] ],
    [ ["A", "C", "E", "G", "H"], ["B", "I", "M"], ["E", "M", "O"] ],
    [ ["D", "E", "J", "L"], ["F", "K"], ["L", "M"], ["I", "K"], ["I", "K"] ],
    [ ["B", "E", "L", "M"], ["B", "I", "L", "O", "P"], ["A", "J", "O", "P"], ["A", "D", "F", "L"] ],
    [ ["E", "G", "K"], ["A", "C", "I", "J", "N"], ["C", "J", "M", "N"] ],
    [ ["A", "D", "E", "H"], ["D", "N", "P"], ["D", "I", "L", "P"] ],
    [ ["E", "F", "K", "N", "O"], ["A", "B", "C", "J", "P"] ],
    [ ["C", "H", "M"], ["D", "F", "L"], ["A", "E", "J", "O"], ["C", "H"], ["J", "K", "M"], ["A", "N", "Q", "T"] ]
];

/* constructor, used in bot methods */
var solver = function( input ) { this.inputs = input; return this; }

/* solve using underscore.js's intersection and union */
solver.prototype.underscore = function() {

    this.break = false;

    for( var i = 0, ii = this.inputs.length; i < ii; i++ ) {
         
        for( var j = i + 1, jj = this.inputs.length; j < jj; j++ ) {

            if( this.underscoreHasIntersection( i, j ) ) { break; }
        }

        if( this.break ) { break; }
        
        for( var j = i - 1, jj = 0; j > jj; j-- ) {
            
            if( this.underscoreHasIntersection( i, j ) ) { break; }

        }
        
        if( this.break ) { break; }
    }

    if( this.break ) { this.underscore(); }
    else { console.log( this.inputs ); }
};

solver.prototype.underscoreHasIntersection = function( i, j ) {

    if( _.intersection( this.inputs[ i ], this.inputs[ j ] ).length ) {
        this.inputs[ i ] = _.union( this.inputs[ i ], this.inputs[ j ] );
        this.inputs.splice( j, 1 );
        this.break = true;
        return true;
    }

    return false;
}
/* solve using underscore.js's intersection and union */



/* solve using my implementation using javascript's sort, and the shortcuts */
solver.prototype.myHasIntersection = function( i, j ) {

    var arrayI = this.inputs[ i ],
        arrayJ = this.inputs[ j ];

    if( this.myIntersect( arrayI, arrayJ ) ) {
        this.inputs[ i ] = this.myUnion( arrayI, arrayJ );
        this.inputs.splice( j, 1 );
        this.break = true;
        return true;
    }

    return false;
}

solver.prototype.myIntersect = function( arrI, arrJ ) {

    var i = 0,
        j = 0;

    while( ( i < arrI.length ) && ( j < arrJ.length ) ) {

        if( arrI[ i ] === arrJ[ j ] ) { return true; }

        else if( arrI[ i ] < arrJ[ j ] ) { i++; }
        
        else { j++; }
    }

    return false;
}

solver.prototype.myUnion = function( arrI, arrJ ) {

    var i = 0,
        ii = arrI.length,
        jj = arrJ.length,
        j = 0,
        union = [ ];

    while( ( i < ii ) && ( j < jj ) ) {

        if( arrI[ i ] === arrJ[ j ] ) { union.push( arrI[ i ] ); i++; j++; }

        else if( arrI[ i ] < arrJ[ j ] ) { union.push( arrI[ i ] ); i++; }
        
        else { union.push( arrJ[ j ] ); j++; }
    }

    while( i < ii ) { union.push( arrI[ i ] ); i++; }
    while( j < jj ) { union.push( arrJ[ j ] ); j++; }

    return union;
}

/* sort everything first */
solver.prototype.myTry = function() {

    for( var i = 0, ii = this.inputs.length; i < ii; i++ ) { this.inputs[i].sort(); }

    this.myGo();
}

solver.prototype.myGo = function() {

    this.break = false;

    for( var i = 0, ii = this.inputs.length; i < ii; i++ ) {
         
        for( var j = i + 1, jj = this.inputs.length; j < jj; j++ ) {

            if( this.myHasIntersection( i, j ) ) { break; }
        }

        if( this.break ) { break; }
        
        for( var j = i - 1, jj = 0; j > jj; j-- ) {
            
            if( this.myHasIntersection( i, j ) ) { break; }

        }
        
        if( this.break ) { break; }
    }

    if( this.break ) { this.another(); }
    else { console.log( this.inputs ); }
}

var begin = new Date().getTime();

_.each( inputs, function( input ) {
    new solver( input ).underscore(); } );

var end = new Date().getTime();
console.log( [ 'underscore : ', ( end - begin ) ].join('') );


begin = new Date().getTime();

_.each( inputs, function( input ) {
    new solver( input ).myTry(); } );

var end = new Date().getTime();
console.log( [ 'my try : ', ( end - begin ) ].join('') );
