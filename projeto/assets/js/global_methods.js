function makeId(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let count = 0; count < length; count++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function prevent(event) {
    event.preventDefault();
    event.stopPropagation();
}

export {makeId,prevent}