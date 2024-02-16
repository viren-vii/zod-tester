import Editor from "./Editor";

const SchemaEditor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) => {
  return (
    <div className="h-full w-full overflow-y-scroll">
      <Editor value={value} setValue={setValue} extension="javascript" />
    </div>
  );
};

export default SchemaEditor;
