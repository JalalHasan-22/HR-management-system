const main = document.querySelector("#main");
const allEmployees = [];
const cardsContainer = document.getElementById("emps-cards");
const btnAddNew = document.querySelector(".add-emp");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal-btn");
const form = document.querySelector(".modal-form");
const formNameInput = document.getElementById("fullName");
const formNameImg = document.getElementById("img");

function Employee(fName, department, level, imgURL) {
  this.fullName = fName;
  this.department = department;
  this.level = level;
  this.img = imgURL;
  allEmployees.push(this);
}

// Calculating the salary
Employee.prototype.calculateSalary = function () {
  let min, max;
  if (this.level === "Senior") {
    min = 1500;
    max = 2000;
  }
  if (this.level === "Mid-Senior") {
    min = 1000;
    max = 1500;
  }
  if (this.level === "Junior") {
    min = 500;
    max = 1000;
  }
  this.salary = Math.floor(Math.random() * (max - min + 1) + min);

  return this.netSalary();
};

// Calculate net salary
Employee.prototype.netSalary = function () {
  if (this.salary)
    return (this.netSalary =
      this.salary - Math.floor(this.salary * (7.5 / 100)));
  return;
};

// generate random ID
Employee.prototype.generateID = function () {
  this.id = Math.floor(1000 + Math.random() * 9000);
};

// Rendering Employee name and salary
Employee.prototype.render = function () {
  const markup = `          <div class="card">
  <img src="assets/imgs/${this.img}.svg" alt="Avatar" />
  <div class="emp-info">
    <h3 class="emp-name">${this.fullName}</h3>
    <p class="id"><span>ID:</span>${this.id}</p>
    <p class="id"><span>Salary:</span>${this.salary} $</p>
    <p class="id"><span>Dep:</span>${this.department}</p>
    <p class="id"><span>level:</span>${this.level}</p>
  </div>
</div>`;
  cardsContainer.insertAdjacentHTML("beforeend", markup);
};

// Creating objects
const ghazi = new Employee("Ghazi Samer", "Administration", "Senior", "user01");
const lana = new Employee("Lana Ali", "Finance", "Senior", "user01");
const tamara = new Employee("Tamara Ayoub", "Marketing", "Senior", "user01");
const safi = new Employee(
  "Safi Walid",
  "Administration",
  "Mid-Senior",
  "user01"
);
const omar = new Employee("Omar Zaid", "Development", "Senior", "user01");
const rana = new Employee("Rana Saleh", "Development", "Junior", "user01");
const hadi = new Employee("Hadi Ahmad", "Finance", "Mid-Senior", "user01");

// Revelaling the Modal
const showModal = function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  document.body.classList.toggle("no-scroll");
  clearFields();
};

//Clearing the form fields
const clearFields = () => {
  formNameInput.value = "";
  formNameImg.value = "";
};
// Close Modal
const closeModale = () => {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  document.body.classList.remove("no-scroll");
};
btnAddNew.addEventListener("click", showModal);
btnCloseModal.addEventListener("click", showModal);
overlay.addEventListener("click", showModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModale();
  }
});

// Rendering Employees from the Array
allEmployees.forEach((emp) => {
  emp.calculateSalary();
  emp.generateID();
  emp.render();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const fullName = e.target.fullName.value;
  const department = e.target.department.value;
  const level = e.target.level.value;
  const img = e.target.img.value;
  clearFields();
  closeModale();
  const newEmp = new Employee(fullName, department, level, img);
  newEmp.calculateSalary();
  newEmp.generateID();
  newEmp.render();
});
