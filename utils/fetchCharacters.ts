export const fetchCharacters = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Resource not found");
      } else {
        throw new Error("Failed to fetch data");
      }
    }

    const data = await response.json();
    console.log(data.results);

    if (data) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
