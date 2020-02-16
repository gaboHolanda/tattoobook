let open_chats = []

$('[data-action="send-message"]').click(function(){
    let target_id = $(this).data('target-id')
    let data = {
        target_id:target_id
    }
    $.post('/chat/create',data).done((response) => {
        createChatInstance(response.target_name,target_id,response.chat_id,response.messages,response.status)
    })
})

function createChatInstance(target_name,target_id,chat_id,messages,status){
    open_chats.push(chat_id)
    let chat_class = status == 2?'chat hide':'chat'
    let is_empty_avatar = $('#avatar-nav-menu').hasClass('empty-avatar')
    let avatar_url = null
    if(!is_empty_avatar){
        avatar_url = $('#avatar-nav-menu').css('background-image')
    }
    let $chat = $('<div>',{
        class:chat_class
    })

    let $chat_header = $('<div>',{
        class:'chat-header'
    }).appendTo($chat)

    let $span = $('<span>',{
        class:'username'
    }).text(target_name).appendTo($chat_header)

    let $i = $('<i>',{
        class:'fas fa-times'
    }).appendTo($chat_header)

    $i.click(() => {
        $chat.remove()
        let index = open_chats.indexOf(chat_id)
        open_chats.splice(index,1)
        $.post('/chat/change-chat-status',{
            status:0,
            chat_id
        })
    })

    let $chat_body = $('<div>',{
        class:'chat-body',
    }).appendTo($chat)

    $chat_header.click((event) => {
        if(event.target == $chat_header.get(0)){
            let status = $chat.hasClass('hide')?1:2
            $chat_header.parent().toggleClass('hide')
            $chat_body.get(0).scrollTop = $chat_body.get(0).scrollHeight
            $.post('/chat/change-chat-status',{
                status,
                chat_id
            })
        }
    })

    if(messages!=null){
        messages.forEach((message) => {
            let message_class = message.user_id == target_id?'message other':'message me'
            let has_avatar = message.avatar != null
            let $message_div = $('<div>',{
                class:message_class
            })
            let $avatar = null;
            if(has_avatar){
                $avatar =$('<span>',{
                    class:'avatar',
                }).css('background-image',`url(${message.avatar})`)
            }else{
                $avatar =$('<span>',{
                    class:'avatar empty-avatar',
                })
            }
            $avatar.appendTo($message_div)
            $('<span>',{
                class:'line'
            }).text(message.message).appendTo($message_div)

            $message_div.appendTo($chat_body)
        })
    }

    let $chat_footer = $('<div>',{
        class:'chat-footer'
    }).appendTo($chat)

    let $form = $('<form>',{
        method:'POST',
        style:'margin:0',
        action:''
    }).appendTo($chat_footer)


    $('<input>',{
        type:'hidden',
        name:'csrfmiddlewaretoken',
        value:csrf
    }).appendTo($form)

    let $chat_textarea = $('<textarea>',{
        autocomplete:'off',
        name:'message',
        placeholder:'Envie uma mensagem',
        autogrow:'',
        maxlength:256,
        rows:1
    }).appendTo($form)

    $chat_textarea.keypress((e) => {
        let code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $form.submit()
            return true;
        }
    })

    let chat_socket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/chat/chat' + chat_id + '/');
    
    chat_socket.onmessage = function(e) {
        let data = JSON.parse(e.data);
        let message = data['message'];
        let avatar = data['avatar']
        let chat_target_id = data['target_id']
        let chat_id = data['chat_id']
            if(chat_target_id!=target_id){
                if(open_chats.includes(chat_id)){
                    let $message = $('<div>',{
                        class:'message other'
                    })
                    if(avatar==null){
                        $('<span>',{
                            class:'avatar empty-avatar'
                        }).appendTo($message)
                    }else{
                        $('<span>',{
                            class:'avatar'
                        }).css('background-image',avatar).appendTo($message)
                    }
                    $('<span>',{
                        class:'line'
                    }).text(message).appendTo($message)
                    $message.appendTo($chat_body)
                    $chat_body.get(0).scrollTop = $chat_body.get(0).scrollHeight
                }
                else{
                    openChat(chat_id)
                }
            }
        
    };
    
    chat_socket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    $form.submit((event) => {
        event.preventDefault()
        let text_area_value = $chat_textarea.val()
        if(text_area_value.trim() != ''){
            let form_data = {
                chat_id:chat_id,
                message:text_area_value
            }
            $.post('/chat/sendmessage',form_data).done(() => {
                chat_socket.send(JSON.stringify({
                    'message': text_area_value,
                    'avatar':avatar_url,
                    'target_id':target_id,
                    'chat_id':chat_id
                }));
            })
            let $message = $('<div>',{
                class:'message me'
            })
            if(is_empty_avatar){
                $('<span>',{
                    class:'avatar empty-avatar'
                }).css('background-image',avatar_url).appendTo($message)
            }else{
                $('<span>',{
                    class:'avatar'
                }).css('background-image',avatar_url).appendTo($message)
            }
            $('<span>',{
                class:'line'
            }).text(text_area_value).appendTo($message)

            $chat_textarea.val('')
            $chat_textarea.attr('placeholder','Envie uma mensagem')
            $message.appendTo($chat_body)
            
            $chat_body.get(0).scrollTop = $chat_body.get(0).scrollHeight
        }
    })
    
    $chat.appendTo($('#chats'))
    $chat_body.get(0).scrollTop = $chat_body.get(0).scrollHeight
}

function openChat(chat_id){
    $.post('/chat/open-chat',{
        chat_id:chat_id
    }).done((chat) => {
        createChatInstance(chat.target_name,chat.target_id,chat.chat_id,chat.messages,chat.status)
    })
}

$.post('/users/get-chats',{}).done((response) => {
    response.chats.forEach((chat) => {
        createChatInstance(chat.target_name,chat.target_id,chat.chat_id,chat.messages,chat.status)
    })
})