import React from "react";
import { InlineTextarea, BlocksControls } from "react-tinacms-inline";
import { InlineWysiwyg, InlineBlocks, InlineForm } from "react-tinacms-editor";

export function Subtitle() {
  return (
    <h2>
      <InlineTextarea name="subtitle" focusRing={false} />
    </h2>
  );
}

export const subtitleBlock = {
  component: ({ index, data }) => (
    <BlocksControls index={index}>
      <Subtitle {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Subtitle",
    defaultItem: {
      subtitle: "The subtitle",
    },
    fields: [],
  },
};
