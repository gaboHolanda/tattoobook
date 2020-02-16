$("#buscar-tatuador").click(function(){
    $("#buscar-input").addClass("expanded")
    $('#pre-search-div').removeClass('none')
    $("#buscar-input").focus()
})

$("#buscar-input").focusout(function(){
    $(this).removeClass("expanded")
    $(this).val('')
    setTimeout(() => {
        $('#pre-search-div').addClass('none')
    },500)
})

let timer = null

$('#buscar-input').on('propertychange input',function(){
    let value = $(this).val()
    $('#query-search').text(value)
    clearTimeout(timer)
    timer = setTimeout(() => {
        preSearch(value)
    },500)
})

function preSearch(query){
    let url = $('#buscar-tatuador-form').attr('action')
    if(query.trim()!=''){
        $.get(url,{q:query}).done((response) => {
            let $presearch_users = $('#pre-search-users')
            $presearch_users.html('')
            response.tatuadores.forEach((tatuador,index) => {
                let $user_link = $('<a>',{
                    class:'user',
                    href:`/${tatuador.username}`
                })

                let has_avatar = tatuador.avatar!=null

                let avatar_class = has_avatar?'avatar':'avatar empty-avatar'

                let $avatar = $('<div>',{
                    class:avatar_class,
                })

                if(has_avatar){
                    $avatar.css('background-image',`url(${tatuador.avatar})`)
                }

                $avatar.appendTo($user_link)

                let $username = $('<span>',{
                    class:"username"
                }).text(`@${tatuador.username}`)

                $username.appendTo($user_link)

                $user_link.appendTo($presearch_users)
            })
        })
    }
}

$('[data-action="follow-user"]').click(function(){
    $(this).toggleClass('far fas')
})