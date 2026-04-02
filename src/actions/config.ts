"use server";

import { getConfig, saveConfig, AppConfig } from "@/lib/config";
import { revalidatePath } from "next/cache";

export async function getConfigAction() {
  return getConfig();
}

export async function updateConfigAction(password: string, data: AppConfig) {
  if (password !== "aglomerado") {
    return { success: false, error: "Senha incorreta." };
  }
  
  try {
    saveConfig(data);
    revalidatePath("/", "layout");
    revalidatePath("/config", "page");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || "Erro desconhecido ao salvar configuração." };
  }
}
