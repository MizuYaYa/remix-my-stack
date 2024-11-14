import { extendConfig, extendTheme } from "@yamada-ui/react";
import { customConfig } from "~/theme/config";

export const customTheme = {};

export const theme = extendTheme(customTheme)();
export const config = extendConfig(customConfig);
