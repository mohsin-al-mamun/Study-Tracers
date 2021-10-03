let Btn = document.getElementById("submit");
let Table = document.getElementById("tbody");
let DaTe = document.getElementById("date");
let Target = document.getElementById("target");
let Completed = document.getElementById("completed");
let Pendings = document.getElementById("pending");
let ClearAll = document.getElementById("clearbtn");

let pending = 0; // This will be modified  by a function.

showItems()


Btn.addEventListener("click", makeItems);
ClearAll.addEventListener("click", eraseAll);


function makeItems(){
    let temp = Target.value - Completed.value ;
    if (temp==0){ 
       pending = pending;
   }else if (temp>0){
       pending = temp + pending;
   }else{
       diff = Completed.value - Target.value
       if (pending> diff){
           pending = pending - diff
       }else{
           pending =0;
       }
   }
    
    let userData = `<tr><th>${DaTe.value}</th><td> ${Target.value} hr </td><td> ${Completed.value} hr </td><td> ${pending} hr </td> </tr>`;
    let getLocalStorage = localStorage.getItem('General');
    if (getLocalStorage==null){
        contentsArray = [];
    }else{
        
        contentsArray = JSON.parse(getLocalStorage);
        
        
    }
    if(DaTe.value && Target.value && Completed.value  ){
        contentsArray.push(userData);

        //  Removing previous inputed data from the input fields.
            DaTe.value= null;
            Target.value=null;
            Completed.value=null;
            // Pendings.value=null;
            
    }else{
        alert (" Please, Give value to all the input box.");
    };
    
    localStorage.setItem("General",JSON.stringify(contentsArray) );


    showItems()
}

function showItems(){
    let contentsArray;
    let getLocalStorage = localStorage.getItem('General');
    if (getLocalStorage==null){
        contentsArray = [];  
    }else{
        contentsArray = JSON.parse(getLocalStorage);
        if (contentsArray.length>0){
            document.getElementById("table").style.visibility= "visible";
            ClearAll.style.visibility="visible";
        }
        // document.getElementById("table").style.visibility= "visible";   
    }

    let finalContent = '';
    if (contentsArray){
        contentsArray.forEach(element => {
        finalContent += element;
        });
    }
    
    Table.innerHTML = finalContent;
   
}




// localStorage.removeItem("General");

function eraseAll(e){
    let deletE = confirm("This will delete the full table, Are You sure?")
    if (deletE){
        localStorage.removeItem("General");
        location.reload();
    }
}
