import { setup as setupPhoneDataStore } from './data';
import { setup as setupLoadPhoneOp } from './op-load';
import { setup as setupRegisterPhoneOp } from './op-register';
import { setup as setupVerifyPhoneOp } from './op-verify';
import { setup as setupSendVerificationCodeOp } from './op-send-verification-code';

export default function setupPhoneStore(cfg, bity) {
  let nextCfg = { ...cfg };

  nextCfg = setupPhoneDataStore(nextCfg, bity);
  nextCfg = setupLoadPhoneOp(nextCfg, bity);
  nextCfg = setupRegisterPhoneOp(nextCfg, bity);
  nextCfg = setupVerifyPhoneOp(nextCfg, bity);
  nextCfg = setupSendVerificationCodeOp(nextCfg, bity);

  return nextCfg;
}
