$(document).ready(function(){
    $('.image-container img').each((index,element) => {
        if( (element.naturalHeight / element.naturalWidth) < 0.6666666666666667 ) {
            $(element).addClass('is_y')
        }else{
            $(element).addClass('is_x')
        }
    })
})

