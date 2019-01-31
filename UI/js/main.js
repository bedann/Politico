
function switchTab(tab,group){
    var i;
    var x = document.getElementsByClassName(group);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
        x[i].style.opacity = 0; 
    }
    document.getElementById(tab).style.opacity = 1;
    document.getElementById(tab).style.display = "block";
}

function showNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function showParty(){
      window.location = 'party-detail.html'
  }


const uploadButton = document.querySelector('.browse-btn');
const fileInfo = document.querySelector('.file-info');
const realInput = document.getElementById('real-input');

uploadButton.addEventListener('click', (e) => {
    document.getElementById('real-input').click();
});

realInput.addEventListener('change', () => {
  const name = realInput.value.split(/\\|\//).pop();
  const truncated = name.length > 20 
    ? name.substr(name.length - 20) 
    : name;
  
  fileInfo.innerHTML = truncated;
});

/////////////
const uploadButton2 = document.querySelector('.browse-btn2');
const fileInfo2 = document.querySelector('.file-info2');
const realInput2 = document.getElementById('real-input2');

uploadButton2.addEventListener('click', (e) => {
  realInput2.click();
});

realInput2.addEventListener('change', () => {
  const name = realInput2.value.split(/\\|\//).pop();
  const truncated = name.length > 20 
    ? name.substr(name.length - 20) 
    : name;
  
  fileInfo2.innerHTML = truncated;
});


////MODALS

function closeModal(_id){
    document.getElementById(_id).style.display='none';
}


function showModal(modal_id){
    document.getElementById(modal_id).style.display='block';
}