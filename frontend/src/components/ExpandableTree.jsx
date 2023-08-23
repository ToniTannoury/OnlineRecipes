import React from "react";
import '../styles/expandableTree.css'
const ExpandableTree = ({id ,  title, expanded, onClick, children}) => {
  return (
    <div _id={id} className="expandable-tree">
      <div
        className="expandable-header hw"
        onClick={onClick}
      >
        <div>{expanded ? "▼" : "►"} {title}</div>   
      </div>
      {expanded && <div className="expandable-content">{children}</div>}
    </div>
  );
};

export default ExpandableTree;
