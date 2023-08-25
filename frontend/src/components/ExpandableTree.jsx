import React from "react";
import '../styles/expandableTree.css'
const ExpandableTree = ({id ,  title, expanded, onClick, children}) => {
  const [datePart, timePart] = title.split("T")
  const [hour, minutes] = timePart.split(":").slice(0, 2)
  return (
    <div _id={id} className="expandable-tree">
      <div
        className="expandable-header hw"
        onClick={onClick}
      >
        <div>{expanded ? "▼" : "►"} Created Date:{datePart} , Time:{`${+hour+3}`+":"+minutes}</div>   
      </div>
      {expanded && <div className="expandable-content">{children}</div>}
    </div>
  );
};

export default ExpandableTree;
