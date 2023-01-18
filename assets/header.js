const blog = document.querySelector('.header-site a');
const cv = document.querySelector('.header-site a:last-child');

blog.addEventListener('mouseover', notYetBlog);
blog.addEventListener('mouseout', notYetBlog);

cv.addEventListener('mouseover', notYetCV);
cv.addEventListener('mouseout', notYetCV);


function notYetBlog(e) {
    console.log(e);
    if (e.type == 'mouseover') {
        e.srcElement.childNodes[0].data = "Not Yet";
    }
    else if (e.type == 'mouseout') {
        e.srcElement.childNodes[0].data = "Blog";
    }
}
function notYetCV(e) {
    if (e.type == 'mouseover') {
        e.srcElement.childNodes[0].data = "Not Yet";
    }
    else if (e.type == 'mouseout') {
        e.srcElement.childNodes[0].data = "CV";
    }
}
