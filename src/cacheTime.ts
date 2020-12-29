import fs from 'fs';

export function storeTime(): number {
  const timestamp = Date.now().toString();
  try {
    fs.writeFileSync('./time.cache', timestamp);
    return parseInt(timestamp);
  } catch (err) {
    console.error(err);
    return parseInt(timestamp); 
  }
}

export function loadTime(): number {
  let output: number;

  try {
    if (fs.existsSync('./time.cache')) {
      output = parseInt(fs.readFileSync('./time.cache').toString());
    }
  } catch(err) {
    console.error(err);
    output = Date.now();
  }
  
  return output;
}
