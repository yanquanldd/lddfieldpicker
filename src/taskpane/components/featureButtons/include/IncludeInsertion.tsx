import * as React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../featureButtons";
import { useState } from "react";
import { useSelectedTextStore } from "../../../../store/selectedTextStore";
import { InsertionProps } from "../../../types";
import SelectedFieldsTable from "../../share/SelectedFieldsTable";

export enum IncludeActionTypes {
  FileName = "fileName",
  Param = "param",
}

const IncludeInsertion: React.FC<InsertionProps> = ({
  insertText,
  replaceText,
  decodedFields,
  editMode = false,
  updateEditType,
}) => {
  const { text } = useSelectedTextStore();
  const [show, setShow] = useState(editMode);
  const [actionSelected, setActionSelected] = useState<IncludeActionTypes | undefined>(undefined);
  const [param, setParam] = useState<string | undefined>(undefined);
  const [params, setParams] = useState<string[]>(editMode ? decodedFields.params : []);
  const [fileName, setFileName] = useState<string>(editMode ? decodedFields.fileName : "");
  const [addedValues, setAddedValues] = useState<any>({
    fileName: fileName,
    params: params,
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

  const parseIncludeText = () => {
    return `{#include ${addedValues.fileName}${addedValues.params.length > 0 ? ` params ${addedValues.params.join(" params ")}` : ""}}`;
  };

  const handleValueAdd = (valueType: string) => {
    if (valueType === "fileName") {
      setAddedValues({ ...addedValues, fileName: fileName });
      setFileName("");
    } else {
      setParams([...params, param]);
      setAddedValues({ ...addedValues, params: [...params, param] });
      setParam("");
    }
    setActionSelected(undefined);
  };

  const handleClear = () => {
    setParams([]);
    setFileName("");
    setAddedValues({
      fileName: "",
      params: [],
    });
    setActionSelected(undefined);
  };

  const handleClose = () => {
    handleClear();
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      {!show ? (
        <Container>
          <Button onClick={handleShow} className="btn">
            Insert an include statement
          </Button>
        </Container>
      ) : (
        <Form className="form" id="includeInsertForm">
          <SelectedFieldsTable entries={addedValues} />
          <Container>
            <Button
              onClick={() => setActionSelected(IncludeActionTypes.FileName)}
            >{`${editMode ? "Edit" : "Add"} a filename`}</Button>
            {addedValues.fileName && (
              <Button onClick={() => setActionSelected(IncludeActionTypes.Param)}>Add a param</Button>
            )}
          </Container>
          {actionSelected === IncludeActionTypes.FileName && (
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    className="form-control"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button onClick={() => handleValueAdd("fileName")}>Confirm</Button>
                </Col>
              </Row>
            </Container>
          )}
          {actionSelected === IncludeActionTypes.Param && (
            <Container>
              <Row>
                <Col>
                  <Form.Control className="form-control" value={param} onChange={(e) => setParam(e.target.value)} />
                </Col>
                <Col>
                  <Button onClick={() => handleValueAdd("param")}>Confirm</Button>
                </Col>
              </Row>
            </Container>
          )}
          {addedValues.fileName && (
            <Container className="form-container">
              <Button className="action-btn" onClick={() => handleInsert(parseIncludeText())}>
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

export default IncludeInsertion;
