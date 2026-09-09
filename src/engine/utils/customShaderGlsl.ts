export const DEFAULT_CUSTOM_SHADER_COORD_CODE = `vec2 uv = _st;
float aspect = resolution.x / max(1.0, resolution.y);
uv -= 0.5;
uv.x *= aspect;
uv.x += sin(uv.y * 14.0 + time * 2.4) * a * 0.11;
uv.y += cos(uv.x * 11.0 - time * 1.8) * a * 0.045;
uv.x /= aspect;
return uv;`;

export const DEFAULT_CUSTOM_SHADER_COLOR_CODE = `float luma = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
return vec4(mix(_c0.rgb, vec3(luma), a * 0.7), _c0.a);`;

export function defaultCustomShaderCode(shaderType: number): string {
  return Math.round(shaderType) === 1
    ? DEFAULT_CUSTOM_SHADER_COLOR_CODE
    : DEFAULT_CUSTOM_SHADER_COORD_CODE;
}

export function simpleStringHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

export function wrapCustomShaderGlsl(
  userCode: string,
  shaderType: number,
): { type: "coord" | "color"; glsl: string } {
  const type = Math.round(shaderType) === 1 ? "color" : "coord";
  let body = userCode.trim().replace(/^#version[^\n]*\n?/gm, "");
  if (!/\breturn\b/.test(body)) {
    body = type === "coord" ? `${body}\nreturn _st;` : `${body}\nreturn _c0;`;
  }

  const header =
    type === "coord"
      ? "float a = clamp(amount, 0.0, 1.0);\nif (a < 0.00001) return _st;"
      : "float a = clamp(amount, 0.0, 1.0);\nif (a < 0.00001) return _c0;";

  return { type, glsl: `${header}\n${body}` };
}
