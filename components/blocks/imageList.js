import React from "react";
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline';

function ImageList({index}) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <InlineTextarea name="testTitle" focusRing={false} />
    </BlocksControls>
  );
}

export const imageListBlock = {
  component: ImageList,
  template: {
    label: 'Image List',
    defaultItem: {
      _template: 'childComponent',
      testTitle: 'Image data',
    },
    fields: [],
  },
};
