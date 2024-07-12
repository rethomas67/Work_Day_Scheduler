// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var timeSlots = [];

  //retrieve the hour and description from the DOM, add it to the timeslots array, and store it in local storage
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var hourId = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();

    timeSlots.push({ hourId: hourId, description: description });

    localStorage.setItem("timeSlots", JSON.stringify(timeSlots));
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  var currentHour = dayjs().hour();

  var hour = "hour-";
  //color code the scheduler based on whether the time is past, current, or in the future
  for (i = 17; i > 8; i--) {
    var hourId = "#" + hour + i;

    if (currentHour < i) {
      $(hourId).addClass("row time-block future");
    } else if (currentHour == i) {
      $(hourId).addClass("row time-block present");
    } else {
      $(hourId).addClass("row time-block past");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  schedulerItems = JSON.parse(localStorage.getItem("timeSlots"));
  localStorage.setItem("timeSlots", JSON.stringify(schedulerItems));
  //add messages from local storage to the correct time slot
  if (schedulerItems) {
    schedulerItems.forEach((item) => {
      timeSlots.push({ hourId: item.hourId, description: item.description });
      $("#" + item.hourId)
        .children(".description")
        .val(item.description);
    });
  }

  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format("dddd, MMMM DD");
  $("#currentDay").text(currentDate);
});
