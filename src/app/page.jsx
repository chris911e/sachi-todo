import React from "react";
import { container } from "./page.module.css";
import TodoContainer from "./components/TodoContainer";

export default function Home() {
  return (
    <div className={container}>
           <TodoContainer />
    </div>
  );
}
