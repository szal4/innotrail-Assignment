// Store the last action for undo functionality
var lastAction = null;
var actionStack = [];

// Add event listeners to the draggable boxes
var boxes = document.querySelectorAll('.box');
boxes.forEach(function(box) {
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('drop', drop);
});

// Add event listener to the undo button
var undoButton = document.getElementById('undo-button');
undoButton.addEventListener('click', undoLastAction);

// Function to handle drag start event
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.style.opacity = '0.4';
}

// Function to handle drag over event
function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var sourceBoxId = event.dataTransfer.getData('text/plain');
    var sourceBox = document.getElementById(sourceBoxId);
    var destinationBox = event.target;

    if (destinationBox.classList[0] === 'box') {
        // Swap the boxes content
        var sourceContent = sourceBox.innerHTML;
        var destinationContent = destinationBox.innerHTML;
        
        sourceBox.innerHTML = destinationContent;
        destinationBox.innerHTML = sourceContent;

        //swap box color
        var sourceBgClass = sourceBox.className;
        var destinationBgClass = destinationBox.className;
        

        sourceBox.className = destinationBgClass;
        console.log(sourceBgClass,destinationBgClass);
        destinationBox.className = sourceBgClass;
        console.log(sourceBox, destinationBox);

        // Update the last action
        lastAction = {
            sourceBoxId: sourceBoxId,
            destinationBoxId: destinationBox.id
        };
        // Push the action to the stack
        actionStack.push(lastAction);
    }

    // Reset box opacity
    sourceBox.style.opacity = '1';
    console.log(lastAction)
}
sourceBox.style.opacity = '1';

function undoLastAction() {
    if (actionStack.length > 0) {
        var lastAction = actionStack.pop();
        var sourceBox = document.getElementById(lastAction.sourceBoxId);
        var destinationBox = document.getElementById(lastAction.destinationBoxId);

        // Swap the content back
        var sourceContent = sourceBox.innerHTML;
        var destinationContent = destinationBox.innerHTML;
        sourceBox.innerHTML = destinationContent;
        destinationBox.innerHTML = sourceContent;

        // Swap the background color classes back
        var sourceBgClass = sourceBox.className;
        var destinationBgClass = destinationBox.className;
        sourceBox.className = destinationBgClass;
        destinationBox.className = sourceBgClass;
    }
}