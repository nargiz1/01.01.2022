$(document).ready(function(){
    if(localStorage.getItem("data")){
        let dataToChoose=JSON.parse(localStorage.getItem("data"));
        if(dataToChoose.length!=0){
            for (const item of dataToChoose){
                createTask(item);
            }      
            
            $("#delete-selected").show();
            $("#delete-all").show();
        }
        localStorage.setItem("data", JSON.stringify(dataToChoose));
    }
    else{
        localStorage.setItem("data", JSON.stringify([]));
    }
    
    $(document).on("click", "#myBtn", function(){
        AddTask();
    })
    
    $(document).on("click", "#delete-all", function(){
        DeleteAll();
    })
    
    $(document).on("click", "#delete-selected", function(){
        DeleteSelected();
    })
    
    document.addEventListener("keyup", function(e){
    if(e.keyCode==13){
        AddTask();
    }
    if(e.keyCode==8 && this.querySelector(".list-group-item.active")){
        DeleteSelected();
    }
    else if(e.keyCode==8 && !this.querySelector(".list-group-item.active")){
        DeleteAll();
    }
    })
    
    function AddTask(){
    let textValue=$("#myTextInput").val().trim();
    let dateValue=$("#myDateInput").val();
    myDateInput.value="";
    myTextInput.value="";
    
    if((textValue=="" || dateValue=="")){
        alert("Cannot create empty task");
        return;
    }
    
    let d1= new Date(dateValue);
    let d2= new Date();
    
    let obj={
        task: textValue,
        date: (msToMin(d1 - d2) + " minutes left."),
    }
    
    let dataArr= JSON.parse(localStorage.getItem("data"));
    dataArr.push(obj);
    
    localStorage.setItem("data", JSON.stringify(dataArr));
    
    createTask(obj);
    
        $("#delete-selected").show();
        $("#delete-all").show();
    }
    
    function msToMin(time) {
        return Math.round(time / 60000);
    }
    
    function createTask(item){
        $("#taskWrapper").append("<li>"+item.task+"</li>");
        $("li").addClass("list-group-item");
       
        $("ul li:last-child").append("<span>"+item.date+"</span>");
        $("span").addClass("badge");
        $("span").addClass("bg-danger");
        $("span").addClass("text-light");
    }
    
    function DeleteAll(){
        $("#taskWrapper").empty();
        $("#delete-selected").hide();
        $("#delete-all").hide();
        localStorage.setItem("data", JSON.stringify([]));
    }
    
    function DeleteSelected(){
        let itemToDelete=JSON.parse(localStorage.getItem("data"));
        for (const task of document.querySelectorAll(".list-group-item.active")) {
            task.remove();
            for(const item of itemToDelete){
                if(task.innerText==(item.task+item.date)){
                    itemToDelete==itemToDelete.splice(itemToDelete.indexOf(item), 1);
                    console.log(itemToDelete.indexOf(item))
                }
            }
        }
        localStorage.setItem("data", JSON.stringify(itemToDelete));
        if(document.querySelectorAll(".list-group-item").length==0){
            $("#delete-selected").hide();
            $("#delete-all").hide();
        }
    }
})

