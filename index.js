console.log("Welcome to MyNotes. Get Started.");
showNotes();

document.addEventListener("keypress", function (event){
    if(event.key == 'Enter')
        addNote();

});

//Delete all Notes
document.getElementById("delBtn").addEventListener("click", deleteAllNotes);

function deleteAllNotes(){
    let answer = confirm("Are you sure, you want to delete all the Notes?\nNote: This change is irreversible.");
    if(answer){
        localStorage.removeItem("mynotes");
        localStorage.removeItem("mytitle");
        showNotes();
    }
}

//Store the Note to the Local Storage
document.getElementById("addBtn").addEventListener("click", addNote);

function addNote(){
    let addText = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("mynotes");
    let title = localStorage.getItem("mytitle");
    if(notes == null){
        notesObj = [];
        titleObj = [];
    }
        
    else{
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }
        

    notesObj.push(addText.value);
    titleObj.push(addTitle.value);

    localStorage.setItem("mynotes", JSON.stringify(notesObj));
    localStorage.setItem("mytitle", JSON.stringify(titleObj));
    addText.value = "";
    addTitle.value = "";
    showNotes();
}

function showNotes() {
    let notes = localStorage.getItem("mynotes");
    let title = localStorage.getItem("mytitle");
    if(notes == null){
        notesObj = [];
        titleObj = [];
    }
        
    else{
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }

    let html = "";

    notesObj.forEach(function(element, index){
        let hereTitle = titleObj[index];
        html = `
                <div class="card mx-2 my-2 cardNotes" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${hereTitle}</h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-danger">Delete</a>
                    </div>
                </div>
                ` + html;
    })
    let notesElm = document.getElementById("notes");
    if(notesObj.length !=0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show here! Add some notes first.`
    }
}

// Function to delete a note

function deleteNote(index){
    let notes = localStorage.getItem("mynotes");
    let title = localStorage.getItem("mytitle");
    if(notes == null){
        notesObj = [];
        titleObj = [];
    }
        
    else{
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }
        
    notesObj.splice(index, 1);
    titleObj.splice(index, 1);

    localStorage.setItem("mynotes", JSON.stringify(notesObj));
    localStorage.setItem("mytitle", JSON.stringify(titleObj));

    showNotes();
}

let search = document.getElementById("searchText");
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("cardNotes");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal))
            element.style.display = "block";
        else
            element.style.display = "none";
    })
})