import fs from "fs";
import path from "path";

export interface CheckoutLink {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
}

export interface AppConfig {
  price: string;
  checkoutLinks: CheckoutLink[];
  scripts: string[];
}

const configPath = path.join(process.cwd(), "src", "data", "config.json");

export function getConfig(): AppConfig {
  try {
    if (fs.existsSync(configPath)) {
      const data = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      
      // Backward compatibility: Convert single checkoutLink to checkoutLinks array
      let checkoutLinks = data.checkoutLinks || [];
      if (checkoutLinks.length === 0 && data.checkoutLink) {
        checkoutLinks = [{ id: "default", name: "Link Padrão", url: data.checkoutLink, isActive: true }];
      }

      return {
        price: data.price || "117",
        checkoutLinks: checkoutLinks,
        scripts: data.scripts || [],
      };
    }
  } catch (err) {
    console.error("Error reading config:", err);
  }
  return {
    price: "117",
    checkoutLinks: [],
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
