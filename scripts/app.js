$(document).ready(onReady);

function onReady() {
  $('.js-form').on('submit', submitData);
  $('#js-table-body').on('click', '.js-btn-delete', deleteEmployee);
}

let employeeList = [];

function submitData(event) {
  event.preventDefault();
  //   console.log('Yes it works.');
  let employee = {
    firstName: $('#js-firstName').val(),
    lastName: $('#js-lastName').val(),
    idNumber: $('#js-idNumber').val(),
    jobTitle: $('#js-jobTitle').val(),
    annualSalary: $('#js-annualSalary').val(),
  };

  employee.annualSalary = parseFloat(employee.annualSalary);
  console.log(employee.annualSalary);
  if (isNaN(employee.annualSalary)) {
    alert("Please enter the employee's annual salary.");
  } else if (employee.idNumber == '') {
    alert('Please enter an employee ID Number.');
  } else {
    employeeList.push(employee);
    $('.js-form').trigger('reset');
    // $('#js-firstName').val('');
    // $('#js-lastName').val('');
    // $('#js-idNumber').val('');
    // $('#js-jobTitle').val('');
    // $('#js-annualSalary').val('');
    //   console.log(employeeList);
    //   console.log(monthlyCost);
    render();
  }
}

function deleteEmployee() {
  // let val = parseInt($(this).parent().parent().find('.idNumber').text());

  // let index = employeeList.findIndex(function (employeeList) {
  //   return employeeList.idNumber == val;
  // });
  // console.log('ID Number Removed', val);
  // console.log('Index of array', index);
  const index = $(this).data('id');

  employeeList.splice(index, 1);

  render();
}

function render() {
  console.log('in render');
  $('#js-table-body').empty();
  let monthlyCost = 0;
  const costCap = 20000;

  for (let employeeIndex in employeeList) {
    let employee = employeeList[employeeIndex];
    $('#js-table-body').append(`
    <tr data-id="${employee.idNumber}">
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td class="idNumber">${employee.idNumber}</td>
        <td>${employee.jobTitle}</td>
        <td>$${employee.annualSalary}</td>
        <td><button class="js-btn-delete">Delete</button></td>
    </tr>
    `);
    monthlyCost += parseInt((employee.annualSalary / 12).toFixed(2));
    console.log('End of the for loop');
    console.log('Monthly cost:', monthlyCost);
  }
  $('.js-monthlyCost').text(`Monthly Cost: $${monthlyCost}`);

  if (monthlyCost > costCap) {
    $('.js-monthlyCost').addClass('redText');
  } else {
    $('.js-monthlyCost').removeClass('redText');
  }
}
