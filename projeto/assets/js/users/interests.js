let tags_chosen = []

$("[data-action='clickable-tag-card']").click(function(){
    $(this).toggleClass('selected')
    let id = parseInt($(this).data('id'))
    if(tags_chosen.includes(id)){
        let index = tags_chosen.indexOf(id)
        tags_chosen.splice(index,1)
    }else{
        tags_chosen.push(id)
    }
})

$('#choose-preferences-button').click(() => {
    let $form = $('#choose-preferences-form')
    if(tags_chosen.length > 0){
        tags_chosen.forEach((tag) => {
            let $chat_textarea = $('<input>',{
                type:'text',
                name:'tags',
                value:tag,
                hidden:'hidden'
            })
            $chat_textarea.appendTo($form)
        })
        $form.submit()
    }
})