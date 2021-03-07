import React from 'react';
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline';

export function InformationSection() {
    return (
        <div className="hero">
          <div className="wrapper wrapper--narrow">
            <h1>
              <InlineTextarea name="title" focusRing={false} />
            </h1>
            <div>
              <InlineTextarea name="content" focusRing={false} />
            </div>
          </div>
        </div>
      );
}

export const sectionBlock = {
    Component: ({index, data}) => (
        <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
            <InformationSection />
        </BlocksControls>
    ),
    template: {
        label: 'Information Section',
        defaultItem: {
            title: 'Test title',
            content: 'Some content'
        }
    }
}