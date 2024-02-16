import { useState } from "react";
import InputEditor from "./components/InputEditor";
import Output from "./components/Output";
import SchemaEditor from "./components/SchemaEditor";
import { z } from "zod";

export default function App() {
  const [schemaRaw, setSchemaRaw] = useState(
    localStorage.getItem("schema") ??
      `//Insert here your Zod schema
  z.object({
    greeting:z.string()
  })
  `
  );
  const [inputRaw, setInputRaw] = useState(
    localStorage.getItem("input") ??
      `//Insert here the object to validate
    {greeting:"Hello World!"}`
  );

  window.addEventListener("beforeunload", (ev) => {
    ev.preventDefault();
    localStorage.setItem("schema", schemaRaw);
    localStorage.setItem("input", inputRaw);
  });

  return (
    <div className="h-[100vh] w-[100vw] bg-[#282C34]">
      <div className="flex flex-col">
        <div className="flex flex-col h-[65vh] md:flex-row">
          <div className="flex flex-col flex-1 h-[50%] md:h-full">
            <pre className="pl-2 text-white/40 text-sm bg-white/10">
              Write Schema
            </pre>
            <SchemaEditor value={schemaRaw} setValue={setSchemaRaw} />
          </div>
          <div className="flex flex-col flex-1 h-[50%] md:h-full">
            <pre className="pl-2 text-white/40 text-sm bg-white/10">
              Write Input
            </pre>
            <InputEditor value={inputRaw} setValue={setInputRaw} />
          </div>
        </div>
        <div className="flex h-[35vh]">
          <Output schemaRaw={schemaRaw} inputRaw={inputRaw} z={z} />
        </div>
      </div>
    </div>
  );
}

