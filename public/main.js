
console.log("Hello from main.js")

// Listen for form submit
document.getElementById('linkForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
  // Get form values
  var linkName =document.getElementById('linkName').value;
  var linkUrl =document.getElementById('linkUrl').value;

  if(!validateForm(linkName, linkUrl, e)){
    setTimeout(function(){ RemoveErrorMessageFromPage(); }, 2000);
    return false;
  }

  var bookmark = {
    name: linkName,
    url: linkUrl
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('linkForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
};

// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//   e.preventDefault();
  // Re-fetch bookmarks
  fetchBookmarks();
  
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

        

    bookmarksResults.innerHTML += '<div class="bottom-links">'+
                                  '<h5>'+name+
                                  ' <a class="visit-btn" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="delete-btn" target="_blank" >Delete</a> ' +
                                //   ' <button><a onclick="deleteBookmark(\''+url+'\')" class="delete-btn"> Delete</a></button> ' +
                                  '</h5>'+
                                  '</div>';
  }
} 

// Validate Form
function validateForm(linkName, linkUrl, e){
// let urlErr = document.querySelector(".error-messages").textContent("Please use a valid URL").fadeIn();
// let urlErr = document.querySelector(".error-messages")
// let emptyErr = document.querySelector(".error-messages").textContent("Please fill in the form").fadeIn();
// console.log(urlErr)
  RemoveErrorMessageFromPage()
  if(!linkName || !linkUrl){
    // alert('Please fill in the form');
    // emptyErr.style.display = "inline";
    
    InsertErrorMessageIntoPage("Please fill in the form");
    e.preventDefault();
    return false;
    
  }
  
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!linkUrl.match(regex)){
    // alert('Please use a valid URL');
    InsertErrorMessageIntoPage("Please use a valid URL");
    document.getElementById('linkForm').reset();
    e.preventDefault();

    // urlErr.style.display = "inline";
    return false;

  }
  
  return true;
}



function InsertErrorMessageIntoPage(content) {
       var IDofContainer = "my-error-message-container";
       let mesg = document.getElementById(IDofContainer)
       mesg.style.display = "";
       mesg.innerHTML = content;
       mesg
    };

function RemoveErrorMessageFromPage()
    {
       var IDofContainer = "my-error-message-container";
       document.getElementById(IDofContainer).innerHTML = "";
       document.getElementById(IDofContainer).style.display = "none";
    };    


function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}

// const update = document.querySelector('#update-button')
// const deleteButton = document.querySelector('#delete-button')
// const messageDiv = document.querySelector('#message')

// var imgBackg = 'background-image: url(https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FL8cMIsY8SQ34HKsJax6E6w%252F800.jpg&width=1000&height=667&quality=80)';
// document.querySelector(".art-img").setAttribute('style', `${imgBackg}`);


// update.addEventListener('click', _ => {
//     fetch('/quotes', {
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Darth Vadar',
//             quote: 'I find your lack of faith disturbing.'
//         }) 
//     })
//     .then(res => {
//         if (res.ok) return res.json()
//     })
//     .then(response => {
//         window.location.reload(true)
//     })
// })

// deleteButton.addEventListener('click', _ => {
//     fetch('/quotes', {
//       method: 'delete',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: 'Darth Vadar'
//       })
//     })
//       .then(res => {
//         if (res.ok) return res.json()
//       })
//       .then(response => {
//         if (response === 'No quote to delete') {
//           messageDiv.textContent = 'No Darth Vadar quote to delete'
//         } else {
//           window.location.reload()
//         }
//       })
//       .catch(console.error)
//   })

