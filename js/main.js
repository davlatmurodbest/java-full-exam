let elbutton = document.querySelector('.button')
let token = window.localStorage.getItem('token')

// console.log(token);


if(!token){
    window.location.replace('login.html')
}


elbutton.addEventListener('click', () => {
    window.localStorage.removeItem('token')
    window.location.replace('login.html')
})


// useer render

let userbox = document.querySelector('.box1')
let usertemplate = document.getElementById('users').content


function renderuser(array) {
    userbox.innerHTML = null

    array.forEach(element => {
        
        let template = usertemplate.cloneNode(true)

        template.querySelector('.user__name').textContent = element.name
        template.querySelector('.nickname').textContent = element.username
        template.querySelector('.email__link').textContent = element.email
        template.querySelector('.email__link').href = element.email
        template.querySelector('.user__id__btn').dataset.userId = element.id

        userbox.appendChild(template)
    });
}


async function getuser() {
    let user = await fetch('https://jsonplaceholder.typicode.com/users')
    let userdata = await user.json()

    renderuser(userdata)
}

getuser()




let enterpost = document.querySelector('.user__id__btn')
let posttemplate = document.getElementById('posts').content
let postbox = document.querySelector('.box2')

userbox.addEventListener('click', (evt)=> {
     if(evt.target.matches('.user__id__btn')){
        let userId = evt.target.dataset.userId
         getposts(userId)
     }
})

async function getposts(userId) {
    let post = await fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    postbox.innerHTML = '';
    post.forEach(evt => {
        let postjon = posttemplate.cloneNode(true)

        postjon.querySelector('.post__name').textContent = evt.title
        postjon.querySelector('.post__body').textContent = evt.body
        postjon.querySelector('.post__id__btn').dataset.postId = evt.id

        postbox.appendChild(postjon)
    })
}
getposts()

let box3 = document.querySelector('.box3')
let commenttemplate = document.getElementById('comments').content

postbox.addEventListener('click', (evt) => {
    if(evt.target.matches('.post__id__btn')){
        let postId = evt.target.dataset.postId
        getcomments(postId)
    }
})

async function getcomments(postId) {
    let comment = await fetchData(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)

    box3.innerHTML = '';

    comment.forEach(evt => {
       let template = commenttemplate.cloneNode(true)

       template.querySelector('.comment__name').textContent = evt.name
       template.querySelector('.email__link').textContent = evt.email
       template.querySelector('.comment__body').textContent = evt.body

       box3.appendChild(template)
    })
}


async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}







