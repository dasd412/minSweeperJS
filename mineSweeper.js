
let dataset=[];//2-dimension array for mineSweeping

const tbody=document.querySelector("#table tbody");

document.querySelector("#result").textContent='';

let visited=[];

const XY=function(line,space,value){
    this.line=line;
    this.space=space;
    this.value=value;
    return this;
}

document.querySelector("#exec").addEventListener('click',function(){

const hor=parseInt(document.querySelector('#hor').value,10),//horizon 
ver=parseInt(document.querySelector("#ver").value,10),//veritcal
mine=parseInt(document.querySelector("#mine").value,10);//mine count


    initialize();

    

makeDefaultView(hor,ver);

suffle=suffleMine(hor, ver, mine);

makeMine(suffle);

makeVisited(hor,ver);

});

function makeVisited(hor ,ver){

for(let i=0;i<ver;i++){
    let arrays=[];
    visited.push(arrays);
    for(let j=0;j<hor;j++){
        if(dataset[i][j]==='X'){
           arrays.push(true);
        }
        else{
           arrays.push(false); 
        }
        
    }
}


}

function makeDefaultView(hor,ver){

    

for(let i=0;i<ver;i++){
    let arr=[];//1-dimension array

    const tr=document.createElement('tr');

    dataset.push(arr);

    for(let j=0;j<hor;j++){

        arr.push(0);
        const td=document.createElement('td');
        td.addEventListener('contextmenu',function(event){
            event.preventDefault();
           const parentTr=event.currentTarget.parentNode;
           const parentTbody=event.currentTarget.parentNode.parentNode;

           const space=Array.prototype.indexOf.call(parentTr.children,event.currentTarget);
           const line=Array.prototype.indexOf.call(parentTbody.children,parentTr);
           
           /*

           event.currentTarget == 이벤트 리스너가 달려있는 대상

           event.target == 이벤트 리스너가 발생하는 대상

           */
          if(event.currentTarget.textContent===''||event.currentTarget.textContent=='X'){
            event.currentTarget.textContent="!";
          
          }
          else if(event.currentTarget.textContent==='!'){

            event.currentTarget.textContent="?";
            
          }
          else if(event.currentTarget.textContent==='?'){

           
            if(dataset[line][space]===0){
                event.currentTarget.textContent="";
            }
            else if(dataset[line][space]==='X'){

                event.currentTarget.textContent='X';
            }
              
          }

           

        });

        td.addEventListener('click',function (event){

            const parentTr=event.currentTarget.parentNode;
            const parentTbody=event.currentTarget.parentNode.parentNode;

            const space=Array.prototype.indexOf.call(parentTr.children,event.currentTarget);
            const line=Array.prototype.indexOf.call(parentTbody.children,parentTr);

            
            event.currentTarget.classList.add('opened');

            if(dataset[line][space]==='X'){

                event.currentTarget.textContent='b';
                document.querySelector("#result").textContent="Failed";
                
            }
            else{//if number

            const adjacent=makeAdacjent(line,space);

        

            let adjacentCounts=adjacent.filter(function(v){
                return v==='X';
            }).length;

             event.currentTarget.textContent=adjacentCounts>0?adjacentCounts:'';

             if(adjacentCounts===0){
                BFS(line ,space,parentTbody);
          
                
             }

            }


        });

        tr.appendChild(td);
        
    }
    tbody.append(tr);
}
}

function BFS(line,space,tbody){

   let queue=[];
   queue.push(new XY(line,space,dataset[line][space]));
  
   visited[line][space]=true;

   while(queue.length!==0){

    let polled=queue.shift();
    

    let adjacent=getAdjacentDimension(polled.line,polled.space);

    
     


    for(let i=0;i<adjacent.length;i++){
          let targetLine=adjacent[i].line;
          let targetSpace=adjacent[i].space;

          let adjacentCounts=getAdjacentDimension(targetLine,targetSpace).filter(function(value){

            return value==='X';
          }).length;

          


          if(adjacentCounts===0&&visited[targetLine][targetSpace]===false){

            tbody.children[targetLine].children[targetSpace].click();
        
            visited[targetLine][targetSpace]=true;
            queue.push(targetLine);
            queue.push(targetSpace);
          }

    }

   }


}

function getAdjacentDimension(line ,space){
    const adjacent=[];

    

    if(line>=1){ 
      
        adjacent.push(new XY(line-1,space,dataset[line-1][space]));
        if(space+1<dataset.length){
        
        adjacent.push(new XY(line-1,space+1,dataset[line-1][space+1]));
        }
        if(space>=1){
         
        adjacent.push(new XY(line-1,space-1,dataset[line-1][space-1]));
    }

    }

    if(space>=1){
        
        adjacent.push(new XY(line,space-1,dataset[line][space-1]));
    }
    if(space+1<dataset.length){
        
        adjacent.push(new XY(line,space+1,dataset[line,space+1]));
    }

    

    if(line+1<dataset.length){
        
        adjacent.push(new XY(line+1,space,dataset[line+1][space]));

        if(space>=1){
            
        adjacent.push(new XY(line+1,space-1,dataset[line+1][space-1]));
        }
        if(space+1<dataset.length){
           
        adjacent.push(new XY(line+1,space+1,dataset[line+1][space+1]));
        }
    }
    


    return adjacent;

}

function makeAdacjent(line, space){
    const adjacent=[];

    

    if(line>=1){ 
      
        adjacent.push(dataset[line-1][space]);
        if(space+1<dataset.length){
        
        adjacent.push(dataset[line-1][space+1]);
        }
        if(space>=1){
         
        adjacent.push(dataset[line-1][space-1]);
    }

    }

    if(space>=1){
        
        adjacent.push(dataset[line][space-1]);
    }
    if(space+1<dataset.length){
        
        adjacent.push(dataset[line][space+1]);
    }

    

    if(line+1<dataset.length){
        
        adjacent.push(dataset[line+1][space]);

        if(space>=1){
            
        adjacent.push(dataset[line+1][space-1]);
        }
        if(space+1<dataset.length){
           
        adjacent.push(dataset[line+1][space+1]);
        }
    }
    


    return adjacent;
}

function initialize(){
tbody.innerHTML="";
for(let i=dataset.length;i>0;i--){
dataset.pop();
}

for(let i=visited.length;i>0;i--){
    visited.pop();
}

}


function suffleMine(hor, ver, mine){
    /*
    create array[hor*ver]->fill every element undefined->every element get mapped argument 'index' 
    */
    let candidate=Array(hor*ver).fill().map(
        function(element,index){//mapping (element,index)
            return index;//index range is 0~hor*ver-1
        });

    let suffle=[];

        while(candidate.length>hor*ver-mine){

            let spliced=candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
            suffle.push(spliced);
        }

 
    return suffle;

}

function makeMine(suffle){
    for(let k=0;k<suffle.length;k++){
        let col=Math.floor(suffle[k]/10);

        let row=suffle[k]%10;

        tbody.children[col].children[row].textContent='X';
        dataset[col][row]='X';

        
    }
}

