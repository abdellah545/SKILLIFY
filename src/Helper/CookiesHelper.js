const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};
const cookieExists = (name) => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return true; // Cookie found
    }
  }

  return false; // Cookie not found
};
// const getCookie = (name) => {
//   const cookieName = `${name}=`;
//   const decodedCookie = document.cookie;
//   const cookieArray = decodedCookie.split(";");

//   for (let i = 0; i < cookieArray.length; i++) {
//     let cookie = cookieArray[i];
//     while (cookie.charAt(0) === " ") {
//       cookie = cookie.substring(1);
//     }
//     if (cookie.indexOf(cookieName) === 0) {
//       return cookie.substring(cookieName.length, cookie.length);
//     }
//   }

//   return null;
// };
const getCookie = (name) => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      const value = cookie.substring(cookieName.length, cookie.length);
      return decodeURIComponent(value); // Decode the cookie value before returning
    }
  }

  return null;
};

const setCookie = (name, value, expirationDate) => {
  const encodedValue = encodeURIComponent(value);

  let expiresUTC;
  if (!expirationDate) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    expiresUTC = expires.toUTCString();
  } else {
    const expires = new Date(expirationDate);
    expiresUTC = expires.toUTCString();
  }

  document.cookie = `${name}=${encodedValue};expires=${expiresUTC};path=/`;
};

// export const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
//   return null;
// };


export { deleteCookie, cookieExists, getCookie, setCookie };
