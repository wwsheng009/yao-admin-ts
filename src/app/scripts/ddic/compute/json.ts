/**
 * scripts.ddic.compute.json.View
 * @param {*} data
 * @returns
 */
function View(data: any) {
  if (isObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}
/**
 * scripts.ddic.compute.json.Edit
 * @param {any} data
 * @returns
 */
function Edit(data: any) {
  if (isJsonString(data)) {
    return JSON.parse(data);
  }
  return data;
}

function isObject(value: any) {
  return value && typeof value === "object"; // && value.constructor === Object;
}
function isJsonString(obj: any) {
  try {
    JSON.parse(obj);
  } catch (e) {
    return false;
  }
  return true;
}
