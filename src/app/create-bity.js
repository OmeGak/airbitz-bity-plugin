import createBityInstance from '../bity';
import { airbitzStorageFactory } from '../airbitz';

// ==========================
// dev config
// ==========================
const HOST = 'https://dev.sbex.ch/';
const CLIENT_ID = 'o9FNeKNxVvYnJm6ANamRmJezkvEeXnRrYowp6ihB';

// ==========================
// prod config
// ==========================
// const HOST = 'https://bity.com/';
// const CLIENT_ID = 'QmaTkYI50XmCF18fupZgdAOptYqDzVix12RpqFYS';

export default function createBity() {
  const bityCfg = {
    host: HOST,
    clientId: CLIENT_ID,
    storage: airbitzStorageFactory()
  };

  return createBityInstance(bityCfg);
}
