const fileContainer = document.querySelector('.files')

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems, {});
  });

let path = "../../uploads/"

function createImage(imagePath){
    let html = `<div class='card img-cont' j-data=${imagePath}> <img src=${path}${imagePath} class='materialboxed'> <a href='/images/remove?file=${imagePath}'>Remove</a></div>`
    fileContainer.innerHTML += html   
}

fetch('/images').then(res=>{
    return res.json();
}).then(images=>{
    images.forEach(img=>{
        createImage(img)
    })
}).catch(err=>{
    console.log(err)
})