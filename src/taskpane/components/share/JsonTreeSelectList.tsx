import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { sampleFields } from "../../../assets/constants.js";
import { JsonTreeSelectListProps } from "../../types.js";

const JsonTreeSelectList: React.FC<JsonTreeSelectListProps> = ({ data, updateChecked, isLoop = false }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const handleCheck = (checkedValues) => {
    const checkedLabels = checkedValues.map((value) => {
      const findLabel = (nodes, value) => {
        for (const node of nodes) {
          if (node.value === value) return node.label;
          if (node.children) {
            const childLabel = findLabel(node.children, value);
            if (childLabel) return childLabel;
          }
        }
        return null;
      };
      return findLabel(sampleFields.fields, value);
    });
    setChecked(checkedLabels);
    updateChecked([...expanded, ...checkedLabels]);
    setExpanded([]);
  };

  return (
    <CheckboxTree
      nodes={data}
      checked={checked}
      expanded={expanded}
      onCheck={handleCheck}
      onExpand={(expanded) => setExpanded(expanded)}
      onlyLeafCheckboxes={!isLoop}
    />
  );
};

export default JsonTreeSelectList;
