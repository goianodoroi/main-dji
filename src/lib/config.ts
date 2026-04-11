import fs from "fs";
import path from "path";

export interface CheckoutLink {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
}

export interface ProductConfig {
  id: string;
  price: string;
  oldPrice: string;
  checkoutLinks: CheckoutLink[];
}

export interface AppConfig {
  products: ProductConfig[];
  scripts: string[];
}

const configPath = path.join(process.cwd(), "src", "data", "config.json");

export function getConfig(): AppConfig {
  const defaultCombo: ProductConfig = {
    id: "combo",
    price: "450",
    oldPrice: "1178.99",
    checkoutLinks: []
  };
  const defaultPocket3: ProductConfig = {
    id: "pocket3",
    price: "117",
    oldPrice: "629",
    checkoutLinks: []
  };

  try {
    if (fs.existsSync(configPath)) {
      const data = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      
      let products = data.products || [];
      
      // Backward compatibility: Convert single product data to products array
      if (products.length === 0) {
        let checkoutLinks = data.checkoutLinks || [];
        if (checkoutLinks.length === 0 && data.checkoutLink) {
          checkoutLinks = [{ id: "default", name: "Link Padrão", url: data.checkoutLink, isActive: true }];
        }
        products = [
          { ...defaultCombo },
          {
            id: "pocket3",
            price: data.price || "117",
            oldPrice: "629",
            checkoutLinks: checkoutLinks
          }
        ];
      }

      const combo = products.find((p: ProductConfig) => p.id === "combo") || defaultCombo;
      const pocket3 = products.find((p: ProductConfig) => p.id === "pocket3") || defaultPocket3;

      return {
        products: [combo, pocket3],
        scripts: data.scripts || [],
      };
    }
  } catch (err) {
    console.error("Error reading config:", err);
  }
  return {
    products: [defaultCombo, defaultPocket3],
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
