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
    <main class="wrapper">
      <h2>LOCAL TAPAS</h2>
      <p>Make a list of Tapas restaurant you would like to eat</p>
      <p>Once you are done check it off!</p>
      <ul class="plates">
        <li>Loading Tapas...</li>
      </ul>
      <form id="add-items">
        <input type="text" name="item" placeholder="Item Name" required>
        <input type="submit" value="+ Add Item">
      </form>
    </main>
    `
}