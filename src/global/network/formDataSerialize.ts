export default function formDataSerialize(
  variables: object,
  removeList: Array<String>
) {
  const formData = new FormData();
  buildFormData(formData, variables, removeList);
  return formData;
}

function buildFormData(
  formData: FormData,
  data: any,
  removeList: Array<String>,
  parentKey?: string
) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      if (!removeList.includes(key)) {
        if (Array.isArray(data[key]) && data[key].length === 0) {
          formData.append(parentKey ? `${parentKey}[${key}]` : key, "[]");
        } else {
          buildFormData(
            formData,
            data[key],
            removeList,
            parentKey ? `${parentKey}[${key}]` : key
          );
        }
      }
    });
  } else if (data && Array.isArray(data)) {
    data.forEach((item, index) => {
      buildFormData(
        formData,
        data[index],
        removeList,
        parentKey ? `${parentKey}[${index}]` : `${index}`
      );
    });
    Object.keys(data).forEach((key: any) => {
      if (!removeList.includes(key)) {
        buildFormData(
          formData,
          data[key],
          removeList,
          parentKey ? `${parentKey}[${key}]` : key
        );
      }
    });
  } else {
    if (parentKey) {
      const value = data == null ? "" : data;
      formData.append(parentKey, value);
    }
  }
}
