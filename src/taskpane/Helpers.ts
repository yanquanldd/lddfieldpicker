import { CodeType } from "./types";
import { basicOperators, loopBlockOptions } from "../assets/constants.js";

export function areBracketsBalanced(str: string): boolean {
  const stack: string[] = [];
  const bracketMap: { [key: string]: string } = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (const char of str) {
    if (Object.keys(bracketMap).includes(char)) {
      // If the character is an opening bracket, push it onto the stack
      stack.push(char);
    } else if (Object.values(bracketMap).includes(char)) {
      // If the character is a closing bracket, check if it matches the top of the stack
      const lastBracket = stack.pop();
      if (bracketMap[lastBracket || ""] !== char) {
        return false;
      }
    }
  }

  // If the stack is empty, all brackets are balanced
  return stack.length === 0;
}

// Check if the condition is valid
export function isValidCondition(statement: string): boolean {
  const trimmedStatement = statement.trim();
  const regexIf = /^\s*if\s*\(.*?\)\s*(\{[^}]*\}|[^;]+);\s*$/;
  const regexIfElse = /^\s*if\s*\(.*?\)\s*[^;]+\s*else\s*[^;]+;\s*$/;
  const regexIfElseIf = /^(\s*if\s*\(.*?\)\s*[^;]+\s*(else\s*if\s*\(.*?\)\s*[^;]+)*\s*else\s*[^;]+;\s*)+$/;

  const validIf = regexIf.test(trimmedStatement);
  const validIfElse = regexIfElse.test(trimmedStatement);
  const validIfElseIf = regexIfElseIf.test(trimmedStatement);

  return validIf || validIfElse || validIfElseIf;
}

// Check if the loop statement is valid
export const isValidLoopStatement = (statement: string) => {
  const trimmedStatement = statement.trim();

  const forRegex = /^\s*for\s*\(\s*[^;]*;\s*[^;]*;\s*[^)]*\)\s*(\{[^}]*\}|[^;]+);\s*$/;
  const whileRegex = /^\s*while\s*\(.*?\)\s*(\{[^}]*\}|[^;]+);\s*$/;
  const doWhileRegex = /^\s*do\s*(\{[^}]*\}|[^;]+)\s*while\s*\(.*?\)\s*;\s*$/;

  const validFor = forRegex.test(trimmedStatement);
  const validWhile = whileRegex.test(trimmedStatement);
  const validDoWhile = doWhileRegex.test(trimmedStatement);

  return validFor || validWhile || validDoWhile;
};

// Convert selected code back to original label
export const convertCodeToText = (codeList: string[], sourceList: any[], result: any[]) => {
  for (const code of codeList) {
    const matchObj = findNestedObject(sourceList, "value", code);
    if (matchObj) {
      result.push(matchObj.label);
    } else {
      result.push(code);
    }
  }
  return result;
};

// Find the nested object by provided value
export function findNestedObject(obj: any, key: string, value: any): any {
  // Check if the current object has the key and if it matches the value
  if (obj[key] === value) {
    return obj;
  }

  // Iterate through the object's keys
  for (const k in obj) {
    // If the value is an object, search it recursively
    if (typeof obj[k] === "object" && obj[k] !== null) {
      const found = findNestedObject(obj[k], key, value);
      if (found) {
        return found; // Return the found object
      }
    }
  }

  return null; // Return null if not found
}

export function findLastIndex(str: string, chars: string[]): number {
  let lastIndex = -1;

  chars.forEach((char) => {
    const index = str.lastIndexOf(char);
    if (index > lastIndex) {
      lastIndex = index;
    }
  });

  return lastIndex;
}

// get the type of the code based on the first character
export const getCodeType = (str: string | undefined) => {
  if (!str) return CodeType.NONE;
  switch (str[0]) {
    case "!":
      return CodeType.COMMENT;
    case "#":
      if (["if", "else", "elseif", "endif"].some((condition) => str.includes(condition))) {
        return CodeType.CONDITION;
      } else if (str.includes("include")) {
        return CodeType.Include;
      } else {
        return CodeType.LOOP;
      }
    case "%":
      return CodeType.PRINT;
    default:
      return CodeType.NONE;
  }
};

// parse each code to original value by traversing the source list
function parseEachCode(codeList: string[], sourceList: any) {
  const fieldResult = [];
  const customResult = [];
  for (const value of codeList) {
    const matchObj = findNestedObject(sourceList, "value", value);
    if (matchObj) {
      fieldResult.push(matchObj.label);
    } else {
      customResult.push(value);
    }
  }

  return { field: fieldResult, custom: customResult };
}

// decode the comment code to readable value
export function readComment(text: string | undefined, sourceList: any) {
  const valueList = text.split(" ");
  const result = parseEachCode(valueList, sourceList);
  return { comment: result.custom.join(" ") };
}

// decode the condition code to readable value
export function readCondition(text: string | undefined, sourceList: any) {
  const valueList = text.split(" ");
  const result = parseEachCode(valueList, sourceList);
  const decodedInfo = {
    condition: "",
    operator: "",
    field: valueList
      .find((item) => item.includes("."))
      .split(".")
      .map((field) => findNestedObject(sourceList, "value", field).label),
    customField: "",
  };
  result.custom.filter((item) => {
    if (["if", "else if", "else", "endif"].includes(item)) {
      decodedInfo.condition = item;
    } else if (basicOperators.includes(item)) {
      decodedInfo.operator = item;
    } else {
      decodedInfo.customField = item;
    }
  });

  return decodedInfo;
}

// decode the print code to readable value
export function readPrintStatement(text: string | undefined, sourceList: any, formatOptions: string[]) {
  let fieldsLabelList = [];
  let format;
  let output;
  if (text && !text.includes("|")) {
    const fieldsValueList = text.split(".");
    fieldsLabelList = fieldsValueList.map((field) => findNestedObject(sourceList, "value", field).label);
  } else if (text && text.includes("|")) {
    fieldsLabelList = text
      .split("|")[0]
      .split(".")
      .map((field) => findNestedObject(sourceList, "value", field).label);
    const filterList = text.slice(text.indexOf("|") + 1).split("|");

    if (filterList.length === 1) {
      formatOptions.includes(filterList[0]) ? (format = filterList[0]) : (output = filterList[0]);
    } else {
      format = filterList[0];
      output = filterList[1];
    }
  }
  return {
    field: fieldsLabelList,
    formatOption: format,
    outputOption: output,
  };
}

// decode the loop code to readable value
export function readLoopStatement(text: string | undefined, sourceList: any) {
  const decodedInfo = {
    loopBlock: "",
    limit: "",
    field: [],
    filter: "",
    customField: "",
    filterCustomField: "",
  };

  const parseLoopWithoutFilter = (str: string) => {
    const fieldPart = str.split(" ")[1];
    const fieldInfo = fieldPart.includes(".")
      ? parseEachCode(str.split(" ")[1].split("."), sourceList).field
      : [fieldPart];
    const loopInfo = str.split(" ")[0].split("-");
    loopInfo.filter((item) => {
      if (loopBlockOptions.includes(item)) {
        decodedInfo.loopBlock = item;
      } else if (!isNaN(parseFloat(item))) {
        decodedInfo.limit = item;
      } else if (!["-", "foreach"].includes(item)) {
        decodedInfo.customField = item;
      }
    });
    decodedInfo.field = fieldInfo;
  };
  if (text.includes("endforeach")) {
    decodedInfo.customField = "endforeach";
  } else if (!text.includes("|")) {
    parseLoopWithoutFilter(text);
  } else {
    const loopStr = text.slice(0, text.indexOf("|"));
    const filterPart = text.slice(text.indexOf("|") + 1);
    parseLoopWithoutFilter(loopStr);
    decodedInfo.filter = filterPart.slice(0, filterPart.indexOf(":"));
    decodedInfo.filterCustomField = filterPart.slice(filterPart.indexOf(":") + 1);
  }

  return decodedInfo;
}

// decode the include code to readable value
export function readIncludeStatement(text: string | undefined) {
  let fileName;
  if (!text.includes("params")) {
    fileName = text.split(" ")[text.split(" ").length - 1];
    return {
      fileName: fileName,
      params: [],
    };
  } else {
    const paramList = text.split(" params ").slice(1);
    fileName = text.split("params")[0].split(" ")[1];
    return {
      fileName: fileName,
      params: paramList,
    };
  }
}
