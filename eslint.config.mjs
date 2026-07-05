import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import { globalIgnores } from "eslint/config";

const eslintConfig = [
  globalIgnores([".next/**", "node_modules/**", "out/**"]),
  ...nextVitals,
  ...nextTypeScript,
  {
    rules: {
      "react/no-unescaped-entities": "off"
    }
  }
];

export default eslintConfig;
