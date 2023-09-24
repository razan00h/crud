var courseName =document.querySelector("#courseName");
var courseCategory =document.querySelector("#courseCategory");
var coursePrice =document.querySelector("#coursePrice");
var courseDescription =document.querySelector("#courseDescription");
var courseCapacity =document.querySelector("#courseCapacity");
var addbtn =document.querySelector("#click");
var search = document.querySelector ("#search");
var inputs=document.querySelectorAll(".inputs");
var nameError=document.querySelector(".nameError");
var isNameTrue=false;


if(JSON.parse(localStorage.getItem("courses"))==null){
    var courses=[];
}else{
    courses=JSON.parse(localStorage.getItem("courses"));
    displaydata(); 
}
addbtn.addEventListener("click",function(e){
e.preventDefault();
addcourse()
clearinputs();
displaydata();
})

function addcourse(){
var cource= {
name:courseName.value,
category:courseCategory.value,
price:coursePrice.value,
desc:courseDescription.value,
capacity:courseCapacity.value,
}
courses.push(cource);
localStorage.setItem("courses",JSON.stringify(courses));
const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'course added successfully'
  })
}
function clearinputs(){
for(var i=0;i<inputs.length;i++){
    inputs[i].value="";
}
}
function displaydata(){
    result="";
    for(var i=0;i<courses.length;i++){
        
        result+=`
        <tr>
        <td> ${i}</td>
        <td> ${courses[i].name}</td>
        <td> ${courses[i].category}</td>
        <td> ${courses[i].price}</td>
        <td> ${courses[i].desc}</td>
        <td> ${courses[i].capacity}</td>
        <td><button class="btn btn-outline-info">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleatcource(${i})">Delete</button></td>
        </<tr>
        `;

    }
document.getElementById("data").innerHTML=result;

}
function deleatcource(id){
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        courses.splice(id,1);
        localStorage.setItem("courses",JSON.stringify(courses));
        displaydata();
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })

}

search.addEventListener ("keyup", function(e) {
    var result = "";
    for(var i=0;i<courses.length; i++) 
    if (courses[i].name.toLowerCase().includes (e.target.value.toLowerCase())) 
    result +=`
    <tr>
    <td>${i}</td>
    <td>${courses[i].name}</td>
    <td>${courses [i].category}</td>
    <td>${courses [i].price}</td>
    <td>${courses [i].desc}</td>
    <td>${courses [i].capacity}</td>
    <td><button class='btn btn-outline-info' >update</button></td>
    <td><button class='btn btn-outline-danger' onclick="deleteCourse(${i})">Delete</button></td>
    </tr>
    `;
    document.getElementById("data").innerHTML=result;
    })


    courseName.addEventListener("keyup", function() {
        var pattern = /^[A-Z][a-z]{2,10}$/;
        if(pattern.test(courseName.value)) {
        if (courseName.classList.contains ('is-invalid')){
        courseName.classList.remove('is-invalid');
        courseName.classList.add("is-valid"); 
        nameError.style.cssText="display: none";
        isNameTrue=true;
        }
        courseName.classList.add("is-valid");
        }else{
        if (courseName.classList.contains ('is-valid')){
        courseName.classList.remove('is-invalid');
        courseName.classList.add("is-invalid");
        }
        courseName.classList.add("is-invalid");
        nameError.style.cssText="display: block";
        isNameTrue=false;
        }

    if(isNameTrue){
        addbtn.removeAttribute("disabled");
        }else{
        addbtn.setAttribute("disabled","disabled");
        }
        })
