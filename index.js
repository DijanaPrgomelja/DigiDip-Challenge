// Create a function/class which will perform a HTTP request to “https://www.xylesoft.de/dev/testing.json”, the created function/method should respond with returned data, with some considerations on known errors.
// Loop over the response and create new objects with the following interface and mapping rules:
// { name: string, age: number; animal: string; }
// Name = name + surname
// Age = calculate age based on dateOfBirth
// Animal = Formatted as "(Male or Female) (breed) (petType)"
// Write all the new objects to the process's STDOUT buffer as a JSON string, with a newline after each JSON object.
// There should be at least a single entry file (e.g. index.js) and package.json so I can execute it with `node index.js` which will produce the results.

const axios = require("axios");

/**
 * Async Function to get pet data.
 *
 * @return {object} - Pet data.
 */
const getPetsData = async () => {
  try {
    // I used axios because it is a promise-based HTTP client.
    // I could have used fetch, but I didn't want to.
    // Make GET request to get pet data.
    const response = await axios.get(
      "https://www.xylesoft.de/dev/testing.json"
    );

    return response.data && response.data.data;
  } catch (error) {
    console.error(error);
  }
};
/**
 * Function to format and output pet's data.
 *
 */
const exportFormattedPetData = async () => {
  // Get pets data.
  const pets = await getPetsData();

  // Loop over, format and output pet's data.
  pets.forEach((pet) => {
    // Formatted pet's data.
    const formattedPet = {
      name: `${pet.name} ${pet.surname}`,
      age: calculateAge(pet.dateOfBirth),
      animal: `${pet.sex} ${pet.breed} ${pet.petType}`,
    };

    // Convert object data to JSON string and add a new line
    const output = `${JSON.stringify(formattedPet)} \n`;

    // Output pet data
    process.stdout.write(output);
  });
};

/**
 * Function to calculate pet's age
 *
 * @param {string} dateOfBirth
 * @return {integer} - Age of pet.
 */
const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

// Export formatted pet data.
exportFormattedPetData();
