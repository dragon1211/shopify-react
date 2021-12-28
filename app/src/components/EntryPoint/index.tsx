import React, { ReactNode, StrictMode } from "react";
import { render } from "react-dom";

export const EntryPoint = (node: ReactNode, id: string = "app") =>
  render(<StrictMode>{node}</StrictMode>, document.getElementById(id));

export const EntryFooterPoint = (node: ReactNode, id: string = "footer") =>
  render(<StrictMode>{node}</StrictMode>, document.getElementById(id));
  
export const EntryNavbarPoint = (node: ReactNode, id: string = "navbar") =>
  render(<StrictMode>{node}</StrictMode>, document.getElementById(id));
