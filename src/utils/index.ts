export const extractUncommentedCode = (code: string) => {
  // Split the code into lines
  const lines = code.split("\n");
  // Filter out the lines that are not comments
  const uncommentedCode = lines.filter((line) => !line.trim().startsWith("//"));
  // Join the uncommented lines back into a single string
  return uncommentedCode.join("\n").replace(/\n/g, "");
};
