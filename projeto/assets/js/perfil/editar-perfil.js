let $avatar = $('#avatar-cover')
let old_avatar = $avatar.css('background-image')
let $cover = $('#cover')
let old_cover = $cover.css('background-image')
let avatar_blob_url = null
let cover_blob_url = null

$('#avatar-edit-button').click(() => {
    $('#avatar-edit-input').click()
})

$('#avatar-edit-input').click((event) => {
    event.stopPropagation()
})

$('#avatar-edit-input').change(function(event){
    prevent(event)
    $('#update-buttons').removeClass('none')
    let file = event.target.files[0]
    let source_url = URL.createObjectURL(file)
    avatar_blob_url = source_url
    $avatar.removeClass('empty-avatar')
    $avatar.css('background-image',`url(${source_url})`)
})

$('#cover-edit-button').click(() => {
    $('#cover-edit-input').click()
})

$('#cover-edit-input').click((event) => {
    event.stopPropagation()
})

$('#cover-edit-input').change(function(event){
    prevent(event)
    $('#update-buttons').removeClass('none')
    let file = event.target.files[0]
    let source_url = URL.createObjectURL(file)
    cover_blob_url = source_url
    $cover.removeClass('empty-avatar')
    $cover.css('background-image',`url(${source_url})`)
})

$('#cancel-update').click(() => {
    $('#cover-edit-input').val('')
    $('#avatar-edit-input').val('')
    $('#update-buttons').addClass('none')
    avatar_blob_url = null
    cover_blob_url = null
    $avatar.css('background-image',old_avatar)
    $cover.css('background-image',old_cover)
    if($avatar.data('has-avatar')==0)
        $avatar.addClass('empty-avatar')
})

$('#update').click(() => {
    $('#update-setting-form').submit()
})

$('#update-setting-form').submit(function(event){
    event.preventDefault()
    let url = $(this).attr('action')
    let form_data = new FormData(event.target)
    $.ajax({
        url:url,
        type:'POST',
        data:form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: (response) => {
            $('#update-buttons').addClass('none')
            if(avatar_blob_url!==null){
                let $nav_avatar = $('#avatar-nav-menu')
                $nav_avatar.removeClass('empty-avatar')
                $nav_avatar.css('background-image',`url(${avatar_blob_url})`)
                old_avatar = `url(${avatar_blob_url})`
                avatar_blob_url = null
            }

            if(cover_blob_url!==null){
                old_cover = `url(${cover_blob_url})`
                cover_blob_url = null
            }
        }
    })
})