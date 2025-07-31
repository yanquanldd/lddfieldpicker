import * as React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../featureButtons";
import { useState } from "react";
import { loopBlockOptions, sampleFields } from "../../../../assets/constants.js";
import { useSelectedTextStore } from "../../../../store/selectedTextStore";
import { InsertionProps, LoopActionTypes } from "../../../types";
import JsonTreeSelectList from "../../share/JsonTreeSelectList";
import SelectedFieldsTable from "../../share/SelectedFieldsTable";
import { useIsInLoopStore } from "../../../../store/loopInfoStore";

const LoopInsertion: React.FC<InsertionProps> = ({
  insertText,
  replaceText,
  decodedFields,
  editMode = false,
  updateEditType,
}) => {
  const { text } = useSelectedTextStore();
  const { setIsInLoop, setCurrentLoopField } = useIsInLoopStore();

  const [show, setShow] = useState(editMode);
  const [actionSelected, setActionSelected] = useState<LoopActionTypes>(undefined);
  const [loopBlock, setLoopBlock] = useState<string>(editMode ? decodedFields.loopBlock : "");
  const [customField, setCustomField] = useState<string>(editMode ? decodedFields.customField : "");
  const [limit, setLimit] = useState<string>(editMode ? decodedFields.limit : "");
  const [field, setField] = useState<string[]>(editMode ? decodedFields.field : []);
  const [filter, setFilter] = useState<string>(editMode ? decodedFields.filter : "");
  const [filterCustomField, setFilterCustomField] = useState<string>(editMode ? decodedFields.filterCustomField : "");
  const [addFilter, setAddFilter] = useState<boolean>(editMode && decodedFields.filter !== undefined);
  const [addedValues, setAddedValues] = useState<any>({
    loopBlock: loopBlock,
    limit: limit,
    field: field,
    filter: filter,
    customField: customField,
    filterCustomField: filterCustomField,
  });

  const handleInsert = async (value: string) => {
    if (text.length > 0) {
      replaceText(value);
      updateEditType();
    } else {
      insertText(value);
    }
    if (!value.includes("endforeach")) {
      setIsInLoop(true);
      setCurrentLoopField(addedValues.field[0]);
    } else {
      setIsInLoop(false);
      setCurrentLoopField("");
    }
    handleClose();
  };

  const parseLoopText = () => {
    return `{#${addedValues.loopBlock}${addedValues.limit ? `-${addedValues.limit}-` : ""}foreach ${addedValues.field ? addedValues.field.join(".") : addedValues.customField}${addedValues.filter ? `|${addedValues.filter}:${addedValues.filterCustomField}` : ""}}`;
  };

  const handleFieldSelect = (value: string[]) => {
    setField(value);
    setAddedValues({ ...addedValues, field: value });
    setActionSelected(undefined);
  };

  function handleAction(actionType: string, value: string) {
    switch (actionType) {
      case "loopBlock":
        setLoopBlock(value);
        setAddedValues({ ...addedValues, loopBlock: value });
        break;
      case "limit":
        setLimit(value);
        setAddedValues({ ...addedValues, limit: value });
        break;
      case "filter":
        setFilter(value);
        setAddedValues({ ...addedValues, filter: value });
        break;
      case "customField":
        setCustomField(value);
        setAddedValues({ ...addedValues, customField: customField });
        break;
      case "filterCustomField":
        setCustomField(value);
        setAddedValues({ ...addedValues, filterCustomField: filterCustomField });
        setAddFilter(false);
        break;
      default:
        break;
    }
    setActionSelected(undefined);
  }

  const handleClear = () => {
    setLimit("");
    setField([]);
    setLoopBlock("");
    setCustomField("");
    setFilter("");
    setAddedValues({
      loopBlock: "",
      limit: "",
      field: [],
      filter: "",
      customField: "",
      filterCustomField: "",
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
            Insert a loop
          </Button>
        </Container>
      ) : (
        <Form className="form" id="loopInsertForm">
          <SelectedFieldsTable entries={addedValues} />
          <Container>
            <Button onClick={() => setActionSelected(LoopActionTypes.BlockOptions)}>Select block type</Button>
            <Button onClick={() => setActionSelected(LoopActionTypes.Limit)}>Add a limit</Button>
            <Button onClick={() => setActionSelected(LoopActionTypes.Field)}>Add a field</Button>
            <Button onClick={() => setActionSelected(LoopActionTypes.Custom)}>Add a Custom field</Button>
          </Container>
          {actionSelected === LoopActionTypes.BlockOptions && (
            <Container>
              <Form.Select className="form-select" onChange={(e) => handleAction("loopBlock", e.target.value)}>
                <option disabled selected>
                  -- Select a block type --
                </option>
                {loopBlockOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Container>
          )}
          {actionSelected === LoopActionTypes.Limit && (
            <Container>
              <Form.Select className="form-select" onChange={(e) => handleAction("limit", e.target.value)}>
                <option disabled selected>
                  -- Select a limit --
                </option>
                <option>None</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Container>
          )}
          {actionSelected === LoopActionTypes.Field && (
            <Container>
              <JsonTreeSelectList
                data={sampleFields.fields
                  .filter((obj) => obj.children !== undefined)
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  .map(({ ["children"]: _, ...rest }) => rest)}
                updateChecked={handleFieldSelect}
                isLoop={true}
              />
            </Container>
          )}
          {actionSelected === LoopActionTypes.Custom && (
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
          <Container>
            <Button onClick={() => insertText("{#endforeach}")}>End Loop Statement</Button>
          </Container>
          {field.length > 0 && (
            <Container>
              <Button onClick={() => setAddFilter(!addFilter)}>Add a filter?</Button>
              {addFilter && (
                <Container>
                  <Form.Select className="form-select" onChange={(e) => handleAction("filter", e.target.value)}>
                    <option disabled selected>
                      -- Select filter type --
                    </option>
                    {["filter", "orderBy", "limitTo"].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Form.Select>
                  <Row>
                    <Col>
                      <Form.Control
                        className="form-control"
                        value={filterCustomField}
                        onChange={(e) => setFilterCustomField(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Button onClick={() => handleAction("filterCustomField", filterCustomField)}>Confirm</Button>
                    </Col>
                  </Row>
                </Container>
              )}
            </Container>
          )}
          {field.length > 0 && (
            <Container className="form-container">
              <Button className="action-btn" onClick={() => handleInsert(parseLoopText())}>
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

export default LoopInsertion;
