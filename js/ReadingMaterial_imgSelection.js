function randomInt(max) { // [0 to max)
    var rand = Math.floor(Math.random() * max);
    return rand;
}

function displayImage(){
    const numImages = 180;
    var rand = randomInt(numImages);
    document.bottle.src = '../images/shampoo/img' + rand + '.jpeg';
}
