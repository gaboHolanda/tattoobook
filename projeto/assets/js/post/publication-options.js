$("i[data-action='toggle-dropdown']").click(function(){
    let target = $(this).data('target')
    $(`#${target}`).toggleClass('hide')
})


$('[data-action="toggle-modal-delete"]').click(function(){
    let post_id = $(this).data('id')
    toggleModalDelete(post_id)
})

$('#delete-post-form').submit(function(event){
    event.preventDefault()
    let $form = $(event.target)
    let form_data = {}
    $form.find("input[name]").each(function(index,node){
        form_data[node.name] = node.value
    })
    let url = $form.attr('action')
    let post_id = form_data.post_id
    $.post(url,form_data).done(() => {
        $card_deletado = $('<div>',{
            class:'card card-success',
        }).text('Publicação deletada')
        $(`#publication-${post_id}`).replaceWith($card_deletado)

        $card_deletado.fadeOut(1500,function(){
            $card_deletado.css({"visibility":"hidden",display:'block'}).slideUp("slow",function(){
                $card_deletado.remove()
            })
        })
        toggleModalDelete(post_id)  
    }).fail(() => {
        $card_error = $('<div>',{
            class:'card card-danger',
        }).text('Ocorreu um erro ao tentar deletar a publicação. Tente novamente mais tarde')
        $(`#publication-${post_id}`).before($card_error)
        $card_error.fadeOut(5000,function(){
            $card_error.css({"visibility":"hidden",display:'block'}).slideUp("slow",function(){
                $card_error.remove()
            })
        })
        toggleModalDelete(post_id)
    })
})

function toggleModalDelete(post_id){
    $delete_post_modal = $('#delete-post-modal')
    if(!$delete_post_modal.hasClass('hide')){
        $('#delete-post-modal-input').val('')
    }else{
        $('#delete-post-modal-input').val(post_id)
    }
    $(`#options-${post_id}`).addClass('hide')
    $('#page-unfocus').toggleClass('disabled')
    $('.body-content').toggleClass('blured')
    $('body').toggleClass('no-scroll')
    $('.nav-user').toggleClass('blured')
    $('#delete-post-modal').toggleClass('hide')
}

