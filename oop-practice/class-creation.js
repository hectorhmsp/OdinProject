class Person {
    constructor(name, age, country) {
        this.name = name;
        this.age = age;
        this.country = country;
    }

    displayDetails() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Country: ${this.country}`);
    }
}

const person1 = new Person ('Hector', 23, 'Brasil');
const person2 = new Person ('Lucy', 21, 'Brasil');

console.log('Person-1 Details: ');
person1.displayDetails();

console.log('\nPerson-2 Details: ');
person2.displayDetails();


