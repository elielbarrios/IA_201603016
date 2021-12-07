// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGHT";
    else if (location=="B") return "LEFT";
}

function test(states){
       var location = states[0];		
       var state = states[0] == "A" ? states[1] : states[2];
     var action_result = reflex_agent(location, state);
     var no_estado=getstate(states);  
       document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result).concat(" | Estado: ").concat(no_estado);
     
     if(no_estado==3){
         var name = prompt('Desea continuar iterando ? S/n');
         if(name=='S'){
             var statese = ["A","DIRTY","DIRTY"];
             test(statese);
         }
         return;
     }  
     if (action_result == "CLEAN"){
         if (location == "A") states[1] = "CLEAN";
          else if (location == "B") states[2] = "CLEAN";
       }
       else if (action_result == "RIGHT" ) states[0] = "B";
       else if (action_result == "LEFT") states[0] = "A";		
 setTimeout(function(){ test(states); }, 2000);
}

function getstate(states){
 if (states[0]== "A") {
     
     if(states[1] == "DIRTY"){
         switch (states[2]) {
             case "DIRTY":
                 return 1;
             case "CLEAN":

                 return 3;
         }
     }else if(states[1] == "CLEAN"){
         
         switch (states[2]) {
             case "DIRTY":
                 return 5;
             case "CLEAN":
                 states[1]="DIRTY";
                 states[2]="DIRTY";
                 return 7;
         }
     }
 }else if(states[0] == "B"){

     if(states[1] == "DIRTY"){
         switch (states[2]) {
             case "DIRTY":
                 return 2;
             case "CLEAN":
                 return 4;
         }
     }else if(states[1] == "CLEAN"){
         switch (states[2]) {
             case "DIRTY":
                 return 6;
             case "CLEAN":
                 return 8;
         }
     }
 }
}

var states = ["A","DIRTY","DIRTY"];
test(states);