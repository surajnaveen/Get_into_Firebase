import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-b2b90-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const MoviesInDB = ref(database,"Movies")


const Button = document.getElementById("add-button")
const InputField = document.getElementById("input-field")
const List = document.getElementById("itemList")

Button.addEventListener("click",function(){
    let value = InputField.value
    push(MoviesInDB,value)

    ClearInput();
})

onValue(MoviesInDB,function(snapshot){

    if (snapshot.exists()) {
        let bookArry = Object.entries(snapshot.val())

        ClearItemLists()    //Clear list before add other values

        bookArry.forEach(function(elements) {
            SetValues(elements)
        })
    }
    else{
        List.innerHTML = "No items here.. yet"
    }
})

function ClearItemLists(){
    List.innerHTML = ""
}

function ClearInput(){
     InputField.value = ""
}

function SetValues(Input){
    //console.log(Input)
    let itemID = Input[0]
    let itemName = Input[1]
    //List.innerHTML += `<li>${Input}</li>`

    let newElement = document.createElement("li")
    newElement.textContent = itemName
    newElement.addEventListener("click",function(){
        let location = ref(database,`Movies/${itemID}`)
        remove(location)
    })
    List.append(newElement)
}