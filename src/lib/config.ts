import fs from "fs";
import path from "path";

export interface AppConfig {
  price: string;
  checkoutLink: string;
  scripts: string[];
}

const configPath = path.join(process.cwd(), "src", "data", "config.json");

export function getConfig(): AppConfig {
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, "utf-8");
      return JSON.parse(data) as AppConfig;
    }
  } catch (err) {
    console.error("Error reading config:", err);
  }
  return {
    price: "117",
    checkoutLink: "",
    scripts: [],
  };
}

export function saveConfig(config: AppConfig): void {
  try {
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving config:", err);
    throw err;
  }
}
