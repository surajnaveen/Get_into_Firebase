import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-b2b90-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const CartInDB = ref(database,"Shopping-cart")


const Button = document.getElementById("add-button")
const InputField = document.getElementById("input-field")
const List = document.getElementById("itemList")
const PopupClosingBtn = document.getElementById("closeBtn")
const AlertMassage = document.getElementById("warning")
const EmptyMasssage = document.getElementById("cartMsg")

PopupClosingBtn.addEventListener("click",function () {
    closePopup();
})

Button.addEventListener("click",function(){
    
    if (InputField.value=="") {
        showPopup();
    } else {
        let value = InputField.value
        push(CartInDB,value)

        ClearInput();
    }
    
})

onValue(CartInDB,function(snapshot){

    if (snapshot.exists()) {
        let bookArry = Object.entries(snapshot.val())

        EmptyMasssage.innerHTML = ""
        ClearItemLists()    //Clear list before add other values

        bookArry.forEach(function(elements) {
            SetValues(elements)
        })
    }
    else{
        ClearItemLists()
        EmptyMasssage.innerHTML = "Cart is empty"
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
        let location = ref(database,`Shopping-cart/${itemID}`)
        remove(location)
    })
    List.append(newElement)
}

function showPopup() {
    AlertMassage.innerHTML = "Please enter an item"
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}