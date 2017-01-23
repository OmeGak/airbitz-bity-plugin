import createBityInstance from '../bity';

const HOST = 'https://dev.sbex.ch/';
const CLIENT_ID = 'T1DrLQ7nfiBYkCVAT7oFuIPsU8YoSWsevvaWU4tT';

export default function createBity() {
  const bityCfg = {
    host: HOST,
    clientId: CLIENT_ID
  };

  return createBityInstance(bityCfg);
}
