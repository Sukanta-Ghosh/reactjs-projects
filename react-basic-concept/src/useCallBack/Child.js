/* useCallback: Memorisation, used to optimize performance based on function */
import React, { memo } from "react";

function Child() {
  console.log("Child component rendered");
  return <div></div>;
}

/* memo() will not render if component not updated
Component can be updated if props are passed(not even used) */
export default memo(Child);
