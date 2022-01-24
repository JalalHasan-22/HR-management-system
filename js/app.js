const main = document.querySelector("#main");
const allEmployees = [];
const infoBox = document.getElementById("emp-info");

function employee(empID, fName, department, level, imgURL) {
  this.id = empID;
  this.fullName = fName;
  this.department = department;
  this.level = level;
  this.img = imgURL;
  allEmployees.push(this);
}

// Calculating the salary
employee.prototype.calculateSalary = function () {
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
employee.prototype.netSalary = function () {
  if (this.salary)
    return (this.netSalary =
      this.salary - Math.floor(this.salary * (7.5 / 100)));
  return;
};

// Rendering Employee name and salary
employee.prototype.render = function () {
  const markup = `<h3 class="emp-name">${this.fullName}</h3>
  <p class="emp-salary">${this.salary}$</p>`;
  infoBox.insertAdjacentHTML("beforeend", markup);
};

// Creating objects
const ghazi = new employee(
  1000,
  "Ghazi Samer",
  "Administration",
  "Senior",
  "imgs/ghazi.png"
);
const lana = new employee(
  1001,
  "Lana Ali",
  "Finance",
  "Senior",
  "imgs/lana.png"
);
const tamara = new employee(
  1002,
  "Tamara Ayoub",
  "Marketing",
  "Senior",
  "imgs/tamara.png"
);
const safi = new employee(
  1003,
  "Safi Walid",
  "Administration",
  "Mid-Senior",
  "imgs/safi.png"
);
const omar = new employee(
  1004,
  "Omar Zaid",
  "Development",
  "Senior",
  "imgs/omar.png"
);
const rana = new employee(
  1005,
  "Rana Saleh",
  "Development",
  "Junior",
  "imgs/rana.png"
);
const hadi = new employee(
  1006,
  "Hadi Ahmad",
  "Finance",
  "Mid-Senior",
  "imgs/hadi.png"
);

ghazi.calculateSalary();
ghazi.render();
lana.calculateSalary();
lana.render();
tamara.calculateSalary();
tamara.render();
safi.calculateSalary();
safi.render();
omar.calculateSalary();
omar.render();
rana.calculateSalary();
rana.render();
hadi.calculateSalary();
hadi.render();
console.log(allEmployees);
