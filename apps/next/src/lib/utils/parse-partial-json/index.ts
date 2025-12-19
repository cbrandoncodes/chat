import SecureJSON from "secure-json-parse";

import { fixJson } from "./fix-json";

export function parsePartialJson(
  jsonText: string | undefined
): unknown | undefined {
  if (jsonText == null) {
    return undefined;
  }

  try {
    return SecureJSON.parse(jsonText);
  } catch (ignored) {
    try {
      const fixedJsonText = fixJson(jsonText);
      return SecureJSON.parse(fixedJsonText);
    } catch (ignored: unknown) {
      // ignored
    }
  }

  return undefined;
}
