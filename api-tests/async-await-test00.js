const server = {
  people: [
    {
      name: "Odin",
      age: 20,
    },
    {
      name: "Thor",
      age: 35,
    },
    {
      name: "Freyja",
      age: 29,
    },
  ],

  getPeople() {
    return new Promise((resolve, reject) => {
      // Simulating a delayed network call to the server
      setTimeout(() => {
        resolve(this.people);
      }, 1000);
    });
  },
};

async function getPersonsInfo(name) {
  const people = await server.getPeople();
  const person = await people.find(person => { return person.name === name });
  return console.log(person);
}

getPersonsInfo("Thor");

/*

OR: 

async function fetchData(name) {
  try {
    const person = await getPersonsInfo(name);
    console.log("Person found:", person);
    return person;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData("Thor");

OR:

getPersonsInfo("Thor")
  .then(person => {
    console.log("Person found:", person);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

*/
