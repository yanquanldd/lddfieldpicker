import * as React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../featureButtons";
import { useState } from "react";
import { sampleFields, basicOperators } from "../../../../assets/constants.js";
import { useSelectedTextStore } from "../../../../store/selectedTextStore";
import { ConditionActionTypes, ConditionTypes, InsertionProps } from "../../../types";
import JsonTreeSelectList from "../../share/JsonTreeSelectList";
import SelectedFieldsTable from "../../share/SelectedFieldsTable";

const ConditionInsertion: React.FC<InsertionProps> = ({
  replaceText,
  insertText,
  decodedFields,
  editMode = false,
  updateEditType,
}) => {
  const { text } = useSelectedTextStore();

  const [show, setShow] = useState(editMode);
  const [actionSelected, setActionSelected] = useState<ConditionActionTypes>(undefined);
  const [condition, setCondition] = useState<string>(editMode ? decodedFields.condition : "");
  const [field, setField] = useState<string[]>(editMode ? decodedFields.field : []);
  const [operator, setOperator] = useState<string>(editMode ? decodedFields.operator : "");
  const [customField, setCustomField] = useState<string>(editMode ? decodedFields.customField : "");
  const [addedValues, setAddedValues] = useState<any>({
    condition: condition,
    field: field,
    operator: operator,
    customField: customField,
  });

  // Insert the condition code at the selected pointer position
  const handleInsert = async (value: string) => {
    if (text.length > 0) {
      replaceText(value);
      updateEditType();
    } else {
      insertText(value);
    }
    handleClose();
  };

  // Parse the condition text to the condition code format
  const parseConditionText = () => {
    return `{#${addedValues.condition} ${addedValues.field.join(".")}${addedValues.operator}${addedValues.customField}}`;
  };

  // set field value
  const handleFieldSelect = (value: string[]) => {
    setField(value);
    setAddedValues({ ...addedValues, field: value });
    setActionSelected(undefined);
  };

  // set the value of the condition, operator, or custom field
  function handleAction(actionType: string, value: string) {
    switch (actionType) {
      case "condition":
        setCondition(value);
        setAddedValues({ ...addedValues, condition: value });
        break;
      case "operator":
        setOperator(value);
        setAddedValues({ ...addedValues, operator: value });
        break;
      case "customField":
        setCustomField("");
        setAddedValues({ ...addedValues, customField: customField });
        break;
      default:
        break;
    }
    setActionSelected(undefined);
  }

  // clear added values
  const handleClear = () => {
    setField([]);
    setOperator("");
    setCustomField("");
    setActionSelected(undefined);
    setAddedValues({
      condition: "",
      field: [],
      operator: "",
      customField: "",
    });
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
            Insert a condition
          </Button>
        </Container>
      ) : (
        <Form className="form" id="conditionInsertForm">
          <SelectedFieldsTable entries={addedValues} />
          <Container>
            <Button
              onClick={() => setActionSelected(ConditionActionTypes.Condition)}
            >{`${editMode ? "Edit" : "Add"} a condition`}</Button>
            {addedValues.condition.length > 0 && (
              <Button
                onClick={() => setActionSelected(ConditionActionTypes.Field)}
              >{`${editMode ? "Edit" : "Add"} a field`}</Button>
            )}
            {addedValues.field.length > 0 && (
              <Button
                onClick={() => setActionSelected(ConditionActionTypes.Operator)}
              >{`${editMode ? "Edit" : "Add"} an operator`}</Button>
            )}
            {addedValues.operator.length > 0 && (
              <Button
                onClick={() => setActionSelected(ConditionActionTypes.Custom)}
              >{`${editMode ? "Edit" : "Add"} a custom field`}</Button>
            )}
          </Container>
          {actionSelected === ConditionActionTypes.Condition && (
            <Container>
              <Form.Select
                className="form-select"
                onChange={(e) => {
                  handleAction("condition", e.target.value);
                }}
              >
                <option disabled selected>
                  -- Select a condition --
                </option>
                {Object.values(ConditionTypes).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </Container>
          )}
          {actionSelected === ConditionActionTypes.Operator && (
            <Container>
              <Form.Select
                className="form-select"
                onChange={(e) => {
                  handleAction("operator", e.target.value);
                }}
              >
                <option disabled selected>
                  -- Select a operator --
                </option>
                {basicOperators.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Form.Select>
            </Container>
          )}
          {actionSelected === ConditionActionTypes.Field && (
            <Container>
              <JsonTreeSelectList data={sampleFields.fields} updateChecked={handleFieldSelect} />
            </Container>
          )}
          {actionSelected === ConditionActionTypes.Custom && (
            <Container>
              <Row>
                <Col>
                  <Form.Control
                    className="form-control"
                    value={customField}
                    onChange={(e) => setCustomField(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button onClick={() => handleAction("customField", customField)}>Confirm</Button>
                </Col>
              </Row>
            </Container>
          )}
          {condition.length > 0 && (
            <Container className="form-container">
              <Button className="action-btn" onClick={() => handleInsert(parseConditionText())}>
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

export default ConditionInsertion;
