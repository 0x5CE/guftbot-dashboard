import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const theme = extendTheme({
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />;
        </QueryClientProvider>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
