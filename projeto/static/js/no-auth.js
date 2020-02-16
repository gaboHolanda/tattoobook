if(document.getElementById('pense')!=null){
    setTimeout(() => {
        document.getElementById('pense').classList.toggle('zero-opacity')
        document.getElementById('pense').classList.toggle('full-opacity')
        setTimeout(() => {
            document.getElementById('procure').classList.toggle('zero-opacity')
            document.getElementById('procure').classList.toggle('full-opacity')
            setTimeout(() => {
                document.getElementById('tatue').classList.toggle('zero-opacity')
                document.getElementById('tatue').classList.toggle('full-opacity')
            },700)
        },700)
    },100)
}

let user_type_inputs = document.querySelectorAll("input[name='user-type']")
if(user_type_inputs.length > 0){
    for(let input_count = 0;input_count < user_type_inputs.length; input_count++){
        user_type_inputs[input_count].addEventListener('change',function(){
            let id = this.id
            let elements = document.getElementsByClassName('radio-label')
            for(let radio_count = 0 ; radio_count < elements.length;radio_count ++ ){
                elements[radio_count].classList.add('disabled')
                elements[radio_count].classList.remove('enabled')
            }
            document.querySelector(`label[for='${id}']`).classList.remove('disabled')
            document.querySelector(`label[for='${id}']`).classList.add('enabled')
        })
    }
    document.getElementById('username').addEventListener('input',function(){
        let value = this.value
        value = value = value.toLowerCase().replace(/[^\w-_]/g,'')
        this.value = value
    })
}