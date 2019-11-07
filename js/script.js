function postData(event) {
  event.preventDefault();
  const email = document.querySelector('.email');
  const password = document.querySelector('.pw');
  const username = document.querySelector('.username');
  console.log(email.value, password.value, username.value)
  fetch('http://thesi.generalassemb.ly:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        username: username.value
      })
    })
    .then((res) => {
      //console.log(res)
      return res.json();
    })
    .then((res) => {
      console.log(res)
      localStorage.setItem('user', res.token);
      // createPost();
    })
    .catch((err) => {
      console.log(err);
    })
}

function userLogin(event) {
  event.preventDefault();
  const emailUser = document.querySelector('.login');
  const passwordUser = document.querySelector('.password');
  console.log(emailUser.value, passwordUser.value)
  fetch('http://thesi.generalassemb.ly:8080/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: emailUser.value,
              password: passwordUser.value,
          })
  })
  .then((res) => {
     return res.json();
  })
  .then((res) => {
    console.log(res)
      localStorage.setItem('user', res.token);
      // if(res.httpStatus !== 'BAD_REQUEST')
      if (localStorage.getItem("user") !== "undefined") {
        alert("Welcome to Reddit!")
        document.querySelector(".form-inline").style.display = "none";
      }else{
        alert("Email and Password is invalid, please try again")
      }
  //      window.location.href = "index.html";
  //     }else{
  //      localStorage.clear();
  //     }
  })
  .catch((err) => {
      console.log(err);
  })
}

function updateDom() {
  document.querySelector('.signupForm').style.display = "none";
  document.querySelector('.postForm').style.display = "block";
  fetch("http://thesi.generalassemb.ly:8080/user/post/", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('user')
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const list = document.querySelector('.posts');
      for (let i = 0; i < res.length; i++) {
        const item = document.createElement('p');
        const title = document.createElement('h3');
        const description = document.createElement('p');
        item.appendChild(title);
        item.appendChild(description);
        title.innerText = res[i].title;
        description.innerText = res[i].description;
        list.appendChild(item);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

function createPost(event) {
  event.preventDefault();
  const title = document.querySelector('.title');
  const description = document.querySelector('.description');
  fetch("http://thesi.generalassemb.ly:8080/post/", {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('user'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value
      })
    })
    .then((res) => {
      console.log(res);
      updateDom(res);
    })
    .catch((err) => {
      console.log(err);
    })
}

function displayAll(event) {
  const allPosts = document.querySelector(".postForm");
  fetch("http://thesi.generalassemb.ly:8080/post/list", {
      method: "GET",
      headers: {
        "Content-Type": "  application/json"
      },
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      const list = document.querySelector(".posts");
      for (let i = 0; i < res.length; i++) {
          const item = document.createElement("p");
          const title = document.createElement("h3");
          const description = document.createElement("p");
          item.appendChild(title);
          item.appendChild(description);
          title.innerText = res[i].title;
          description.innerText = res[i].description;
          list.appendChild(item);
        }
    })
};
displayAll();

// Get the modal
let modal = document.getElementById("myModal");
// Get the button that opens the modal
let btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

function userProfile(event){
  event.preventDefault();
  const adEmail = document.querySelector('.adEmail');
  const mobile = document.querySelector('.mobile');
  const address = document.querySelector('.address');
  console.log(adEmail.value, mobile.value,address.value);
  fetch('http://thesi.generalassemb.ly:8080/profile',{
    method:'POST',
    headers: {
      'Authorization': "Bearer " + localStorage.getItem('user'),
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      additionalEmail: adEmail.value,
      mobile: mobile.value,
      address: address.valiue
    })
  })
  .then((res) => {
    console.log(res);
    updateDom(res);
  })
  .catch((err) => {
    console.log(err);
  })
}
