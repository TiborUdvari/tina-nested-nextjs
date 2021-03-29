import React from "react";
import { InlineTextarea, BlocksControls } from "react-tinacms-inline";

function Title() {
  return <InlineTextarea name="title" focusRing={false} />
}

export const titleBlock = {
  component: ({ index, data }) => (
    <BlocksControls index={index}>
      <Title {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Title",
    defaultItem: {
      title: "The title",
    },
    fields: [],
  },
};
