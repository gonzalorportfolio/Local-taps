export const getEl = (el) => document.querySelector(el);

export const getUserLocation = async () => {
  try {
    if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser.');
    }
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    return position.coords;
  } catch (error) {
      console.error(`Error getting location: ${error.message}`);
  }
};

export const loadMain = () => {
    getEl('#app').innerHTML =`
    
    `
}