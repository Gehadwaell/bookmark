var bookMarkName=document.getElementById("bookmarkName");
var bookmarkURL=document.getElementById("bookmarkURL");
var bookMarkList=[];
//localstorage condition
if(localStorage.getItem('bookmark')!=null){
    bookMarkList=JSON.parse(localStorage.getItem('bookmark'));
    displayData();
};
//submit
function submit(){
    var nameIsValid = validateName();
    var urlIsValid = validateURL();
    var errorBox=document.getElementById("errorBox")
    if (nameIsValid && urlIsValid) {
        var bookMark = {
            name: bookMarkName.value,
            URL: bookmarkURL.value
        };
        bookMarkList.push(bookMark);
        clearInputs();
        displayData();
        console.log(bookMarkList);
    } else {
        errorBox.style.display = 'block';
        clearInputs()
    }
    localStorage.setItem("bookmark",JSON.stringify(bookMarkList))
    
};
//clear
function clearInputs(){
    bookMarkName.value='';
    bookmarkURL.value='';
}
//display
function displayData(){
var container="";
for(var i=0;i<bookMarkList.length;i++){
container+=`
<tr>
<td>
  ${i}  
</td>
<td>
${bookMarkList[i].name}
</td>
<td>
    <a class="btn bg-success" href="${bookMarkList[i].URL}" target="_blank" id="visitBTN_${i}">
        <i class="fa-solid fa-eye pe-2"></i> visit
    </a>
</td>

<td>
    <button onclick="deleteItem(${i})" class="btn bg-danger" id="deleteBTN"><i class="fa-solid fa-trash-can pe-2"></i>delete</button>
</td>
</tr>`
  }
document.getElementById("tableBody").innerHTML = container;
}
//delete
function deleteItem(index){
bookMarkList.splice(index,1);
displayData()
    localStorage.setItem("bookmark", JSON.stringify(bookMarkList));
};
//name validation
function validateName() {
    var text=bookMarkName.value
    var regex = /^[a-zA-Z0-9\s]{3,}$/;
    if(regex.test(text)){
        bookMarkName.classList.add("is-valid")
        bookMarkName.classList.remove("is-invalid")
        return true
    }
    else{
        bookMarkName.classList.add("is-invalid")
        bookMarkName.classList.remove("is-valid")
        return false
    }

}
//url validation
function validateURL(url) {
    var text=bookmarkURL.value
    var regex = /^(ftp|http|https|www):\/\/[^ "]+$/;
    if(regex.test(text)){
        bookmarkURL.classList.add("is-valid")
        bookmarkURL.classList.remove("is-invalid")
        return true
    }
    else{
        bookmarkURL.classList.add("is-invalid")
        bookmarkURL.classList.remove("is-valid")
        return false
    }


}

geha