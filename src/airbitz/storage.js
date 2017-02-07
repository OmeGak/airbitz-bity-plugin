/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import * as airbitz from 'airbitzPluginApi';
/* eslint-enable import/no-extraneous-dependencies, import/extensions */

export default function airbitzStorageFactory() {
  return {
    getItem,
    setItem,
    removeItem,
    clear
  };

  function getItem(key) {
    return airbitz.core.readData(key);
  }

  function setItem(key, value) {
    airbitz.core.writeData(key, value);
  }

  function removeItem(key) {
    airbitz.core.writeData(key, null);
  }

  function clear() {
    airbitz.core.clearData();
  }
}
