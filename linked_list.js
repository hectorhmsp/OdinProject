function createNode(value) {
    return {
        value: value,
        nextNode: null
    };
}

function createLinkedList() {
    return {
        listHead: null,

        prepend: function(value) {
            const newNode = createNode(value);
            if (this.listHead !== null) {
                newNode.nextNode = this.listHead;
            }
            this.listHead = newNode;
        },

        append: function(value) {
            const newNode = createNode(value);
            if (this.listHead === null) { 
                this.listHead = newNode;
            } else {
                let tmp = this.listHead;
                while (tmp.nextNode !== null) {
                    tmp = tmp.nextNode;
                }
                tmp.nextNode = newNode;
            }
        },

        size: function() {
            let tmp = this.listHead;
            let counter = 0;
            while (tmp !== null) {
                counter++;
                tmp = tmp.nextNode;
            }
            return counter;
        },

        head: function() {
            return this.listHead;
        },

        tail: function() {
            let tmp = this.listHead;
            if (!tmp) return null;
            while (tmp.nextNode !== null) {
                tmp = tmp.nextNode;
            }
            return tmp;
        },

        at: function(index) {
            let tmp = this.listHead;
            for (let i=0; i<index; i++) {
                if (tmp === null) return "There is no index";
                tmp = tmp.nextNode;
            }
            return tmp;
        },

        pop: function() {
            let prev = this.listHead;
            let cur = prev.nextNode;
            while (cur.nextNode !== null) {
                prev = cur;
                cur = cur.nextNode;
            }
            prev.nextNode = null;
        },

        contains: function(value) {
            let tmp = this.listHead;
            if (!tmp) return "There's no element in the list";
            while (tmp !== null) {
                if (tmp.value === value) { return true }
                tmp = tmp.nextNode;
            }
            return false;
        },

        finds: function(value) {
            let index = 0;
            let tmp = this.listHead;
            while (tmp !== null) {
                if (tmp.value === value) { return index }
                tmp = tmp.nextNode;
                index++;
            }
            return null;
        },

        toString: function() {
            let tmp = this.listHead;
            let stringList = "";
            while (tmp != null) {
              stringList += `(${tmp.value}) -> `;
              tmp = tmp.nextNode;
            }
            return (stringList += "null");
        }
    }
}


// Create a new linked list
let myList = createLinkedList();

// Test prepend method
console.log("Prepending 10 to the list");
myList.prepend(10);
console.log("List after prepending 10:", myList.toString(), "\n"); // Should display (10) -> null

console.log("Prepending 20 to the list");
myList.prepend(20);
console.log("List after prepending 20:", myList.toString(), "\n"); // Should display (20) -> (10) -> null

// Test append method
console.log("Appending 30 to the list");
myList.append(30);
console.log("List after appending 30:", myList.toString(), "\n"); // Should display (20) -> (10) -> (30) -> null

// Test size method
console.log("Size of the list:", myList.size()); // Should display 3

// Test head method
console.log("Head of the list:", myList.head().value); // Should display 20

// Test tail method
console.log("Tail of the list:", myList.tail().value); // Should display 30

// Test at method
console.log("Element at index 1:", myList.at(1).value); // Should display 10
console.log("Element at index 3:", myList.at(3), "\n"); // Should display "There is no index"

// Test pop method
console.log("Popping the last element");
myList.pop();
console.log("List after popping:", myList.toString(), "\n"); // Should display (20) -> (10) -> null

// Test contains method
console.log("Does the list contain 10?", myList.contains(10)); // Should display true
console.log("Does the list contain 30?", myList.contains(30)); // Should display false

// Test find method
console.log("Index of element 10:", myList.finds(10)); // Should display 1
console.log("Index of element 30:", myList.finds(30)); // Should display null

// Display the entire list as a string
console.log("String representation of the list:", myList.toString()); // Should display (20) -> (10) -> null
