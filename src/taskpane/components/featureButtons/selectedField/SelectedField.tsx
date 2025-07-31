/* eslint-disable no-undef */
import * as React from "react";
import SelectedFieldsTable from "../../share/SelectedFieldsTable";

export interface SelectedFieldProps {
  info: any;
}

const SelectedField: React.FC<SelectedFieldProps> = ({ info }) => {
  return (
    <>
      <SelectedFieldsTable entries={info} />
    </>
  );
};

export default SelectedField;
