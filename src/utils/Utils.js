export const guardValue = (value, placeholder = '') => {
    if (value === null || value === undefined) {
      return placeholder;
    }
    return value;
  };

  export const formatNumber = (value, placeholder = '??') => {
    if (value === null || value === undefined) {
      return placeholder;
    }
    return value.toLocaleString();
  };

  export const formatURL = (url) => {
    const regex = /^(http:\/\/|https:\/\/)/;
    if (!regex.test(url)) {
      return `//${url}`;
    }
    return url;
  };