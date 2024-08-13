import {add} from "./function.js"

console.log(add(10,6))

const appSettings = {
    DatabaseURL: "https://playground-bd4eb-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const Button = document.getElementById("add-button")
const InputField = document.getElementById("input-field")

Button.addEventListener("click",function(){
    let value = InputField.value
    console.log(value)
})