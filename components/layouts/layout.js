import { Container } from "@chakra-ui/react";

export default function Layout({ children }) {
  return <Container maxWidth={"container.xl"} sx={{ bg: "yellow" }}>{children}</Container>;
}
