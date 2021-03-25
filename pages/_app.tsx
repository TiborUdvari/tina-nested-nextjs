import App from "next/app";
import { TinaCMS, TinaProvider } from "tinacms";
import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import {
  GithubClient,
  TinacmsGithubProvider,
  GithubMediaStore,
} from "react-tinacms-github";

import { NextGithubMediaStore } from 'next-tinacms-github'

export default class Site extends App {
  cms: TinaCMS;
  theme: {};

  constructor(props) {
    super(props);

    const github = new GithubClient({
      proxy: "/api/proxy-github",
      authCallbackRoute: "/api/create-github-access-token",
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      baseBranch: process.env.BASE_BRANCH, // e.g. 'master' or 'main' on newer repos
      authScope: "repo", // normally defaults to 'public_repo'
    });
    
    const mediaStore = new NextGithubMediaStore(github)
    /**
     * 1. Create the TinaCMS instance
     */
    this.cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github,
      },
      /**
       * 3. Register the Media Store
       */
      media: mediaStore,
      /**
       * 4. Use the Sidebar and Toolbar
       */
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview,
      plugins: [MarkdownFieldPlugin],
    });

    this.theme = extendTheme({
      styles: { 
        global: { 
            html: { 
                fontSize: "16px"
            }
         }
      },
      fonts: {
        heading: "Riforma LL",
        body: "Riforma LL",
      },
      sizes: {
        container: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      }
    })
  }


  render() {
    const { Component, pageProps } = this.props;
    return (
      /**
       * 5. Wrap the page Component with the Tina and Github providers
       */
      <ChakraProvider theme={this.theme}>
        <TinaProvider cms={this.cms}>
          <TinacmsGithubProvider
            onLogin={onLogin}
            onLogout={onLogout}
            error={pageProps.error}
          >
            {/**
             * 6. Add a button for entering Preview/Edit Mode
             */}
            <EditLink cms={this.cms} />
            <Component {...pageProps} />
          </TinacmsGithubProvider>
        </TinaProvider>
      </ChakraProvider>
    );
  }
}

const onLogin = async () => {
  const token = localStorage.getItem("tinacms-github-token") || null;
  const headers = new Headers();

  if (token) {
    headers.append("Authorization", "Bearer " + token);
  }

  const resp = await fetch(`/api/preview`, { headers: headers });
  const data = await resp.json();

  if (resp.status == 200) window.location.href = window.location.pathname;
  else throw new Error(data.message);
};

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

export interface EditLinkProps {
  cms: TinaCMS;
}

export const EditLink = ({ cms }: EditLinkProps) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? "Exit Edit Mode" : "Edit This Site"}
    </button>
  );
};
