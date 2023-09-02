

class Model {
	constructor() {
		this._buttons = [];
	}
}

class Controller {
	constructor(Model, View) {

		this._view = View;
		this._model = Model; 
		
		this.generateButtons();
		console.debug(this._view);
		this._view.render(this._model);
	}

	

	createButton = function(text, val, type) {
		var button = document.createElement("button");
		button.setAttribute("value", val);
		button.textContent = text;

		button.className = "btn";

		if (type === "operator") 
			button.className += " operator";
		
		button.onclick = function() {
			document.getElementById("output").value += this.value;
		}	

		return button;

	}

	generateButtons = function() {
		//send("Generating buttons.");

		for( var i = 0; i < 10; i++) {
			var button = this.createButton(i, i, "number");
			this._model._buttons.unshift(button);	
		}

		button = this.createButton("+", "+", "operator");
		this._model._buttons.push(button);
		button = this.createButton("-", "-", "operator");
		this._model._buttons.push(button);
		button = this.createButton("*", "*", "operator");
		this._model._buttons.push(button);
		button = this.createButton("/", "/", "operator");
		this._model._buttons.push(button);

		button = this.createButton("=", "=", "operator");
		button.id = "evaluate";

		button.onclick = function() {
			controller.evaluate(document.getElementById("output").value);
		}

		this._model._buttons.push(button);
	}

	getButtons = function(){
		return this._model._buttons;
	}

	evaluate = function(str) {
		this._view.renderAnswer(eval(str));
	}


}

class View {

	constructor(){
	}
	
	render = function(model) {
		//console.log(controller);
		var buttonsList = model._buttons;

		for (var i = 0; i < buttonsList.length; i++) {
			if (buttonsList[i].className == "btn operator") 
				document.getElementById("operators").append(buttonsList[i]);
			else

				document.getElementById("button-grid").append(buttonsList[i]);

		}

	}

	renderAnswer = function(str) {
		output = document.getElementById("output");
		output.value = "";
		output.placeholder = str;
	}

}

	

var controller = new Controller(new Model(), new View());
console.debug(controller);


