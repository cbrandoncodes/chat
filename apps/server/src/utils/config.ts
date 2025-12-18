export function getURL() {
  let url = process.env?.BASE_URL ?? "http://localhost:5050/";
  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
}
