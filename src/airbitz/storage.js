export default function airbitzStorageFactory() {
  return {
    getItem,
    setItem,
    removeItem,
    clear
  };

  function getItem(key) {
    return window.Airbitz.core.readData(key);
  }

  function setItem(key, value) {
    window.Airbitz.core.writeData(key, value);
  }

  function removeItem(key) {
    window.Airbitz.core.writeData(key, null);
  }

  function clear() {
    window.Airbitz.core.clearData();
  }
}
