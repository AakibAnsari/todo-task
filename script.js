var form = document.getElementById('addform');
var todoitem = document.getElementById('list');
var list1 = document.getElementById('list-1');
const apiUrl = 'https://crudcrud.com/api/8ac41590308d4144b7842143fc774226/users';

function savetocrud(event){
    event.preventDefault();
    var todoname = document.getElementById('todoname').value;
    var tododesc = document.getElementById('tododesc').value;

    const myobj={
        todoname: todoname,
        tododesc: tododesc,
        completed: "False"
    };
    axios.post(apiUrl,myobj)
    .then((res)=> {
        show(res.data);
        console.log(res);
    })
// show(myobj);
}

function show(myobj){
    var li = document.createElement('li');
    li.textContent= myobj.todoname+' '+myobj.tododesc;
    const deleteButton = document.createElement('input');
    deleteButton.type='button';
    deleteButton.value='Delete';
    deleteButton.className='btn btn-danger';
    deleteButton.onclick= () => {
        axios.delete(`${apiUrl}/${myobj._id}`);
        if(myobj.completed=="True"){
            list1.removeChild(li);
        } else {
            todoitem.removeChild(li);
        }
        // todoitem.removeChild(li);
    }
    const checkButton = document.createElement('input');
    checkButton.type='checkbox';
    checkButton.value='complete';
    checkButton.onclick= () => {
        axios.put(`${apiUrl}/${myobj._id}`,{
            "todoname": `${myobj.todoname}`,
            "tododesc": `${myobj.tododesc}`,
            "completed": "True"
        });
        list1.appendChild(li);
    }
    li.appendChild(checkButton);
    li.appendChild(deleteButton);
    if(myobj.completed=="True"){
        checkButton.checked=true;
        list1.appendChild(li);
    } else {
        todoitem.appendChild(li);
    }
}

function displayitem(){
    axios.get(apiUrl)
.then((res) => {
    for (var i = 0; i < res.data.length; i++ ){
        show(res.data[i]); 
        console.log(res.data[i]);
    }
})
.catch((err)=>{
    console.log(err);
})
}
displayitem();
