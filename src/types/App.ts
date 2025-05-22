export interface App {
  electronVersion: string;
  appVersion: string;
  startupDate: string;
  ready: boolean;
  mode: "development" | "production";
  interceptionDriverInstalled: boolean;
}
