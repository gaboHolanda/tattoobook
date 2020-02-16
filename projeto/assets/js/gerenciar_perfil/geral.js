let $avatar = $('#avatar-cover')
let old_avatar = $avatar.css('background-image')

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