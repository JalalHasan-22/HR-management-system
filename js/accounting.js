"use strict";

const mainContainer = document.querySelector(".main-container");

// getting the data from localStorage

const getDataInsights = function (data) {
  const statistics = [
    {
      department: "Administration",
      noOfEmployees: 0,
      avgSalary: 0,
      totalSalaries: 0,
    },
    {
      department: "Marketing",
      noOfEmployees: 0,
      avgSalary: 0,
      totalSalaries: 0,
    },
    {
      department: "Development",
      noOfEmployees: 0,
      avgSalary: 0,
      totalSalaries: 0,
    },
    {
      department: "Finance",
      noOfEmployees: 0,
      avgSalary: 0,
      totalSalaries: 0,
    },
  ];

  // Extracting infos from localStorage recieved data
  if (!data) return;
  data.forEach((entry, i) => {
    statistics.forEach((dep) => {
      if (entry.department === dep.department) {
        dep.noOfEmployees++;
        dep.totalSalaries += entry.salary;
        dep.avgSalary = Math.round(dep.totalSalaries / dep.noOfEmployees);
      }
    });
  });

  return statistics;
};

const getData = () => {
  const data = JSON.parse(localStorage.getItem("allEmps"));
  return data;
};

const renderTable = function () {
  const data = getDataInsights(getData());
  let markup;
  if (!data) markup = `<h3 class = "warning"> No Data to be displayed</h3>`;
  else {
    const total = {
      totalNoOfEmployees: 0,
      allDepsSalaries: 0,
      avgAllSalaries: 0,
    };
    const formatter = new Intl.NumberFormat("us-EN", {
      style: "currency",
      currency: "USD",
    });
    markup = `<table class="employees-info-table">
  <thead>
    <tr>
      <th>Department Name</th>
      <th>Number of Employees</th>
      <th>Average Salary</th>
      <th>Total Salaries</th>
    </tr>
    </thead>
    ${data.map((entry) => {
      total.totalNoOfEmployees += entry.noOfEmployees;
      total.allDepsSalaries += entry.totalSalaries;
      total.avgAllSalaries = Math.round(
        total.allDepsSalaries / total.totalNoOfEmployees
      );
      return `<tr>
          <td>${entry.department}</td>
          <td>${entry.noOfEmployees}</td>
          <td>${formatter.format(entry.avgSalary)}</td>
          <td>${formatter.format(entry.totalSalaries)}</td>
        </tr>`;
    })}
    <tfoot>
    <tr>
        <td>Total</td>
        <td>${total.totalNoOfEmployees}</td>
        <td>${formatter.format(total.avgAllSalaries)}</td>
        <td>${formatter.format(total.allDepsSalaries)}</td>
    </tr>
    </tfoot>
  </table>`;
  }
  mainContainer.insertAdjacentHTML("beforeend", markup);
};

renderTable();
