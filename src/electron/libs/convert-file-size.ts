export function convertFileSize({
  bytes,
  decimalPoint,
}: {
  bytes: number;
  decimalPoint?: number;
}) {
  if (bytes == 0) return "0 iB";
  const k = 1024;
  const dm = decimalPoint || 2;
  const sizes = ["iB", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
