
//export const baseUrl = 'https://api-certificados.centrodegestion.org'; 
<<<<<<< HEAD
export const baseUrl = 'http://localhost:3001';
=======
export const baseUrl='http://localhost:3001/api';
>>>>>>> cbcc3f36b68a72a646f612fc16834141ad0389ea
//} Function to save data in localStorage
export function saveDataToLocalStorage (key, data) {
  try {
    // Convert the data to a JSON string
    const dataJSON = JSON.stringify(data);

    // Save the data in localStorage with the given key
    localStorage.setItem(key, dataJSON);

    console.log(`Data with key "${key}" saved to localStorage.`);
  } catch (error) {
    console.error('Error while saving data to localStorage:', error);
  }
}


// Function to get data from localStorage
export function getDataFromLocalStorage (key) {
  try {
    // Get the data from localStorage using the given key
    const dataJSON = localStorage.getItem(key);

    // If the data exists, parse it from JSON back to an object
    if (dataJSON !== null) {
      const data = JSON.parse(dataJSON);
      return data;
    }

    // If the data does not exist or if it's not a valid JSON, return null or handle accordingly
    return null;
  } catch (error) {
    console.error('Error while getting data from localStorage:', error);
    return null;
  }
}