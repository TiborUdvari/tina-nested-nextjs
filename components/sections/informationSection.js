import React from "react";
import { InlineTextarea, BlocksControls } from "react-tinacms-inline";
import { InlineWysiwyg, InlineBlocks, InlineForm } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { imageListBlock } from "../blocks/imageList";
import { titleBlock } from "../blocks/title";

import {
  Container,
  Heading,
  Stack,
  Flex,
  Box,
  Divider,
  Text,
} from "@chakra-ui/react";

function InformationSection({ index, data }) {
  // we have
  const renderers = {
    image: ({ src, alt, ...props }) => {
      return (
        <Box pb={14}>
          <Image
            layout="responsive"
            width={878}
            height={662}
            src={src}
            alt={alt}
          />
          <Text fontSize="xs" textTransform="uppercase" color="gray.500">
            {alt}
          </Text>
        </Box>
      );
    },
  };

  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
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
            <ReactMarkdown source={data.content} renderers={renderers} />
          </InlineWysiwyg>
          <Box>
            <InlineBlocks name="sectionBlocks" blocks={SECTION_BLOCKS} />
          </Box>
        </Box>
      </Flex>
    </BlocksControls>
  );
}

const SECTION_BLOCKS = {
  title: titleBlock
};

export const sectionBlock = {
  Component: InformationSection,
  template: {
    label: "Information Section",
    defaultItem: {
      _template: "section",
      title: "Test title",
      content: "Some content",
      sectionBlocks: [
        {
          _template: "title",
          title: "Hello there Title",
        },
      ],
    },
    fields: [],
  },
};
