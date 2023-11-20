
$(function () {
  // Save to local storage with rowID and value when save button is clicked
$('.container-fluid').on('click', '.btn', function(event){
  event.preventDefault();
  let hourRowId = $(this).parent().attr('id'); 
  let description = $(this).siblings('.description');
  let inputValue = description.val();
  localStorage.setItem(hourRowId, inputValue);
})
  // Define variables 
  let container = $(".container-fluid");
  let today = dayjs();
  let currentHour = today.hour();
  let workDayHours = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
  let storedValues = [];

  // Pull any saved items from local storage and store them in an array
for(let i = 0; i < localStorage.length; i++){
  let key = localStorage.key(i);
  let value = localStorage.getItem(key);
  let keyValuePair = {key: key, value: value};
  storedValues.push(keyValuePair)
}

 // Create rows for each hour of the work day
for(let i = 0; i < workDayHours.length; i++){
  let hourRowId = "hour-" + workDayHours[i]; // Define hourRowId as a variable for comparison
  let hourRow = $('<div>',{
    id: hourRowId,
    class: "row time-block " + (workDayHours[i] < currentHour ? "past" : workDayHours[i] == currentHour ? "present" : "future") // past/present/future logic for designating class of hourRow
  });
    let formattedHour = workDayHours[i] > 12 ? workDayHours[i] - 12  + " PM" : workDayHours[i] + ' AM'; // Format hours from 24 hour to 12 hour
  hourRow.append("<div class='col-2 col-md-1 hour text-center py-3'>" + formattedHour + "</div>");
  hourRow.append("<textarea class='col-8 col-md-10 description' rows='3'> </textarea>");
  hourRow.append("<button class='btn saveBtn col-2 col-md-1' aria-label='save'><i class='fas fa-save' aria-hidden='true'></i></button>");

  // Assigns any items from local storage that match the current hourRowId and populates the corresponding text area
for(let i = 0; i < storedValues.length; i++)
  if(storedValues[i].key == hourRowId){
    hourRow.find('.description').val(storedValues[i].value);
  }
 // Adds created row to the container
container.append(hourRow);
}

 // Pulls current time & date and displays in proper format
  let currentDay = today.format('dddd MMM, DD YYYY' + ' - ' +  'h:mm a');
  $('#currentDay').text(currentDay);

});