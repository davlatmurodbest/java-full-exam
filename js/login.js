let elforminp = document.querySelector('.form__input')
let elpassword = document.querySelector('.form__password')
let elform = document.querySelector('.form')

elform.addEventListener('submit', (evt)=> {

    evt.preventDefault()

    let inputvalue = elforminp.value.trim();
    let paswordvalue = elpassword.value.trim();


    fetch('https://reqres.in/api/login', {
        method: 'POST' ,
        headers: {
            'Content-type' : 'application/json'
        },

        body: JSON.stringify({
            email: inputvalue,
            password: paswordvalue,
        }),
    }).then((res) => res.json()).then((data) => {
            if(data?.token) {
                window.localStorage.setItem('token', data.token)
                window.location.replace('index.html')
            }
        })
})