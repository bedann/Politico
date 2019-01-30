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