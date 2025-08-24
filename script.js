const btnGetPosts = document.querySelector(".get-posts");
const btnAddPosts = document.querySelector(".add-posts");
const postBox = document.querySelector(".posts-box");
const popUp = document.querySelector('.pop-up');
const form = document.querySelector('.form-add-post');
const closePopUp = document.querySelector('.close-popup');
console.log(closePopUp);
closePopUp.addEventListener('click', function(e) {
  e.preventDefault();
  popUp.hidden = true;
})
// form





// popup

// popUp.addEventListener('mousedown', popupMove)

// function popupMove(e) {
//   // console.log(popUp.offsetWidth);
//   // console.log(e.pageX);
//     console.log("Popup move");
//       popUp.style.cursor = "grabbing";
//       popUp.style.left = e.pageX-popUp.offsetWidth/2 + 'px';
//       popUp.style.top = e.pageY-popUp.offsetHeight/2 + 'px';  
//       document.addEventListener("mousemove", popupMove);
//     }

// popUp.addEventListener("mouseup", function () {
//   document.removeEventListener("mousemove", popupMove);
//   popUp.style.cursor = "default";
//   })  
  // popup

//////////////////////////////////////////////////
let active = false; 
let currentX; 
let currentY; 
let initialX; 
let initialY; 
let xOffset = 0; 
let yOffset = 0;

document.addEventListener("touchstart", dragStart, false); 
document.addEventListener("touchend", dragEnd, false); 
document.addEventListener("touchmove", drag, false);



document.addEventListener("mousedown", dragStart, false); 
document.addEventListener("mouseup", dragEnd, false); 
document.addEventListener("mousemove", drag, false);

function dragStart(e) {
   if (e.type === "touchstart") { 
    initialX = e.touches[0].clientX - xOffset; 
    initialY = e.touches[0].clientY - yOffset; 
  } else { 
    initialX = e.clientX - xOffset; 
    initialY = e.clientY - yOffset; 
  } 

  if (e.target === popUp) {
     active = true; 
     addActiveClass() 
    }
}

function dragEnd(e) { 
  initialX = currentX; 
  initialY = currentY; 
  active = false; 
  addActiveClass() 
}

function addActiveClass() { 
  popUp.classList.toggle('popup-move'); 
}

function drag(e) { 
  if (active) {
    e.preventDefault();

    if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
    } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, popUp);
}
}

function setTranslate(currentX, currentY, el) { 
  el.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)"; 
}
















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



// btnAddPosts.addEventListener('click', (e) =>{
  form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title');
  const text = formData.get('text');
  console.log(title);
    
  let newPost = {
    title: title,
    body: text,
    id: 1,
  }
  form.reset();

// })
  // const newPost = {
  //   title: 'title post',
  //   body: 'body text post',
  //   id: 1,
  // }
  
  createPost(newPost, response => {
    // console.log(response);
    const card = cardTemplate(response);
    postBox.insertAdjacentElement('afterbegin', card);
    // console.log(card);
    
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

// lesson 7 03.12