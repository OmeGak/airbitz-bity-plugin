import createBityInstance from '../bity';
import { airbitzStorageFactory } from '../airbitz';

const HOST = 'https://dev.sbex.ch/';
const CLIENT_ID = 'o9FNeKNxVvYnJm6ANamRmJezkvEeXnRrYowp6ihB';

export default function createBity() {
  const bityCfg = {
    host: HOST,
    clientId: CLIENT_ID,
    storage: airbitzStorageFactory()
  };

  return createBityInstance(bityCfg);
}
