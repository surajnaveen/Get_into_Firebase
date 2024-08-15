import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"
import { getDatabase,ref,push,onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-b2b90-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const MoviesInDB = ref(database,"Movies")
//console.log(database)


const Button = document.getElementById("add-button")
const InputField = document.getElementById("input-field")
const List = document.getElementById("itemList")

Button.addEventListener("click",function(){
    let value = InputField.value
    push(MoviesInDB,value)

    ClearInput();

    SetValues(value);
})

onValue(MoviesInDB,function(snapshot){
    let bookArry = Object.values(snapshot.val())

    //console.log(bookArry)
    bookArry.forEach(function(elements) {
        console.log(elements)
    })
})

function ClearInput(){
     InputField.value = ""
}

function SetValues(Input){
    List.innerHTML += `<li>${Input}</li>`
}