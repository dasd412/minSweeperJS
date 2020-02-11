
let dataset=[];//2-dimension array for mineSweeping

const tbody=document.querySelector("#table tbody");

document.querySelector("#exec").addEventListener('click',function(){

const hor=parseInt(document.querySelector('#hor').value,10),//horizon 
ver=parseInt(document.querySelector("#ver").value,10),//veritcal
mine=parseInt(document.querySelector("#mine").value,10);//mine count

if(tbody.hasChildNodes()){
    clearTbody();//initialize tbody
}

makeDefaultView(hor,ver);

suffle=suffleMine(hor, ver, mine);

makeMine(suffle);

});

function makeDefaultView(hor,ver){

    

for(let i=0;i<ver;i++){
    let arr=[];//1-dimension array

    const tr=document.createElement('tr');

    dataset.push(arr);

    for(let j=0;j<hor;j++){

        arr.push(1);
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

           
            if(dataset[line][space]===1){
                event.currentTarget.textContent="";
            }
            else if(dataset[line][space]==='X'){

                event.currentTarget.textContent='X';
            }
              
          }

           

        });

        tr.appendChild(td);
        
    }
    tbody.append(tr);
}
}

function clearTbody(){
while(tbody.hasChildNodes()){
    tbody.removeChild(tbody.lastChild);
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

