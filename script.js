var form = document.getElementById('addform');
var todoitem = document.getElementById('list');
var list1 = document.getElementById('list-1');
// var todoname = document.getElementById('todoname');
// var tododesc = document.getElementById('tododesc');

function savetocrud(event){
    event.preventDefault();
    var todoname = document.getElementById('todoname').value;
    var tododesc = document.getElementById('tododesc').value;

    const myobj={
        todoname: todoname,
        tododesc: tododesc,
        completed: "False"
    };
    axios.post("https://crudcrud.com/api/a9e40e581ba94288bd0f33eeb7a79481/users",myobj)
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
        axios.delete(`https://crudcrud.com/api/a9e40e581ba94288bd0f33eeb7a79481/users/${myobj._id}`);
        todoitem.removeChild(li);
    }
    const checkButton = document.createElement('input');
    checkButton.type='checkbox';
    checkButton.value='complete';
    checkButton.onclick= () => {
        axios.put(`https://crudcrud.com/api/a9e40e581ba94288bd0f33eeb7a79481/users/${myobj._id}`,{
            "todoname": `${myobj.todoname}`,
            "tododesc": `${myobj.tododesc}`,
            "completed": "True"
        });
        list1.appendChild(li);
    }
    li.appendChild(checkButton);
    li.appendChild(deleteButton);
    todoitem.appendChild(li);
}

function displayitem(){
    axios.get('https://crudcrud.com/api/a9e40e581ba94288bd0f33eeb7a79481/users')
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