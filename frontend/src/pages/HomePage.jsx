import { Container, VStack, Text, Button, SimpleGrid, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { useProductStore } from '../store/product.js'
import { ProductCard } from '../components/ProductCard.jsx';


export const HomePage = () => {
  const { fetchProducts, products, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toast = useToast();

  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleUpdate = async () => {
    const updatedProduct = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value
    }
    const {success, message} = await updateProduct(selectedProduct._id, updatedProduct);
    if (success) {
      toast({ title: "Success", description: message, status: "success", duration: 2000, isClosable: true });
    } else {
      toast({ title: "Error", description: message, status: "error", duration: 2000, isClosable: true });
    }
    onClose();
  }

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text fontSize={"4xl"} fontWeight={"bold"} bgGradient={"linear(to-r, gray.900, gray.300)"} bgClip={"text"} textAlign={"center"}>Current products</Text>
        {products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"100%"}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onOpen={handleOpen} />
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
            No products available. Please create a new product.
            <Link to={"/create"}>
              <Button ml={2} colorScheme={"teal"} size={"md"}>Create Product</Button>
            </Link>
          </Text>
        )}
      </VStack>

      {selectedProduct && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input ref={nameRef} defaultValue={selectedProduct.name} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input ref={priceRef} defaultValue={selectedProduct.price} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input ref={imageRef} defaultValue={selectedProduct.image} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}
