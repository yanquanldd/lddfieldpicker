import * as React from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../featureButtons";
import { useState } from "react";
import { sampleFields, formatOptions, outputOptions } from "../../../../assets/constants.js";
import { useSelectedTextStore } from "../../../../store/selectedTextStore";
import { InsertionProps } from "../../../types";
import JsonTreeSelectList from "../../share/JsonTreeSelectList";
import { findNestedObject } from "../../../Helpers";
import SelectedFieldsTable from "../../share/SelectedFieldsTable";
import { useIsInLoopStore } from "../../../../store/loopInfoStore";

export enum PrintActionTypes {
  Field = "Field",
  Custom = "Custom",
}

const PrintInsertion: React.FC<InsertionProps> = ({
  insertText,
  replaceText,
  decodedFields,
  editMode = false,
  updateEditType,
}) => {
  const { text } = useSelectedTextStore();
  const { isInLoop, currentLoopField } = useIsInLoopStore();

  const [show, setShow] = useState(editMode);
  const [actionSelected, setActionSelected] = useState<PrintActionTypes>(undefined);
  const [field, setField] = useState<string[]>(editMode ? decodedFields.field : []);
  const [formatOption, setFormatOption] = useState<string>(editMode ? decodedFields.formatOption : "");
  const [outputOption, setOutputOption] = useState<string>(editMode ? decodedFields.outputOption : "");
  const [addFilter, setAddFilter] = useState<boolean>(editMode && decodedFields.filter !== undefined);

  const [addedValues, setAddedValues] = useState<any>({
    field: field,
    formatOption: formatOption,
    outputOption: outputOption,
  });

  const handleInsert = async (value: string) => {
    if (text.length > 0) {
      replaceText(value);
      updateEditType();
    } else {
      insertText(value);
    }
    handleClose();
  };

  const parsePrintText = () => {
    let parsedStr = "";
    if (!outputOption && !formatOption) {
      parsedStr = `{%${field.join(".")}}`;
    } else if (outputOption && !formatOption) {
      parsedStr = `{%${field.join(".")}` + `|${outputOption}}`;
    } else if (formatOption && !outputOption) {
      parsedStr = `{%${field.join(".")}` + `|${formatOption}}`;
    } else {
      parsedStr = `{%${field.join(".")}` + `|${formatOption}` + `|${outputOption}}`;
    }

    return parsedStr;
  };

  const handleClear = () => {
    setField([]);
    setFormatOption("");
    setOutputOption("");
    setAddedValues({
      field: field,
      formatOption: "",
      outputOption: "",
    });
    setActionSelected(undefined);
  };

  const handleClose = () => {
    handleClear();
    setShow(false);
  };

  const handleFilterButtonClick = () => {
    setAddFilter(!addFilter);
  };

  const handleFieldSelect = (value: string[]) => {
    setField(value);
    setAddedValues({ field: value, outputOption: "", formatOption: "" });
    setOutputOption("");
    setFormatOption("");
    setActionSelected(undefined);
  };

  const handleOutputSelect = (value: string) => {
    setOutputOption(value);
    setAddedValues({ ...addedValues, outputOption: value });
    setActionSelected(undefined);
  };

  const handleFormatSelect = (value: string) => {
    setFormatOption(value);
    setAddedValues({ ...addedValues, formatOption: value });
    setActionSelected(undefined);
  };

  const checkIsMoney = () => {
    const targetObj = findNestedObject(sampleFields, "value", field[field.length - 1]);
    if (targetObj) return targetObj.isMoney;
    else return false;
  };

  const handleShow = () => setShow(true);

  const getFieldsUnderCurrentLoopBlock = () => {
    const targetObj = sampleFields.fields.find((obj) => obj.label === currentLoopField);
    if (targetObj) return targetObj.children;
    else return [];
  };

  return (
    <>
      {!show ? (
        <Container>
          <Button onClick={handleShow} className="btn">
            Insert a print statement
          </Button>
        </Container>
      ) : (
        <Form className="form" id="commentInsertForm">
          <SelectedFieldsTable entries={addedValues} />
          <Container>
            <Button
              onClick={() => setActionSelected(PrintActionTypes.Field)}
            >{`${editMode ? "Update" : "Add"} a field`}</Button>
          </Container>
          {actionSelected === PrintActionTypes.Field && (
            <Container>
              <JsonTreeSelectList
                data={isInLoop ? getFieldsUnderCurrentLoopBlock() : sampleFields.fields}
                updateChecked={handleFieldSelect}
              />
            </Container>
          )}
          {field.length > 0 && (
            <Container>
              <Button onClick={handleFilterButtonClick}>{`${editMode ? "Update" : "Add"} filters`}</Button>
              {addFilter && (
                <Container>
                  {checkIsMoney() && (
                    <Form.Select className="form-select" onChange={(e) => handleFormatSelect(e.target.value)}>
                      <option disabled selected>
                        -- Select a format --
                      </option>
                      {formatOptions.map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  <Form.Select className="form-select" onChange={(e) => handleOutputSelect(e.target.value)}>
                    <option disabled selected>
                      -- Select an output --
                    </option>
                    {outputOptions.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Form.Select>
                </Container>
              )}
            </Container>
          )}
          {addedValues.field && (
            <Container className="form-container">
              <Button className="action-btn" onClick={() => handleInsert(parsePrintText())}>
                {editMode ? "Update" : "Insert"}
              </Button>
              <Button className="action-btn" onClick={() => handleClear()}>
                Clear
              </Button>
            </Container>
          )}
          <Container className="form-container">
            <Button className="action-btn" onClick={handleClose}>
              Close
            </Button>
          </Container>
        </Form>
      )}
    </>
  );
};

export default PrintInsertion;
