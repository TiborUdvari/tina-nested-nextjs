import React from "react";
import { useForm, usePlugin, useCMS } from "tinacms";
import { GetStaticProps } from "next";
import Layout from "../components/layouts/layout";

import { InlineForm, InlineBlocks } from "react-tinacms-inline";
import { sectionBlock } from "../components/sections/informationSection";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";

//import data from "../content/aboutData.json";
import { Container, Heading } from "@chakra-ui/react";

import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from "react-tinacms-github";

function AboutPage({ file, Component, pageProps }) {
  const formOptions = {
    label: "About Page",
    id: "./data/data.json",
    // initialValues: data,
  };

  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);
  useGithubToolbarPlugins();

  return (
    <Layout>
      <Heading as="h1" size="3xl">About</Heading>
      <div className="home">
        <InlineForm form={form}>
          <InlineBlocks name="blocks" blocks={ABOUT_BLOCKS} />
        </InlineForm>
      </div>
    </Layout>
  );
}

export default AboutPage;

const ABOUT_BLOCKS = {
  section: sectionBlock,
};

export const getStaticProps = async function ({ preview, previewData }) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/aboutData.json",
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/aboutData.json",
        data: (await import("../content/aboutData.json")).default,
      },
    },
  };
};
