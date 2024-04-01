class Rectangle {
    constructor(width, height) { 
        this.width = width;
        this.height = height;
    }

    rectArea() {
        return this.height * this.width;
    }

    rectPerimeter() {
        return 2 * (this.height + this.width);
    }
}

const rectangle = new Rectangle(5, 7);

const area = rectangle.rectArea();
const perimeter = rectangle.rectPerimeter();

// Display the results
console.log(`Rectangle Area: ${area}`);
console.log(`Rectangle Perimeter: ${perimeter}`);
