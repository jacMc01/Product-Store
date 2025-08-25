import React, { use } from 'react'
import { Box, Button, Container, Heading, Input, VStack, useColorModeValue } from '@chakra-ui/react'



export const CreatePage = () => {
    const [newProduct, setNewProduct] = React.useState({
        name: '',
        price: '',
        image: '',
    });

    const handleCreateProduct = () => {
        // Logic to handle product creation
        console.log('Creating product:', newProduct);
    }

    return (
        <>
            <Container maxW={"container.sm"}>
                <VStack spacing={4}>
                    <Heading as={"h1"} size={"2xl"} mb={8} textAlign={"center"}>
                        Create New Product
                    </Heading>
                    <Box w={"100%"} bg={useColorModeValue("white", "gray.700")} p={6} borderRadius={"md"} boxShadow={"md"}>
                        <VStack spacing={4} align={"stretch"}>
                            <Input placeholder="Product Name" name="name" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
                            <Input placeholder="Price" name="price" value={newProduct.price} type="number" onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}/>
                            <Input placeholder="Image URL" name="image" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}/>
                            <Button colorScheme={"teal"} onClick={handleCreateProduct}>Create Product</Button>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </>
    )
}
