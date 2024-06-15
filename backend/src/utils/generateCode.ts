import { v4 as uuid } from 'uuid';

async function generateUUIDCode() {
  const code = uuid();
  return code.replace(/-/g, '').slice(0, 10);
}

export default generateUUIDCode;