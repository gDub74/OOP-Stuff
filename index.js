// object literal --. to be used again you will end up repeating lots of code. If you have methods in your object --> use a factory function or OOP instead.
  
const circle = { 
    radius : 1,
    location: {
        x: 1,
        y: 1
     },
    draw: function(){
        console.log('draw circle');
     }
};  

circle.draw();



// factory function way of doing it --> function returns an object 

function createCircle(radius) {
    return {
        radius,
        draw: function () {
            console.log(`draw a circle with radius ${radius}`);
       }
    }
}

// to get an instance of a factory function you can set it to a variable
const circle2 = createCircle(2);
const circle3 = createCircle(3);

circle2.draw();
circle3.draw();

// Constructor function (uppercase because like a class) 

function Circle(radius) {
    this.radius = radius;
    this.draw = function () {
        console.log('drawing Circle (in Constructor function)')
    }
}  

// use new keyword operator which creates an empty object, looks at 'this' in the constructor to fill in the details of the instance. 
// 'new' uses object constructor method 'call' under the hood to set the context of 'this' to the correct function   
const anotherCircle = new Circle(4);
anotherCircle.draw(); 


// every object has a constructor property which is used to construct that object
// even when you declare an object literal eg. --> const x = {};
// under the hood javaScript is saying const x = new Object(); 
// and build object from the object constructor or prototype


// add property or method to an instance
anotherCircle.location = { x: 1 };
// to do it dynamically use bracket notation -- here propertyName is a variable
let propertyName = 'name'
anotherCircle[propertyName] = { key: 'value' }
// likewise you can delete properties using delete keyword
delete anotherCircle[propertyName];
// console.log(anotherCircle)



// abstraction: hide the complexity and show the essentials 

function Circle2(radius) {
    this.radius = radius;

    let defaultLocation = { x: 1, y: 2 }
    // using local variables scopes to the function and are only available within the scope of the function Circle2 and abstracted away from outside
    let computeOptimumLocation = function () {
        // ...
    }

    this.draw = function () {
        computeOptimumLocation(); // referencing the local function
        this.radius++ // referencing public property with 'this'
        console.log('drawing Circle (in Constructor function)')
    }

    // to access a private property or method use Object.defineProperty and a getter and setter
    Object.defineProperty(this, 'defaultLocation', {
        get: function () {
            return defaultLocation
        },
        set: function (value) {
            // do logic on value to validate if wanted
            defaultLocation = value;
        }
    });
}  

let circle500 = new Circle2();
console.log(circle500);

// defaultLocation is available in instances scope now because of the Object.defineProperty 
 
console.log(circle500.defaultLocation);
// using the setter  
circle500.defaultLocation = { x: 2, y: 3 };
console.log(circle500.defaultLocation);


// stopwatch

function Stopwatch() {
    let duration = 0;
    let startTime;
    let stopTime;
    let running = false;

    this.start = function () {
        // start timer
        if (running) {
            throw new Error('Stopwatch has already started')
        }
        running = true;
        startTime = new Date().getTime();
    }


    this.stop = function () {
        if (!running) {
            throw new Error('Stopwatch is already stopped');
        }
        running = false;
        stopTime = new Date().getTime();
        const elapsedTime = (stopTime - startTime) / 1000;
        startTime = stopTime
        duration += elapsedTime;
    }

    this.reset = function () {
        duration = 0;
    }

    Object.defineProperty(this, 'duration', {
        get: function () {
            return duration;
        }
        // no setter because I dont want the user to be able to set the duration
    })

}

const sw = new Stopwatch();
console.log(sw);