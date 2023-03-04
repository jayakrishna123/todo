const todos=[];
const textTodo=document.getElementById('todo-input');
const addBtn=document.getElementById('add-btn');

document.getElementById('save-db').addEventListener('click',()=>{
    console.log(todos);
});

addBtn.addEventListener('click',()=>{
    console.log(textTodo.value);
    if(textTodo.value){
        todos.push(new Todo(textTodo.value));
        renderTodo(todos);
    }
    textTodo.value="";
})

const renderTodo=(todosobj)=>{
    const listDom=document.getElementById('list-todo');
    listDom.innerHTML='';
    todosobj.forEach((todo,index) => {
        const li=document.createElement('li');
        li.innerHTML=todo.text;
        li.classList=[todo.completed?'completed':''];
        var span=document.createElement("SPAN");
        var txt=document.createTextNode("\u00D7");
        span.className='close';
        span.appendChild(txt);
        span.addEventListener('click',()=>{
            todosobj.splice(index,1)
            renderTodo(todosobj)
        })
        li.appendChild(span)
        li.addEventListener('click',()=>{
            todo.completed=!todo.completed;
            li.classList=[todo.completed?'completed':''];
        })
        listDom.appendChild(li);
        
    });
}
const search= ()=>{
    let seachtext=document.getElementById('search-input').value;
    seachtext=seachtext.toLowerCase();
    let validfilter=[];
    validfilter=todos.filter((to)=>{
        if(to.text.includes(seachtext)){
            validfilter.push(to);
            renderTodo(validfilter);
            seachtext='';
        }else if(seachtext==""){
            renderTodo(todos);
        }
    })
}
function selectcontent(){
    filter=document.getElementById('script');
    var opt=filter.options[filter.selectedIndex].value;
    if(opt=="all"){
        renderTodo(todos)
    }else if(opt=='complete'){
        obj=todos.filter((note)=>{
            return note.completed==true;
        })
        renderTodo(obj);
    }else{
        obj=todos.filter((note)=>{
            return note.completed==false;
        })
        renderTodo(obj);
    }
}
class Todo{
    text;
    completed;
    id;
    constructor(text){
        this.text=text;
        this.completed=false;
        this.id=new Date().toString();

    }
}