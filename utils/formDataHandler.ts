const formDataHandler = async (form: any): Promise<FormData> => {
  const formData = new FormData();

  for (const key in form) {
    const value = form[key];
    if (value && typeof value === "object" && value.type === "image") {
      formData.append(key, {
        uri: value.uri,
        name: value.name || "image.jpg",
        type: value.mimeType || "image/jpeg",
      });
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};

export { formDataHandler };
