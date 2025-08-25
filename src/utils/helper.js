export const isEmpty = (val) => {
  if (
    val === undefined ||
    val === null ||
    (typeof val === "string" && val.trim() === "")
  )
    return true;
  else if (Array.isArray(val) && val.length === 0) return true;
  else if (typeof val === "object" && Object.keys(val)?.length === 0)
    return true;
  return false;
};
