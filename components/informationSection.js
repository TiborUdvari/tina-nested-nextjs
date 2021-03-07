import React from 'react';
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline';
import { InlineWysiwyg } from 'react-tinacms-editor'
import ReactMarkdown from 'react-markdown'

export function InformationSection({content}) {
    return (
        <div className="hero">
          <div className="wrapper wrapper--narrow">
            <h1>
              <InlineTextarea name="title" focusRing={false} />
            </h1>
            <div>
              <InlineWysiwyg name="content" format="markdown" sticky={false} focusRing={true}>
                <ReactMarkdown source={content} />
              </InlineWysiwyg>
            </div>
          </div>
        </div>
      );
}

export const sectionBlock = {
    Component: ({index, data}) => (
        <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
            <InformationSection {...data}/>
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