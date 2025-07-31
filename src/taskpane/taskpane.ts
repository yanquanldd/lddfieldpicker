import { findLastIndex } from "./Helpers";

/* eslint-disable no-undef */
export async function insertText(text: string) {
  // Write text to the document.
  try {
    await Word.run(async (context) => {
      const doc = context.document;
      const originalRange = doc.getSelection();
      originalRange.insertText(text, Word.InsertLocation.end);
      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

export async function replaceText(text: string) {
  // Write text to the document.
  try {
    await Word.run(async (context) => {
      const doc = context.document;
      const originalRange = doc.getSelection();
      originalRange.insertText(text, Word.InsertLocation.replace);
      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

export async function detectCursorText(update) {
  try {
    await Word.run(async (context) => {
      const currRange = context.document.getSelection();

      const endRange = context.document
        .getSelection()
        .expandTo(context.document.body.getRange("End"))
        .search("}")
        .getFirst();

      const startRangeLists = context.document
        .getSelection()
        .expandTo(context.document.body.getRange("Start"))
        .split(["}"]);

      context.load(endRange);
      context.load(startRangeLists);
      await context.sync();
      const startRangeItems = startRangeLists.items;
      const startRange = startRangeItems[startRangeItems.length-1].search("{").getFirstOrNullObject();

      context.load(startRange);
      await context.sync();

      const preRange = startRange.expandToOrNullObject(currRange);
      const postRange = currRange.expandToOrNullObject(endRange);

      context.load(preRange);
      context.load(postRange);

      await context.sync();
      const targetText = preRange.text + postRange.text;
      update((targetText).slice(1, targetText.length-1));

      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
    update('');
  }
}

export async function deleteCursorText() {
  try {
    await Word.run(async (context) => {
      const currRange = context.document.getSelection();

      const endRange = context.document
        .getSelection()
        .expandTo(context.document.body.getRange("End"))
        .search("}")
        .getFirst();

        const startRangeLists = context.document
        .getSelection()
        .expandTo(context.document.body.getRange("Start"))
        .split(["}"]);

      context.load(endRange);
      context.load(startRangeLists);
      await context.sync();
      const startRangeItems = startRangeLists.items;
      const startRange = startRangeItems[startRangeItems.length-1].search("{").getFirstOrNullObject();

      context.load(startRange);
      await context.sync();

      const preRange = startRange.expandToOrNullObject(currRange);
      const postRange = currRange.expandToOrNullObject(endRange);

      context.load(preRange);
      context.load(postRange);

      await context.sync();

      preRange.delete();
      postRange.delete();

      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

export async function updateCursorText(text: string) {
  try {
    await Word.run(async (context) => {
      const currRange = context.document.getSelection();

      const endRange = context.document
        .getSelection()
        .expandTo(context.document.body.getRange("End"))
        .search("}")
        .getFirst();

        const startRangeLists = context.document
        .getSelection()
        .expandTo(context.document.body.getRange("Start"))
        .split(["}"]);

      context.load(endRange);
      context.load(startRangeLists);
      await context.sync();
      const startRangeItems = startRangeLists.items;
      const startRange = startRangeItems[startRangeItems.length-1].search("{").getFirstOrNullObject();

      context.load(startRange);
      await context.sync();

      const preRange = startRange.expandToOrNullObject(currRange);
      const postRange = currRange.expandToOrNullObject(endRange);

      context.load(preRange);
      context.load(postRange);

      await context.sync();

      const replaceRange = preRange.expandTo(postRange);
      context.load(replaceRange);
      replaceRange.insertText(text, Word.InsertLocation.replace);

      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
