import React from "react";
import { InlineTextarea, BlocksControls } from "react-tinacms-inline";

export function ImageList() {
  return (
    <h3>
        test
      {/* <InlineTextarea name="title" focusRing={false} /> */}
    </h3>
  );
}

export const imageListBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      test{/* <ImageList {...data} /> */}
    </BlocksControls>
  ),
  template: {
    label: "Image List",
    defaultItem: {
      testTitle: "Image data",
    },
  },
};
