$('#avatar-dropdown').click(() => {
    $('#avatar-dropdown-content').toggleClass('hide')
    $('#avatar-dropdown-content').toggleClass('show')
})

$('#logout').click(() => {
    $('#logout-form').submit()
})