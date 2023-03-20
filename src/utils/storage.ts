const getStorage = (key: string, initialValue = '') => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
  }
};

const setStorage = (key: string, value: string) => {
  try {
    const item = localStorage.getItem(key);
    const itemArr = item ? JSON.parse(item) : [];
    if (itemArr.includes(value)) {
      itemArr.splice(itemArr.indexOf(value), 1);
    }
    itemArr.unshift(value);
    localStorage.setItem(key, JSON.stringify(itemArr));
  } catch (error) {
    console.error(error);
  }
};

const removeStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export { getStorage, setStorage, removeStorage };
