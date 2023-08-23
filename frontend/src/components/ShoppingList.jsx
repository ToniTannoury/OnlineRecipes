import { useState } from "react"
import ExpandableTree from "./ExpandableTree";
const ShoppingList = () => {
  const [expanded, setExpanded] = useState(false);
  return (
   
<ExpandableTree
        title={"qq"}
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded && (
          <div className="expandable-content">
           qq
          </div>
        )}
      </ExpandableTree>
  )
}

export default ShoppingList