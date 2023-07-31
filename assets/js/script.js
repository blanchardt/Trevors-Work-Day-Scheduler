// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn"t run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //Create a variable to keep track of the day.
  var today = dayjs();

  //create variables for the div that the times will be placed in and provide it with an on click event.
  var timeBlockList = $(".container-fluid");

  //create the funciton that the on click event will call.
  function save (event) {
    //store the element textarea element connected to this button by getting the 2nd child of the parent element.
    var selectedItemParent = $(event.target).parent('div');
    var appropriateTextEl = selectedItemParent.children().eq(1);
    localStorage.setItem(selectedItemParent.attr("id"), appropriateTextEl.val());
  } 

  //on click event to save the text area field to local storage.
  timeBlockList.on('click', '.saveBtn', save);

  //create variables for the current hour.
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
    var id = "hour-" + i;
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
    //call the function below to add appropriate text to the text element.
    getLocalStorage(id, textEl);
    
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
  
  //function to get the data from the local storage and store it in the appropriate text area.
  function getLocalStorage (id, textEl) {
    var text = localStorage.getItem(id);
    if (!text) {
      return;
    }

    textEl.text(text);
  }
  
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
