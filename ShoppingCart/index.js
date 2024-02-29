import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push ,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://shoppingcart-4114e-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings);
// console.log(app);
const database = getDatabase(app);
const CartItems = ref(database, "ShoppingList")// reference is like a table inside the database, where the name of the table is ShoppingList.


onValue(CartItems, function(snapshot){
    let itemsArray = Object.entries(snapshot.val()) 

    if(snapshot.exists()){
        // console.log(itemsArray)
        //console.log(snapshot.val())
        document.getElementById("shopping-list").innerHTML="";
        for(let i=0;i<itemsArray.length;i++){
            // console.log(itemsArray[i][1]);
            let currentItem = itemsArray[i];
            let currentItemID = itemsArray[i][0]
            let currentItemValues = itemsArray[i][1]
            render(itemsArray[i]);
        }
    }
    else{
        document.getElementById("shopping-list").innerHTML = "No items in the list. ";
    }
    
})

const inputField = document.getElementById('input-field');
const addBtn= document.getElementById('add-btn');
// console.log(addBtn);

// pushes the item into the database once the button is clicked. 
addBtn.addEventListener("click", function(){
    const inputVal = inputField.value;
    push(CartItems, inputVal);
    console.log(`${inputVal} added to the database named ShoppingList`)
    // render(inputVal);
    reload()
})

function reload(){
    inputField.value="";
}

// function to take Enter (keypress) as an Event to click the button.
inputField.addEventListener("keypress", function(event){
    console.log(event.key);
    if(event.key==="Enter"){
        addBtn.click();
    }
})

// we cant use innerHTML now as we want to apply an onclick event listener to the li. So once any li is clicked it gets deleted from the database. so to do this we use the createElement and appendChild(). 

function render(item){
    // to have render the item. 
    let itemID=item[0];
    let itemValue = item[1];
    let ulliEl= document.getElementById("shopping-list");
    // ulliEl.innerHTML+=`<li>${item}</li>`; 
    let newulli = document.createElement("li");
    newulli.textContent=itemValue;
    newulli.addEventListener("dblclick", function(){
        // console.log(itemID);
        let exactLocationOfItem = ref(database, `ShoppingList/${itemID}`);
        remove(exactLocationOfItem);
    })
    ulliEl.appendChild(newulli);

}

