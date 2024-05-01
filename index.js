let departSelect = document.getElementById("select-dept");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
departSelect.addEventListener("change", function (event) {
  let category = event.target.value;
  filterData(category);
});
let genderSelect = document.getElementById("select-gender");
genderSelect.addEventListener("change", function (event) {
  let gender = event.target.value;
  filterByGender(gender);
});
let salSelect = document.getElementById("select-salay");
salSelect.addEventListener("change", function (event) {
  let salary = event.target.value;
  filterBySalary(salary);
});
let tbody = document.querySelector("tbody");
///console.log(departSelect,genderSelect,salSelect);
let url =
  " https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees";
async function getData() {
  let res = await fetch(url);
  let finalRes = await res.json();
  //console.log(finalRes.data);
  showData(finalRes.data);
}
function showData(arr) {
  // console.log(arr);
  tbody.innerHTML = "";
  arr.forEach(function (ele, i) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML = `${i + 1}`;
    let td2 = document.createElement("td");
    td2.innerHTML = ele.name;
    let td3 = document.createElement("td");
    td3.innerHTML = ele.gender;
    let td4 = document.createElement("td");
    td4.innerHTML = ele.department;

    let td5 = document.createElement("td");
    td5.innerHTML = ele.salary;
    tr.append(td1, td2, td3, td4, td5);
    tbody.append(tr);
  });
}
async function filterData(category) {
  let filterData = await fetch(
    `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=${category}`
  );
  let finalFilterdData = await filterData.json();
  //console.log(finalFilterdData.data);
  showData(finalFilterdData.data);
}
async function filterByGender(gender) {
  console.log(gender);
  let filterData = await fetch(
    `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=gender&filterValue=${gender}`
  );
  let finalFilterdData = await filterData.json();
  console.log(finalFilterdData.data);
  showData(finalFilterdData.data);
}
async function filterBySalary(salary) {
  console.log(salary);
  let filterData = await fetch(
    `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&&sort=salary&order=${salary}`
  );
  let finalFilterdData = await filterData.json();
  console.log(finalFilterdData.data);
  showData(finalFilterdData.data);
}
let currentPage = 1;
let itemsPerPage = 10;
async function getPaginationData(page) {
  let res =  await fetch(
    `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=${itemsPerPage}`
  );
  let finalPaginationData =  await res.json();
 // console.log(finalPaginationData.data);
 showData(finalPaginationData.data);
}
function next(){
  currentPage++;
  if(currentPage==10){
    nextBtn.disabled = true;
    prevBtn.disabled = false;

  }
  getPaginationData(currentPage);
}
function prev(){
  if(currentPage==1){
    prevBtn.disabled = true;
  }
  if(currentPage >1){
    nextBtn.disabled = false;
    currentPage--;
    prevBtn.disabled = false;
    getPaginationData(currentPage);
  }
}

getData();
getPaginationData(currentPage);

