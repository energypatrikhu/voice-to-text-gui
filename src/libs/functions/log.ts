import { saveToLogFile } from "$libs/functions/saveToLogFile";

export function log(...messages: any) {
  saveToLogFile("::normal::", ...messages);
}
