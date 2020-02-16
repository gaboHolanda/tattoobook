$('#post-description').focus()

$('#new-image').click(function(event) {
    prevent(event) 
    $('#images-input').click()
})

let image_files = []

$('#images-input').click(function(event){
    event.stopPropagation()
})

$('#images-input').change(fileHandler.bind())

function fileHandler(event) {
    prevent(event);
    let files = event.target.files || event.originalEvent.dataTransfer.files;
    setPreview(files);
}

function setPreview(files) {
    let input = $('#images-input')
    $(files).each(function (i, file) {
        let id = makeId(10)
        image_files.push({
            file:file,
            id:id
        })
        $('#new-image').parent().before(createImg(URL.createObjectURL(file),id))
    });
    input.val('')
    updateCancelPostButton()
};

function createImg(src, id) {
    let $container = $('<div>', {
        class: 'thumb-uploaded-image',
        style:`background-image:url(${src})`
    }),

    $delete_span_button = $('<span>', {
        class: 'delete-thumb'
    }).appendTo($container)

    i = $('<i>', {class: 'fas fa-times'}).appendTo($delete_span_button);

    $container.attr('data-id', id);

    $container.click(function (e) {
        prevent(e);
    });

    $delete_span_button.click(function (e) {
        prevent(e);
        let id = $container.data('id')
        $chat_textarea = $('#images-input')
        let item_index = image_files.findIndex(x => x.id === id)
        image_files.splice(item_index,1)
        $chat_textarea.val('')
        $container.remove();
        updateCancelPostButton()
    });
    return $container;
};

let selected_tags_array = []

$('#select-tags-div > .select-item').click(function(){
    let id = $(this).data('id')
    let description = $(this).data('description')
    let selected = $(this).data('selected') == '1'
    if(selected){
        let item_index = selected_tags_array.findIndex(x => x.id == id)
        selected_tags_array.splice(item_index,1)
        $(this).data('selected','0')
    }else{
        selected_tags_array.push({
            id:id,
            description:description
        })
        $(this).data('selected','1')
    }
    $(this).toggleClass('selected')
    updateSelectedTags()
    updateCancelPostButton()
})

function updateSelectedTags(){
    let $selected_tags_div = $('#selected-tags')
    $selected_tags_div.html('')
    selected_tags_array.forEach((tag) => {
        $selected_tags_div.append($('<span>', {}).text('#'+tag.description))
    })
}

function getIdsArrayOfSelectedTags(){
    let ids_array = []

    selected_tags_array.forEach((tag) => {
        ids_array.push(tag.id.toString())
    })

    return ids_array
}

let $cancel_post = $('#cancel-post')

$cancel_post.click(function(){
    selected_tags_array = []
    $('.select-item.selected').data('selected','0').removeClass('selected')
    image_files = []
    $('#images-input').val('')
    let $post_content = $('#post-content').html('')
    let placeholder = $post_content.data('placeholder')
    $post_content.text(placeholder)
    $post_content.data('has-content','0')
    $post_content.addClass('no-focus')
    $('.thumb-uploaded-image').remove()
    $(this).addClass('none')
    updateSelectedTags()
})

$('#tags').click(function(){
    $('#select-tags-div').toggleClass('none')
})

$('[data-placeholder]').focus(function(){
    let has_content = $(this).data('has-content') == '1'
    $(this).removeClass('no-focus')
    if(!has_content){
        $(this).html('')
    }
})

$('[data-placeholder]').focusout(function(){
    if($.trim($(this).text())==''){
        $(this).addClass('no-focus')
        let placeholder = $(this).data('placeholder')
        $(this).text(placeholder)
        $(this).data('has-content','0')
        updateCancelPostButton()
    }else{
        $(this).data('has-content','1')
    }
})

$('#submit-post').click(() => {
    let files_transfer = new DataTransfer()
    image_files.forEach((file,index) => {
        files_transfer.items.add(file.file)
    })
    let $form = $('#form-post')
    let $chat_textarea = $('#images-input')
    $chat_textarea.prop('files',files_transfer.files)
    let $post_description = $('#post-content')
    let has_content = $post_description.data('has-content') == '1'
    let $textarea = $('textarea[name="description"]')
    let $select_tags = $('#select-tags-select')
    if(has_content){
        $textarea.val($.trim($post_description.html()))
    }else{
        $textarea.val('')
    }
    let selected_ids_itens = getIdsArrayOfSelectedTags()
    $select_tags.val(selected_ids_itens)
    $form.submit()
})


$('#post-content').on('input',function(){
    if($.trim($(this).text())!=''){
        $cancel_post.removeClass('none')
    }
})

function updateCancelPostButton(){
    if( 
        checkIfImagesIsEmpty() && 
        checkIfTagsIsEmpty() && 
        checkIfpostAreaIsEmpty()){
        $cancel_post.addClass('none')
    }else{
        $cancel_post.removeClass('none')
    }
}

function checkIfImagesIsEmpty(){
    return image_files.length == 0
}

function checkIfTagsIsEmpty(){
    return selected_tags_array.length == 0
}

function checkIfpostAreaIsEmpty(){
    let has_content = $('#post-content').data('has-content') == '1'
    return !has_content
}