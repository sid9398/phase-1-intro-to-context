function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour] = array
    const employeeRecord = {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    }
    return employeeRecord;
  }
  // createEmployeeRecords
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // createTimeInEvent
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  
  // createTimeOutEvent
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return employeeRecord;
  }
  
  // hoursWorkedOnDate
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    return (timeOutHour - timeInHour) / 100;
  }
  
  // wagesEarnedOnDate
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payPerHour = employeeRecord.payPerHour;
  
    return hoursWorked * payPerHour;
  }
  
  // allWagesFor
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    const totalWages = datesWorked.reduce((acc, date) => {
      return acc + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalWages;
  }
  
  // calculatePayroll
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((acc, employeeRecord) => {
      return acc + allWagesFor(employeeRecord);
    }, 0);
  
    return totalPayroll;
  }