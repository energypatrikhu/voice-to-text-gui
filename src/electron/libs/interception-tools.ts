import fs from "node:fs";

const requiredDrivers = [
  "C:/Windows/System32/drivers/keyboard.sys",
  "C:/Windows/System32/drivers/mouse.sys",
];

export function isInterceptionInstalled(): boolean {
  for (const driver of requiredDrivers) {
    if (!fs.existsSync(driver)) {
      return false;
    }
  }

  return true;
}
