
export class DragDropController {
    constructor(element, onDrop=()=>{}) { //onDrop is an empty function by default
        this.element = element;
        this.onDrop = onDrop;
        this.offsetX = 0;
        this.offsetY = 0;

        // Bind methods to `this` context
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        // Add the event listener for the mousedown event to start dragging
        this.element.addEventListener('mousedown', this.onMouseDown);
    }

    // Called when drag starts
    onMouseDown(e) {
        // Calculate the initial offset relative to the mouse
        this.offsetX = e.clientX - this.element.offsetLeft;
        this.offsetY = e.clientY - this.element.offsetTop;

        // Attach mousemove and mouseup event listeners to handle the drag
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);

        // Prevent text selection while dragging
        e.preventDefault();
    }

    // Called while dragging the element
    onMouseMove(e) {
        const containerRect = this.element.parentElement.getBoundingClientRect();
        const elementRect = this.element.getBoundingClientRect();

        const newX = e.clientX - this.offsetX;
        const newY = e.clientY - this.offsetY;

        let percentX = (newX / containerRect.width) * 100;
        let percentY = (newY / containerRect.height) * 100;

        percentX = Math.min(Math.max(percentX, 0), 100 - (elementRect.width / containerRect.width) * 100);
        percentY = Math.min(Math.max(percentY, 0), 100 - (elementRect.height / containerRect.height) * 100);

        this.element.style.left = percentX + '%';
        this.element.style.top = percentY + '%';
    }

    // Called when drag ends
    onMouseUp(e) {
        // Remove event listeners for mousemove and mouseup
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);

        const percentX = parseFloat(this.element.style.left);
        const percentY = parseFloat(this.element.style.top);

        this.onDrop(this.element, percentX, percentY, e);
    }

    // Clean up the event listeners
    destroy() {
        this.element.removeEventListener('mousedown', this.onMouseDown);
    }
}