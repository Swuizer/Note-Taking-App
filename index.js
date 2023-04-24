console.log("Welcome to Short Notes App in InnerPre.js");
showNotes();

//if user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click",function(e){
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let today = new Date();
    let addTime = document.getElementById("addTime");
    let time = today.toLocaleString("en");
    let dtime = time;
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        time: dtime
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    count++;
    showNotes();
});

// Your Details
let DetailsBtn = document.getElementById("details");
var count;
if(count >= 0){
    count += 0;
}else{
    count = 0;
}

DetailsBtn.addEventListener("click", () => {

    DetailsBtn.innerHTML = `Total Post ${count}`;
    setTimeout(() => {
        DetailsBtn.innerHTML = `Your Post Details`;  
    }, 2000)
});

//Function to show elements from localStorage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html +=`<div class="noteCard card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <div class="deleteBtn">
                <button  id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                <div id="addTime" class="Span"> ${element.time}</div>
            </div>
        </div>
    </div>`;
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML = `<p class="lastPara">Nothing to show! Use" Add a Note" section above to add notes.</p>`;
    }


}
//Function to delete a note
function deleteNote(index){
    count--;
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxtAll = element.getElementsByTagName("h5")[0].innerText;
        let cardTxt = cardTxtAll.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    });
});