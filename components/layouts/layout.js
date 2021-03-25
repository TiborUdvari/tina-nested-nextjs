import { Container } from "@chakra-ui/react";

export default function Layout({ children }) {
  return <Container maxWidth={"container.lg"}>{children}</Container>;
}
