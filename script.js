function getPosts(callback){
    
    const xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.addEventListener('load', () =>{
        console.log('Loaded successfully');
        const response = JSON.parse(xhr.response)
        console.log(response);

        callback(response)
    })
    
    xhr.addEventListener('error', () =>{
        console.log('not OK');
    
    })
    
    xhr.send()


}


getPosts((response) =>{
    console.log(response);
    
});



