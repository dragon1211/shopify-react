import React, { useMemo } from "react";
import { EntryPoint } from "../../../components/EntryPoint";

const Context = () => {
  const cid = useMemo(() => {
    return (window as any).__st.cid;
  }, []);

  return <div>{cid}</div>;
};

EntryPoint(
  <div>
    <Context />
  </div>
);
