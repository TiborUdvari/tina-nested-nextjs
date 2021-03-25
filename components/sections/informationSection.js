import React from "react";
import { InlineTextarea, BlocksControls } from "react-tinacms-inline";
import { InlineWysiwyg } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";
import {
  Container,
  Heading,
  Stack,
  Flex,
  Box,
  Divider,
} from "@chakra-ui/react";

export function InformationSection({ content }) {
  return (
    <>
      <Divider />
      <Flex pt={5} pb={14}>
        <Heading
          fontWeight={"normal"}
          flex="1 0 33%"
          fontSize="3xl"
          textTransform="uppercase"
        >
          <InlineTextarea name="title" focusRing={false} />
        </Heading>
        <Box flex="1 0 66%" fontSize="xl">
          <InlineWysiwyg
            name="content"
            format="markdown"
            sticky={false}
            focusRing={true}
          >
            <ReactMarkdown source={content} />
          </InlineWysiwyg>
        </Box>
      </Flex>
    </>
  );
}

export const sectionBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <InformationSection {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Information Section",
    defaultItem: {
      title: "Test title",
      content: "Some content",
    },
  },
};
