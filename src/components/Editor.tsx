import CodeMirror from "@uiw/react-codemirror";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { jsonLanguage } from "@codemirror/lang-json";
import { useCallback } from "react";

const extensions = {
  javascript: [javascriptLanguage],
  json: [jsonLanguage],
};

export type EXTENSIONS = "javascript" | "json";

function Editor({
  value,
  setValue,
  extension,
}: {
  value: string;
  setValue: (v: string) => void;
  extension: EXTENSIONS;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = useCallback((val: any) => {
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      theme={"dark"}
      extensions={extensions[extension]}
      onChange={onChange}
    />
  );
}
export default Editor;
