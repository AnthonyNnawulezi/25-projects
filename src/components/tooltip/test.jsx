import React from "react";
import Tooltip from ".";
import "./style.css";

function TooltipTest() {
  return (
    <div>
      <h1>Tooltip</h1>
      <Tooltip
        delay={1000}
        content={"Tooltip content"}
        children={<p>Hover me</p>}
      />
    </div>
  );
}

export default TooltipTest;
