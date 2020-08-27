export const sanitize = (data: any): any => {
  for (const obj of data)
    for (const key of Object.keys(obj))
      if (key.toString().endsWith('_')) delete (obj as any)[key];

  return data;
};
