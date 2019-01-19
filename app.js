//Budget Controller
var budgetController = (function() 
{
  //Creating an Expense Object to store the values
  var Expense = function(id, description, value) 
  {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //Creating an Income Object to store the values
  var Income = function(id, description, value) 
  {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //Creating a data Object [Data Structure] to store the values and totals
  var data = 
  {
	allItems: 
	  {
      exp: [],
      inc: []
    },
	totals: 
	  {
      exp: 0,
      inc: 0
    }
  };

  //Returning a function addItem to update and manipulate data
  return {

    addItem: function(type, des, val) {
	  
		//Creating a new newID
	  if (data.allItems[type].length > 0) 
	  {
        var ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
	  } 
	  else 
	  {
		ID = 0;
      }

      //Creating a new item based on inc or exp
	  if (type === "exp") 
	  {
        var newItem = new Expense(ID, des, val);
	  } 
	  else if (type === "inc") 
	  {
      	var newItem = new Income(ID, des, val);
      }
	  
	 //Pushing the items in the specific array
	  data.allItems[type].push(newItem);

      //Return the new elemet
      return newItem;
    },
	testing: function() 
	{
      console.log(data);
    }
  };

})();

//User Interface Controller
var UIController = (function() 
{
  //An object to return all the string classes need to identify the event
  var DOMstrings = 
  {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
	inputbtn: ".add__btn",
	incomeContainer:'.income__list',
	expensesContainer:'.expenses__list'
  };

  //UI Returns a getinput function that returns an object containing the values input by user
  return {
	getinput: function() 
	{
	  return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
	},
	
	//Updating the UI
	addListItem:function(obj,type)
	{
		var html, newHTML,element;
		//Create an HTML String with placeholder text
		if(type === 'inc')
		{

			element = DOMstrings.incomeContainer;
			html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
		}
		
		else if (type=== 'exp')
		{
			element = DOMstrings.expensesContainer;
			
			html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';	
		}

		//Replace the placeholder text with actual data
		newHTML = html.replace('%id%',obj.id);
		newHTML = newHTML.replace("%description%",obj.description);
		newHTML = newHTML.replace("%value%",obj.value);
		
		//Insert the HTML into the DOM
		document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
	
	
	},

		//To publicily expose the DOMstrings to be used in another controller.
		//getDOMstrings returns the object that contains all the css classes for input and btn
		getDOMstrings: function() 
		{
		return DOMstrings;
		}
	
    };

})();



//Global App Conrtoller
var controller = (function(budgetCtrl, UICtrl) 
{
  //Event listening function to check if user has clicked or input
  var setupEventListener = function() 
  {
    //DOM Object that takes in DOMstrings object to be used in controller
    var DOM = UICtrl.getDOMstrings();

    //On click ctrlAddItem will be invoked
    document.querySelector(DOM.inputbtn).addEventListener("click", ctrlAddItem);

    //Only invoke ctrlAddItem() when user presses Enter incase of Keyboard press
	document.addEventListener("keypress", function(event) 
	{
	  if (event.keyCode === 13 || event.which === 13) 
	  {
        //ctrlAddItem will be invoked when user presses Enter Key
        ctrlAddItem();
      }
	});
	
  };

  //A function that adds the item input by user into getinput function
  var ctrlAddItem = function() 
  {
    // Get the input Data
    //Object input will be assigned values that user will input from getinput()
    var input = UICtrl.getinput();

    // Add the item to the budget controller
	var newItem = budgetCtrl.addItem(input.type,input.description,input.value);
	// Add the new item to the user interface
	UICtrl.addListItem(newItem,input.type);
    // Calculate the budget
    // Display the budget on the UI
   
  };

  return {
    //Controller returns an init function to start the application
	init: function() 
	{
      console.log("Application has Started");

      //The function that will start listening to the events
      setupEventListener();
    }
  };
})(budgetController, UIController);

//init function to start the application
controller.init();
