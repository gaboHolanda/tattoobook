const edit_elements = {}
const all_tags = []
const list_tags_url = $('input#list-tags-url').val()

$.post(list_tags_url).then((response) => {
    response.tags.forEach((tag) => {
        all_tags.push({
            id:tag.id,
            slug:tag.slug,
            text:tag.description
        })
    })
})

$('[data-action="publication-edit"]').click(function(){
    let post_id = $(this).data('id')
    startEdit(post_id)
})

$('[data-action="publication-boost"]').click(function(){
    let post_id = $(this).data('id')
    let url = $('#boost-post-url').val()
    $.post(url,{
        post_id
    }).done((response) => {
        let is_boosted = response.is_boosted
        $(this).text(is_boosted?'Pausar impulsionamento':'Impulsionar')
    })
})

function startEdit(post_id){
    if(edit_elements[post_id] == null){
        edit_elements[post_id] = {}
        edit_elements[post_id].deleted_old_images = []
        edit_elements[post_id].new_images = []
        edit_elements[post_id].tags_id = []
        edit_elements[post_id].files = []
        setPublicationElements(post_id)
        $(`#options-${post_id}`).addClass('hide')
        $(`#toggler-options-${post_id}`).addClass('none')
        edit_elements[post_id].description.attr('contentEditable','')
        edit_elements[post_id].description.addClass('editable')
        replaceFooterElementToEditableFooter(post_id)
        replaceTagsElementToEditableTags(post_id)
        replaceImageElementsToEditableImages(post_id)
    }
}

function setPublicationElements(post_id){
    edit_elements[post_id].publication = $(`#publication-${post_id}`)
    edit_elements[post_id].tags = $(`#tags-${post_id}`)
    edit_elements[post_id].description = $(`#description-${post_id}`)
    edit_elements[post_id].images = $(`#images-${post_id}`)
    edit_elements[post_id].footer = $(`#footer-${post_id}`)
}

function replaceFooterElementToEditableFooter(post_id){
    edit_elements[post_id].editable_footer = $('<div>',{
        class:'editable-footer'
    })

    let $save_button = $('<button>',{
        class:'btn-editable success',
        text:'Salvar',
        type:'button'
    }).appendTo(edit_elements[post_id].editable_footer)

    let $cancel_button = $('<button>',{
        class:'btn-editable danger',
        text:'Cancelar',
        type:'button'
    }).appendTo(edit_elements[post_id].editable_footer)

    $cancel_button.click(()=>{
        closeEdit(post_id)
    })
    
    $save_button.click(() => {
        saveEdit(post_id)
    })

    edit_elements[post_id].footer.addClass('none')
    edit_elements[post_id].footer.after(edit_elements[post_id].editable_footer)
}

function saveEdit(post_id){
    let url = $('#update-post-url').val()
    let description = edit_elements[post_id].description.html()
    let tags = edit_elements[post_id].tags_id
    let deleted_old_images = edit_elements[post_id].deleted_old_images
    let data = {
        post_id:post_id,
        tags:tags,
        description:description,
        deleted_old_images:deleted_old_images,
        files:edit_elements[post_id].files
    }

    let $form = createFormEditToSubmit(data)

    let form_data = new FormData($form.get(0))

    $.ajax({
        url:url,
        type:'POST',
        data:form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: (response) => {
            createTagsContainerIfCurrentIsNull(post_id)
            replaceTagsFromTagsContainer(post_id)
            replaceImagesOnCarousel(response.images,post_id)
            closeEdit(post_id,true)
        }
    })
}

function replaceImagesOnCarousel(images,post_id){
    let owl = edit_elements[post_id].images
    owl.owlCarousel()
    let $wraped_div = $('<div>')

    edit_elements[post_id].editable_images.find('img.old').each((index,img) => {
        let src = $(img).attr('src')
        let id = $(img).data('imgid')
        let $parent_div = createCarouselItem(src,id)
        $parent_div.appendTo($wraped_div)
    })

    images.forEach((image,index) => {
        let $parent_div = createCarouselItem(image.path,image.id)
        $parent_div.appendTo($wraped_div)
    })

    owl.trigger('replace.owl.carousel',$wraped_div.html())
}

function createCarouselItem(src,id){
    let $parent_div = $('<div>')

    let $background = $('<div>',{
        class:'publication-background',
        style:`background-image:url(${src})`
    })

    $background.appendTo($parent_div)

    let $img = $('<img>',{
        'data-imgid':id
    })

    $img.attr('src',src)

    let $image_container = $('<div>',{
        class:'image-container'
    }).append($img)

    $image_container.appendTo($parent_div)

    return $parent_div
}

function createFormEditToSubmit(data){
    let $form = $('<form>',{
        enctype:'multipart/form-data',
        method:'POST'
    })

    let $multiple_input = createMultipleFileInput(data.files)

    let $tags_input = createMultipleSelect('tags',data.tags)

    let $old_images = createMultipleSelect('deleted_old_images',data.deleted_old_images)

    $multiple_input.appendTo($form)
    $tags_input.appendTo($form)
    $old_images.appendTo($form)

    $('<input>',{
        name:'csrfmiddlewaretoken',
        value:csrf,
        type:'text'
    }).appendTo($form)

    $('<input>',{
        name:'post_id',
        value:data.post_id,
        type:'text'
    }).appendTo($form)

    $('<textarea>',{
        name:'description',
    }).val(data.description).appendTo($form)

    return $form
}

function createMultipleFileInput(files){
    let files_transfer = new DataTransfer()
    files.forEach((file,index) => {
        files_transfer.items.add(file.file)
    })

    let $multiple_input = $('<input>',{
        name:'images',
        multiple:'multiple',
        type:'file'
    })

    $multiple_input.prop('files',files_transfer.files)

    return $multiple_input
}

function createMultipleSelect(name,values){
    let $multiple_select = $('<select>',{
        multiple:'multiple',
        name:name
    })

    values.forEach((value,index) => {
        $('<option>',{
            value:value
        }).appendTo($multiple_select)
    })

    $multiple_select.val(values)

    return $multiple_select
}

function createTagsContainerIfCurrentIsNull(post_id){
    if(!edit_elements[post_id].tags.length){
        $parent_div = $('<div>',{
            class:'publication-tags none',
            id:`tags-${post_id}`
        })

        edit_elements[post_id].description.before($parent_div)

        edit_elements[post_id].tags = $parent_div
    }
}

function replaceTagsFromTagsContainer(post_id){
    edit_elements[post_id].tags.empty()
    all_tags.forEach((tag,index) => {
        let is_in = edit_elements[post_id].tags_id.includes(tag.id)
        let href = `/app/tag/${tag.id}/${tag.slug}`
        if(is_in){
            $('<a>',{
                href:href,
                'data-tagid':tag.id
            }).text('#'+tag.text).appendTo(edit_elements[post_id].tags)
        }
    })
}

function closeEdit(post_id,has_updated = false){
    edit_elements[post_id].editable_images.remove()
    edit_elements[post_id].editable_footer.remove()
    edit_elements[post_id].editable_tags.remove()
    edit_elements[post_id].description.removeAttr('contentEditable')
    edit_elements[post_id].description.removeClass('editable')
    edit_elements[post_id].images.removeClass('none')
    edit_elements[post_id].footer.removeClass('none')
    checkIfTagsAreEmptyThenThreat(post_id)
    if(has_updated){
        resizeCarouselImages(post_id)
    }
    $(`#toggler-options-${post_id}`).removeClass('none')
    clearEditElements(post_id)
}

function resizeCarouselImages(post_id){
    edit_elements[post_id].images.find('.image-container img').each((index,element) => {
        $(element).bind('load',function(){
            if( (element.naturalHeight / element.naturalWidth) < 0.6666666666666667 ) {
                $(element).addClass('is_y')
            }else{
                $(element).addClass('is_x')
            }
        })        
    })
}

function checkIfTagsAreEmptyThenThreat(post_id){
    if(edit_elements[post_id].tags_id.length){
        edit_elements[post_id].tags.removeClass('none')
    }else{
        edit_elements[post_id].tags.remove()
    }
    
}

function clearEditElements(post_id){
    edit_elements[post_id] = null
}

function replaceTagsElementToEditableTags(post_id){
    let $tags = edit_elements[post_id].tags
    $tags.find('a').each((index,item) => {
        let tagid = $(item).data('tagid')
        edit_elements[post_id].tags_id.push(tagid)
    })

    edit_elements[post_id].editable_tags = $('<div>',{
        class:'editable-tags'
    })

    all_tags.forEach((tag,index) => {
        let is_selected = edit_elements[post_id].tags_id.includes(tag.id)
        let class_name = is_selected?'selected':''
        let $span = $('<span>',{
            'data-tagid':tag.id,
            'data-selected':is_selected?1:0,
            class:class_name
        }).text(tag.text).appendTo(edit_elements[post_id].editable_tags)

        $span.click(() => {
            let selected = $span.data('selected') == 1
            if(selected){
                $span.removeClass('selected')
                $span.data('selected',0)
                let index = edit_elements[post_id].tags_id.indexOf(tag.id)
                if(index > -1){
                    edit_elements[post_id].tags_id.splice(index,1)
                }
            }else{
                $span.addClass('selected')
                $span.data('selected',1)
                edit_elements[post_id].tags_id.push(tag.id)
            }
        })
    })

    $tags.addClass('none')
    edit_elements[post_id].description.before(edit_elements[post_id].editable_tags)
}

function replaceImageElementsToEditableImages(post_id){
    let $images = edit_elements[post_id].images
    let images_information = []
    $images.find('img').each((index,item) => {
        let src = $(item).attr('src')
        let imgid = $(item).data('imgid')
        images_information.push({
            src,
            imgid,
            index
        })
    })
    edit_elements[post_id].editable_images = $('<div>',{
        class:'editable-images'
    })
    images_information.forEach((item,index) => {
        let $div_img = $('<div>',{
            class:'thumb-container'
        }).appendTo(edit_elements[post_id].editable_images)

        let $img = $('<img>',{
            class:'old',
            src:item.src,
            'data-imgid':item.imgid
        }).appendTo($div_img)

        let $delete_image =  $('<i>',{
            class:'fas fa-times',
        }).appendTo($div_img)

        $delete_image.click( () => {
            edit_elements[post_id].deleted_old_images.push(item.imgid)
            $delete_image.remove()
            $img.animate({
                height:0,
                'margin-right':0,
                'margin-bottom':0,
            },500,() => {
                $div_img.remove()
            })
        })
    })
    $images.addClass('none')
    $images.after(edit_elements[post_id].editable_images)
    let $multiple_input = $('<input>',{
        multiple:'multiple',
        type:'file',
        hidden:'hidden'
    }).appendTo(edit_elements[post_id].editable_images)

    let $new_image_button_div = $('<div>')

    let $new_image_button = $('<button>',{
        class:'new-image'
    }).append($('<i>',{
        class:'fas fa-plus'
    })).appendTo($new_image_button_div)

    $new_image_button.click(() => {
        $multiple_input.click()
    })

    $multiple_input.click((event) => {
        event.stopPropagation()
    })

    $multiple_input.change(function(event){
        prevent(event);
        let files = event.target.files || event.originalEvent.dataTransfer.files;
        $(files).each(function (i, file) {
            let id = 'edit' + makeId(10)
            edit_elements[post_id].files.push({
                file:file,
                id:id
            })

            let source_url = URL.createObjectURL(file)

            let $img = $('<img>',{})

            let $div_image = $('<div>',{
                class:'thumb-container'
            }).append($img)

            $img.attr('src',source_url)

            let $delete_image = $('<i>',{
                class:'fas fa-times',
                'aria-hidden':'true'
            })

            $delete_image.appendTo($div_image)

            $new_image_button_div.before($div_image);

            $delete_image.click( () => {
                let file_index = edit_elements[post_id].files.findIndex(x => x.id === id)
                edit_elements[post_id].files.splice(file_index,1)
                $delete_image.remove()
                $img.animate({
                    height:0,
                    'margin-right':0,
                    'margin-bottom':0,
                },500,() => {
                    $div_image.remove()
                })
            })
        });
        $(this).val('')
    })

    $new_image_button_div.appendTo(edit_elements[post_id].editable_images)
}