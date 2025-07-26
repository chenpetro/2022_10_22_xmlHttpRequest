const btnGetPosts = document.querySelector(".get-posts");
const btnAddPosts = document.querySelector(".add-posts");
const postBox = document.querySelector(".posts-box");




function getPosts(callback) {
  const xhr = new XMLHttpRequest();
  // console.log(xhr);
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
  xhr.addEventListener("load", () => {
    console.log("Loaded successfully");
    const response = JSON.parse(xhr.response);
    // console.log(response);
    callback(response);
  });

  xhr.addEventListener("error", () => {
    console.log("not OK");
  });

  xhr.send();
}





btnGetPosts.addEventListener("click", () => {
  getPosts((response) => {
    renderPosts(response)

    })

  });

function cardTemplate(post) {
     const card = document.createElement("div");
    // card.className = "card";
    card.classList.add('card');
    const cardBody = document.createElement("div");
    cardBody.classList.add('card-body');
    const title = document.createElement('h4');
    title.classList.add('card__title');
    title.textContent = post.title; 
    const article = document.createElement('p');
    const id = document.createElement('div');
    id.classList.add('card__id');
    id.textContent = post.id;
    article.classList.add('card__text');
    article.textContent = post.body; 
    cardBody.append(title, article, id);
    card.appendChild(cardBody);
    return card;
      // innerHTML
      // textContent
      // innerText
      // nodeValue

    // console.log(card);

}


function renderPosts(response) {
      // console.log(response);
    const fragment = document.createDocumentFragment()
    response.forEach(post => {
    const card = cardTemplate(post);
          fragment.appendChild(card)
})
    postBox.appendChild(fragment);
}
////////////////////////////////////////////


// function hi() {
//   let a = '1234';
//   result(a)
// }

// hi(a)

// console.log(a);


//////////////////////////////////////////////

// let user = {
//   name: 'ivan',
//   age: 22
// }

// console.log(user.name);



btnAddPosts.addEventListener('click', (e) =>{
  
  const newPost = {
    title: 'title post',
    body: 'body text post',
    id: 1,
  }
  
  createPost(newPost, response => {
    // console.log(response);
    const card = cardTemplate(response);
    postBox.insertAdjacentElement('afterbegin', card);
    console.log(card);
    
  })

})




function createPost(body, cb){
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts')
  xhr.addEventListener('load', () =>{
    const response = JSON.parse(xhr.responseText);
    cb(response);
  })
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(JSON.stringify(body));
  xhr.addEventListener('error', () => {
    console.log('Error creating post');
  });
}