/* eslint-disable no-undef */
import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import { insertText, detectCursorText, deleteCursorText, updateCursorText } from "../taskpane";
import ConditionInsertion from "./featureButtons/condition/ConditionInsertion";
import LoopInsertion from "./featureButtons/loop/LoopInsertion";
import WelcomePage from "./welcomePage/WelcomePage";
import SelectedField from "./featureButtons/selectedField/SelectedField";
import CommentInsertion from "./featureButtons/comment/CommentInsertion";
import PrintInsertion from "./featureButtons/print/PrintInsertion";
import { useSelectedTextStore } from "../../store/selectedTextStore";
import { CodeType } from "../types";
import { useEffect, useState } from "react";
import {
  getCodeType,
  readComment,
  readCondition,
  readIncludeStatement,
  readLoopStatement,
  readPrintStatement,
} from "../Helpers";
import { sampleFields, formatOptions } from "../../assets/constants.js";
import IncludeInsertion from "./featureButtons/include/IncludeInsertion";
import { Alert } from "react-bootstrap";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "block",
    padding: "30px",
  },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();
  const { text, setText } = useSelectedTextStore();
  const [editCodeType, setEditCodeType] = useState<CodeType>(CodeType.NONE);
  const [modifyCode, setModifyCode] = useState<boolean>(true);
  const [showNotCodeError, setShowNotCodeError] = useState(false);

  const handleModifyCodeClick = () => {
    detectCursorText(setText);
  };

  const handleTextUpdate = (text: string) => {
    updateCursorText(text);
    setModifyCode(true);
    setText("");
  };

  const getDecodedInfo = (codeText: string | undefined) => {
    const codeType = getCodeType(codeText);
    let decodedInfo = undefined;
    if (codeType === CodeType.PRINT) {
      decodedInfo = readPrintStatement(codeText.slice(1), sampleFields, formatOptions);
    } else if (codeType === CodeType.COMMENT) {
      decodedInfo = readComment(codeText.slice(1), sampleFields);
    } else if (codeType === CodeType.CONDITION) {
      decodedInfo = readCondition(codeText.slice(1), sampleFields);
    } else if (codeType === CodeType.Include) {
      decodedInfo = readIncludeStatement(codeText.slice(1));
    } else if (codeType === CodeType.LOOP) {
      decodedInfo = readLoopStatement(codeText.slice(1), sampleFields);
    }
    return decodedInfo;
  };

  const renderEditSection = (decodedInfo: any) => {
    if (!decodedInfo) return <div></div>;
    switch (editCodeType) {
      case CodeType.COMMENT:
        return (
          <CommentInsertion
            insertText={insertText}
            replaceText={handleTextUpdate}
            decodedFields={decodedInfo}
            updateEditType={resetEditType}
            editMode
          />
        );
      case CodeType.PRINT:
        return (
          <PrintInsertion
            insertText={insertText}
            replaceText={handleTextUpdate}
            decodedFields={decodedInfo}
            updateEditType={resetEditType}
            editMode
          />
        );
      case CodeType.CONDITION:
        return (
          <ConditionInsertion
            insertText={insertText}
            replaceText={handleTextUpdate}
            decodedFields={decodedInfo}
            updateEditType={resetEditType}
            editMode
          />
        );
      case CodeType.LOOP:
        return (
          <LoopInsertion
            insertText={insertText}
            replaceText={handleTextUpdate}
            decodedFields={decodedInfo}
            updateEditType={resetEditType}
            editMode
          />
        );
      case CodeType.Include:
        return (
          <IncludeInsertion
            insertText={insertText}
            replaceText={handleTextUpdate}
            decodedFields={decodedInfo}
            updateEditType={resetEditType}
            editMode
          />
        );
      default:
        return <div></div>;
    }
  };

  const resetEditType = () => {
    setEditCodeType(CodeType.NONE);
  };

  const handleDeleteField = () => {
    deleteCursorText();
    setText("");
    resetEditType();
  };

  useEffect(() => {
    if (text.length !== 0 && !["!", "#", "%"].includes(text[0])) {
      setShowNotCodeError(true);
    } else if (text.length !== 0 && ["!", "#", "%"].includes(text[0])) {
      setShowNotCodeError(false);
      setModifyCode(false);
    } else {
      setModifyCode(true);
    }
  }, [text]);

  return (
    <div className={styles.root}>
      <WelcomePage />
      {text.length === 0 || !getDecodedInfo(text) ? (
        <div>
          <CommentInsertion insertText={insertText} />
          <ConditionInsertion insertText={insertText} />
          <LoopInsertion insertText={insertText} />
          <PrintInsertion insertText={insertText} />
          <IncludeInsertion insertText={insertText} />
        </div>
      ) : (
        <div>
          <SelectedField info={getDecodedInfo(text)} />
          <button onClick={() => setEditCodeType(getCodeType(text))}>edit</button>
          <button onClick={handleDeleteField}>delete</button>
          <button onClick={() => setText("")}>back</button>
        </div>
      )}
      {renderEditSection(getDecodedInfo(text))}
      {modifyCode && <button onClick={() => handleModifyCodeClick()}>Modify code</button>}
      {showNotCodeError && (
        <Alert variant="danger" onClose={() => setShowNotCodeError(false)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>Please select a code</p>
        </Alert>
      )}
    </div>
  );
};

export default App;
