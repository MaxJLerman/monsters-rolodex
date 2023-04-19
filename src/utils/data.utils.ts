// any function that await returns something, must be declared as returning a Promise
// the function below gets a type T which is what the user sees as the return value type
export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return await response.json();
};