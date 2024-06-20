export function anyHas(
  string: string | Array<string>,
  include: null | string | Array<string> = null,
  exclude: null | string | Array<string> = null,
) {
  if (null !== exclude) {
    if ('string' === typeof exclude && string.includes(exclude)) {
      return false;
    }
    if ('object' === typeof exclude) {
      for (const exc of exclude) {
        if (string.includes(exc) && '' !== exc) {
          return false;
        }
      }
    }
  }

  if (null !== include) {
    if ('string' === typeof include && string.includes(include)) {
      return true;
    }
    if ('object' === typeof include) {
      for (const inc of include) {
        if (string.includes(inc) && '' !== inc) {
          return true;
        }
      }
    }
  }

  return false;
}
