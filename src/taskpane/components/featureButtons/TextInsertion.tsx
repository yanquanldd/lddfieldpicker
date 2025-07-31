import * as React from "react";
import { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

/* global HTMLTextAreaElement */

interface TextInsertionProps {
  insertText: (text: string) => void;
}

const TextInsertion: React.FC<TextInsertionProps> = (props: TextInsertionProps) => {
  const [text, setText] = useState<string>("Some text.");

  const handleTextInsertion = async () => {
    await props.insertText(text);
  };

  const handleTextChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <InputGroup>
        <FormControl placeholder="Enter text" aria-label="Enter text" value={text} onChange={handleTextChange} />
        <Button variant="primary" onClick={handleTextInsertion}>
          Insert
        </Button>
      </InputGroup>
    </div>
  );
};

export default TextInsertion;
