import React, { useState, useEffect } from "react";
import axios from "axios";
import Inputs from "./components/Inputs";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./components/theme/theme";
import HeaderNav from "./components/header/HeaderNav";
import Hero from "./components/hero/Hero";
import Stats from "./components/statistics/Stats";
import ShortLink from "./components/shortlink/ShortLink";
import Boost from "./components/boost/Boost";
import Footer from "./components/footer/Footer";

function App() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyUrl, setCopyUrl] = useState("Copy");
  const [primaryColor, setPrimaryColor] = useState("hsl(180, 66%, 49%)");
  const [secondaryColor, setSecondaryColor] = useState("white");

  const onchange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(search);
    setSearch("");
  };

  const handleCopyUrl = () => {
    setCopyUrl("Copied!");
  };

  useEffect(() => {
    axios
      .get(`https://api.shrtco.de/v2/shorten?url=${url}`)
      .then((response) => {
        setDatas([response.data]);
        setLoading(false);
        setCopyUrl("Copy");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  return (
    <ChakraProvider theme={theme}>
      <HeaderNav />
      <Hero />
      <Box
        bg="#eff1f7"
        h={{ base: "1200px", sm: "1200px", md: "1200px", lg: "770px" }}
        pos="relative"
      >
        <Inputs
          handleSubmit={handleSubmit}
          onchange={onchange}
          loading={loading}
          setLoading={setLoading}
          search={search}
        />
        <ShortLink
          datas={datas}
          copyUrl={copyUrl}
          handleCopyUrl={handleCopyUrl}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          setPrimaryColor={setPrimaryColor}
          setSecondaryColor={setSecondaryColor}
        />
        <Stats />
      </Box>
      <Boost />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
