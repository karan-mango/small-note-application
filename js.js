const mainbody=document.querySelector('.main-body');
const createbtn=document.querySelector('.create-notes-btn');
const popup=document.querySelector('.pop-up-inp-heading');
let notesgrid=document.querySelector('.notes-grid');

const inp1=document.querySelector('#inp1');


createbtn.addEventListener('click',()=>{
    popup.style.display='block';


});
let noteColor="";


const color=document.querySelectorAll('.circle');
color.forEach(element => {
    element.addEventListener('click',()=>{
        noteColor=element.classList[1];

         noteColor = getComputedStyle(document.documentElement).getPropertyValue('--' + noteColor);
       
        // alert(noteColor);
    })
    
});


popup.addEventListener('click',(e)=>{
   if(e.target.closest('button')&& 1){
    
    if(noteColor!=''){
    const inputValue = popup.querySelector('#inp1').value;
    // alert(inputValue+noteColor);
    popup.querySelector('#inp1').value="";
    popup.style.display='none';
    create_note(inputValue,noteColor);

    }
    else{
        alert('select the color');
    }
   

    
   }
});

inp1.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'  && noteColor!=''){
        const inputValue = popup.querySelector('#inp1').value;
        popup.querySelector('#inp1').value="";
        // alert(inputValue+noteColor);
        popup.style.display='none';
        create_note(inputValue,noteColor);


    }
})



function create_note(a,b){
    var c = b.replace('rgb', 'rgba').replace(')', ', 0.7)');
  

    const html = `
    <div class="note" style="border-width: 40px 10px 10px 10px; border-style: solid; border-color: ${b};background-color: white;">
    <div class="check"></div>
          <div class="notes-heading">${a}</div>
          <div contenteditable="true" class="textarea" name="" id="" cols="30" rows="10"></div>
          <img src="./delete.png" alt="" class="del">
      </div>`;
    notesgrid.innerHTML+=html;
    updateStr();
    shownotes();

    




}
let checked=false;

notesgrid.addEventListener('click',(e)=>{
    // deleting the note 
    const noteElement = e.target.closest('.note');
    if(e.target.closest('.del')){
        noteElement.remove();
        updateStr();

    }
    if(e.target.closest('.check')){
        const check=e.target.closest('.check');
        if(!checked){
        check.style.backgroundImage = 'url(./completed.png)';
        // alert(34);
        checked=true;
        noteElement.style.opacity='.6   '

        }
        else{
            check.style.backgroundImage ='url(./uncheck.png)';
            checked=false;
            noteElement.style.opacity='1   '


        }
    }

   

})

notesgrid.addEventListener('input', (e) => {
    // Check if the input event is triggered by a textarea element
    // alert(34)
    updateStr();
    if (e.target.closest === '.textarea') {
        // Store the updated text content in local storage
        const textContent = e.target.value;
        alert(34)
    }
});


function updateStr(){
    localStorage.setItem('notes',notesgrid.innerHTML);
}

function shownotes(){
    notesgrid.innerHTML=localStorage.getItem('notes');
}
window.onload = function() {
    shownotes();
};