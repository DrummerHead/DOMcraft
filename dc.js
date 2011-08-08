// initial variables

var wW = $(window).width(),
    wH = $(window).height(),
    d,
    celld,
    size = 7, //according to taste
    cellsNum = size*size,
    cells,
    li = '<li></li>',
    appendHtml = '';


// sets a the number to which all sizes are calculated according to landscape vs portrait length; using this, sets size for cells

console.log('wW = '+wW+', wH = '+wH)

if (wW > wH) {
  d = wH;
} else {
  d = wW;
}

celld = Math.floor(d/size);
console.log('celld = '+celld);



// appends cells according to size variable

for (var i = 0; i < cellsNum; i++) {
  appendHtml += li;
}
console.log('appendHtml = '+appendHtml )

$('#w').append(appendHtml )

console.log('d = '+d);

$('li').css({width:celld,height:celld});
$('#w').css({width:d});
