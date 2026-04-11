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
  const defaultPocket3: ProductConfig = {
    id: "pocket3",
    price: "117",
    oldPrice: "629",
    checkoutLinks: []
  };
  const defaultOsmo360: ProductConfig = {
    id: "osmo360",
    price: "401.49",
    oldPrice: "549.99",
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
          {
            id: "pocket3",
            price: data.price || "117",
            oldPrice: "629",
            checkoutLinks: checkoutLinks
          },
          {
            ...defaultOsmo360
          }
        ];
      }

      const pocket3 = products.find((p: ProductConfig) => p.id === "pocket3") || defaultPocket3;
      const osmo360 = products.find((p: ProductConfig) => p.id === "osmo360") || defaultOsmo360;

      return {
        products: [pocket3, osmo360],
        scripts: data.scripts || [],
      };
    }
  } catch (err) {
    console.error("Error reading config:", err);
  }
  return {
    products: [defaultPocket3, defaultOsmo360],
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
