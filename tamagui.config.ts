import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui";

const config = createTamagui(defaultConfig);

type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
