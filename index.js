const Button = document.getElementById("add-button")
const InputField = document.getElementById("input-field")

Button.addEventListener("click",function(){
    let value = InputField.value
    console.log(value)
})