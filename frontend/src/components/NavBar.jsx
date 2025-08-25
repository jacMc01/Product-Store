import React from 'react'
import { Container, Flex, Text, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HStack, Button } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'


export const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Container maxW={"1140px"} px={4}>
                <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"} flexDir={{ base: "column", sm: "row" }}>
                
            <Text
                fontSize={{ base: '22', sm: '28' }}
                fontWeight="bold"
                textTransform="uppercase"
                >
                <Link
                    to="/"
                    style={{
                    WebkitBackgroundClip: 'text', // para Safari
                    backgroundClip: 'text',
                    display: 'inline-block',      // asegura que el background-clip funcione bien
                    textDecoration: 'none'
                    }}
                >
                    Product Store
                </Link>
            </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>           
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon/> : <LuSun size={20} />}
                    </Button>
                </HStack>
                </Flex>
            </Container>
        </>
    )
}
