import $ from 'jquery';
window.jQuery = $;
window.$ = $;

$.ajaxSetup({
    data:{
        csrfmiddlewaretoken:$('input[name="csrfmiddlewaretoken"]').val()
    }
});

require('../thirdy-party-libraries/owlcarousel/owl.carousel')

import {makeId, prevent} from './global_methods'
window.makeId = makeId
window.prevent = prevent
window.csrf = $('input[name="csrfmiddlewaretoken"]').val()

require('./feed/nav')

require('./post/adjust-images')
require('./post/poster')
require('./post/publication-options')
require('./post/publication-edit')

require('./perfil/editar-perfil')

require('./search/buscar-tatuador')

require('./chat/chat')

require('./users/interests')
