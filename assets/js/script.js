// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn"t run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //Create a variable to keep track of the day.
  var today = dayjs();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //create variables for the div that the times will be placed in and for the current hour.
  var timeBlockList = $(".container-fluid");
  var currentMilitaryHour = today.format("H");

  //Create a for loop for each hour slot.  (the ids are going to be in military time while displayed in standard time)
  for (var i = 9; i <= 17; i ++) 
  {
    //check if time being created is in the past, present or future.
    var history;
    if (i < currentMilitaryHour) {
      history = "past";
    }
    else if (i > currentMilitaryHour) {
      history = "future";
    }
    else {
      history = "present";
    }

    //create the outer div.
    var timeBlock = $("<div>");
    var id = "#hour-" + i;
    timeBlock.attr("id", id);
    timeBlock.addClass("row time-block " + history);
    
    //create the inner elements inside the previously defined div in variable timeBlock.
    //create the inner div first.
    var timeDiv = $("<div>");
    timeDiv.addClass("col-2 col-md-1 hour text-center py-3");
    
    //add logic to determine the standard time.
    var blockStandardHour;
    if (i - 12 < 0) {
      blockStandardHour = i + "AM";
    }
    else if ( i - 12 === 0) {
      blockStandardHour = i + "PM";
    }
    else {
      blockStandardHour = (i % 12) + "PM";
    }
    
    timeDiv.text(blockStandardHour);

    //create the text area element.
    var textEl = $("<textarea>");
    textEl.addClass("col-8 col-md-10 description");
    textEl.attr("rows", "3");
    //call the function below (currently not made, and delete this when finished) to add appropriate text to the text element.
    
    //create the button element.
    var buttonEl = $("<button>");
    buttonEl.addClass("btn saveBtn col-2 col-md-1");
    buttonEl.attr("aria-label", "save");

    //add the i element that is a child element to the button element.
    var iEl = $("<i>");
    iEl.addClass("fas fa-save");
    iEl.attr("aria-hidden", "true");

    //append all of the elements.
    buttonEl.append(iEl);
    
    timeBlock.append(timeDiv);
    timeBlock.append(textEl);
    timeBlock.append(buttonEl);

    timeBlockList.append(timeBlock);
  }
  

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  //define and populate variables for the date that will be displayed below the header.
  var numberDay = today.format("D");
  var dayTense;
  if (numberDay == 1) {
    dayTense = "st";
  }
  else if (numberDay == 2) {
    dayTense = "nd";
  }
  else if (numberDay == 3) {
    dayTense = "rd";
  }
  else {
    dayTense = "th";
  }

  //populate the text field with the current date.
  $("#currentDay").text(today.format("dddd, MMMM D") + dayTense);
});
