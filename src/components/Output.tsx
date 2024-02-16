/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useMemo, useState } from "react";
import { extractUncommentedCode } from "../utils";
import { fromZodError } from "zod-validation-error";

const Output = ({
  schemaRaw,
  inputRaw,
  z,
}: {
  schemaRaw: string;
  inputRaw: string;
  z: any;
}) => {
  const [result, setResult] = useState<any>("");
  const [success, setSuccess] = useState(false);
  const schema = useMemo(() => extractUncommentedCode(schemaRaw), [schemaRaw]);
  const input = useMemo(() => extractUncommentedCode(inputRaw), [inputRaw]);

  const finalString = `${schema}.parse(${input})`;

  useEffect(() => {
    try {
      setResult(eval(finalString));
      setSuccess(true);
    } catch (error: any) {
      if (success) {
        setSuccess(false);
      }
      console.log(error, typeof error);
      setResult(error);
    }
  }, [finalString]);

  return (
    <div
      className={`bg-black/20 w-full overflow-y-auto pt-8 flex flex-col border-t-[2px] border-white/10 transition-colors duration-1000 ease-in-out ${
        success ? "!border-green-600" : "!border-red-600"
      }`}>
      {result.name === "ZodError" || result.name === "ZodIssue" ? (
        <>
          <pre className="px-8">{fromZodError(result).toString()}</pre>
          <pre className="px-8 pb-8">{JSON.stringify(result, null, "\t")}</pre>
        </>
      ) : !success ? (
        <pre className="px-8 pb-8">{result.toString()}</pre>
      ) : (
        <>
          <pre className="px-8">This input is valid</pre>
          <pre className="px-8 pb-8">{JSON.stringify(result, null, "\t")}</pre>
        </>
      )}
    </div>
  );
};

export default Output;
