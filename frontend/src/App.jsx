import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { CreatePage } from "./pages/CreatePage"
import { NavBar } from "./components/NavBar"

//bgGradient={"linear(to-b, teal.50, blue.50)"} _dark={{ bgGradient: "linear(to-b, gray.800, gray.900)" }}

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("teal.50", "gray.900")}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
