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

    // JW NOTE: check response data structure, to make sure you're working with what's expected.
    if (!('data' in response) || !('data' in response.data)) {
      throw new Error('No data');
    }

    if (!Array.isArray(response.data.data)) {
      throw new Error('No pet items exist');
    }
    // JW NOTE: end.

    return response.data && response.data.data;
  } catch (error) {
    console.error(error);

    // JW NOTE: No return exists, subsequent code could crash.
    return [];
    // JW NOTE: end.
  }
};

/**
 * Function to format and output pet's data.
 *
 */
const exportFormattedPetData = async () => {
  // Get pets data.

  // JW NOTE: `pets` could potentially be undefined if an error occurred in getPetsData(), causing the program to crash 
  //          when variable isn't an array.
  const pets = await getPetsData();

  if (pets.length === 0) {
    return; // Added exit early check.
  }
  // JW NOTE: end.

  // Loop over, format and output pet's data.
  pets.forEach((pet) => {
    // JW NOTE: Make sure pet.name, pet.surname, pet.dateOfBirth, pet.sex, pet.breed and pet.petType exist 
    //          prior to mapping.
    // if (!hasPetProperties(pet)) {
    //   return; // skip invalid pet
    // }
    // JW NOTE: end.

    // Formatted pet's data.
    const formattedPet = {
      name: `${pet.name} ${pet.surname}`,
      age: calculateAge(pet.dateOfBirth),
      // JW NOTE: pet.sex should of been checked and outputted as a "male" or "female".
      animal: `${pet.sex} ${pet.breed} ${pet.petType}`,
      // animal: `${getMaleFemaleLabel(pet.sex)} ${pet.breed} ${pet.petType}`,
      // JW NOTE: end.
    };


    // JW NOTE: 1. Do no include a space between the JSON + \n, unnecassary data is being passed to the buffer.
    //          2. No need to write to `output` variable, create JSON directly in process.stdout.write()

    // Convert object data to JSON string and add a new line
    const output = `${JSON.stringify(formattedPet)} \n`;

    // Output pet data
    process.stdout.write(output);

    // process.stdout.write(`${JSON.stringify(formattedPet)}\n`);
    // JW NOTE: end.
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

  // JW NOTE: 1. A pet could be born on 1. Jan 2022, making it 9 months old, although zero years will be returned.
  //             Although I did not specify years, days or months, so not directly a mistake on your part, but lack of 
  //             specification by me. Always raise a question when an assumption exists.
  //          2. No need to create age variable, return calculation directly.

  // const age = today.getFullYear() - birthDate.getFullYear();
  // return age;

  return today.getFullYear() - birthDate.getFullYear();
  // JW NOTE: end.
};

// Export formatted pet data.
exportFormattedPetData();
