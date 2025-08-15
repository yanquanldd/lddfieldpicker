import * as React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../featureButtons";
import { useState } from "react";
import { useSelectedTextStore } from "../../../../store/selectedTextStore";
import { CommentActionTypes, InsertionProps } from "../../../types";
import SelectedFieldsTable from "../../share/SelectedFieldsTable";

const CommentInsertion: React.FC<InsertionProps> = ({
  insertText,
  replaceText,
  decodedFields,
  editMode = false,
  updateEditType,
}) => {
  const { text } = useSelectedTextStore();
  const [show, setShow] = useState(editMode);
  const [actionSelected, setActionSelected] = useState<CommentActionTypes | undefined>(undefined);
  const [comment, setComment] = useState<string>(editMode ? decodedFields.comment : "");
  const [addedValues, setAddedValues] = useState<any>({
    comment: comment,
  });

  // Insert the comment code at the selected pointer position
  const handleInsert = async (value: string) => {
    if (text.length > 0) {
      replaceText(value);
      updateEditType();
    } else {
      insertText(value);
    }
    handleClose();
  };

  // Parse the comment text to the comment code format
  const parseCommentText = () => {
    return `{!${addedValues.comment}}`;
  };

  // set comment value
  const handleCommentAdd = () => {
    setComment("");
    setAddedValues({ ...addedValues, comment: comment });
    setActionSelected(undefined);
  };

  // clear comment value
  const handleClear = () => {
    setComment("");
    setAddedValues({
      comment: "",
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
            Insert a comment
          </Button>
        </Container>
      ) : (
        <Form className="form" id="commentInsertForm">
          <SelectedFieldsTable entries={addedValues} />
          <Container>
            {/* <Button onClick={() => setActionSelected(CommentActionTypes.Field)}>Add a field</Button> */}
            <Button
              onClick={() => setActionSelected(CommentActionTypes.Custom)}
            >{`${editMode ? "Edit" : "Add"} a comment`}</Button>
          </Container>
          {/* {actionSelected === CommentActionTypes.Field && (
            <Container>
              <JsonTreeSelectList data={sampleFields.fields} updateChecked={setField} />
            </Container>
          )} */}
          {actionSelected === CommentActionTypes.Custom && (
            <Container>
              <Row>
                <Col>
                  <Form.Control className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} />
                </Col>
                <Col>
                  <Button onClick={() => handleCommentAdd()}>Confirm</Button>
                </Col>
              </Row>
            </Container>
          )}
          {addedValues.comment && (
            <Container className="form-container">
              <Button className="action-btn" onClick={() => handleInsert(parseCommentText())}>
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

export default CommentInsertion;
