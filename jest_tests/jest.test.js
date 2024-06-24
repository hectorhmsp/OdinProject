//-----------------------------------------------------------------------------------------------------
// 1) Capitalize function
//-----------------------------------------------------------------------------------------------------

function firstLetter(input) {
    return input[0].toUpperCase();
};

test('capitalize function', () => {
    const firstTestString = 'test string!';
    expect(firstLetter(firstTestString)).toMatch('T');
});

//-----------------------------------------------------------------------------------------------------
// 2) Reverse string function
//-----------------------------------------------------------------------------------------------------

function reverseString (input) {
    let array = input.split("");
    let finalArray = [];
    for (let i=array.length-1; i>=0; i--) {
        finalArray.push(array[i]);
    }
    return finalArray.join("");
}

test('reverse function', () => {
    const secondTestString = 'test string';
    expect(reverseString(secondTestString)).toMatch('gnirts tset');
})

//-----------------------------------------------------------------------------------------------------
// 3) Calculator function
//-----------------------------------------------------------------------------------------------------

function calculator() {
    return {
      add: (x, y) => x + y,
      subtract: (x, y) => x - y,
      multiply: (x, y) => x * y,
      divide: (x, y) => x / y
    };
}

let x, y;
const calc = calculator();

test('calculator', () => {
    expect(calc.add(x,y)).toBe(x+y);
    expect(calc.subtract(x,y)).toBe(x-y);
    expect(calc.multiply(x,y)).toBe(x*y);
    expect(calc.divide(x,y)).toBe(x/y);
});

//-----------------------------------------------------------------------------------------------------
// 4) Caesar Cipher function
//-----------------------------------------------------------------------------------------------------

function caesarCipher(string, shiftFactor) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const bigAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function shiftLetter(char, base, shift) {
        const index = base.indexOf(char);
        if (index === -1) return char; 
        return base[(index + shift) % base.length];
    }

    return string
        .split('')
        .map(char => {
            if (/[a-z]/.test(char)) {
                return shiftLetter(char, alphabet, shiftFactor);
            } else if (/[A-Z]/.test(char)) {
                return shiftLetter(char, bigAlphabet, shiftFactor);
            } else {
                return char; 
            }
        })
        .join('');
}

test('caesar cipher', () => {
    expect(caesarCipher('Hello, World!',3)).toBe('Khoor, Zruog!');
});

//-----------------------------------------------------------------------------------------------------
// 5) analyzeArray function
//-----------------------------------------------------------------------------------------------------

let array = [];

function analyzeArray(array) {

    let average = 0;

    function arrayAverage() {
        array.forEach((item) => {
            average += item;
        });
        return average / array.length;
    }

    function arrayMin() {
        let min = array[0];
        array.forEach((item) => {
            if (item < min) {
                min = item;
            }
        });
        return min;
    }

    function arrayMax() {
        let max = array[0];
        array.forEach((item) => {
            if (item > max) {
                max = item;
            }
        });
        return max;
    }

    return {
        average: arrayAverage(),
        min: arrayMin(),
        max: arrayMax(),
        length: array.length
    }
}

const object = analyzeArray([1,8,3,4,2,6]);
console.log(object);

test('analyze array', () => {
    expect(analyzeArray([1,8,3,4,2,6])).toEqual(
        { average: 4, min: 1, max: 8, length: 6 }
    );
})