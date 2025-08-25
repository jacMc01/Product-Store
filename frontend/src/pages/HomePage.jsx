import { Container, VStack, Text, Button, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useProductStore } from '../store/product.js'
import { ProductCard } from '../components/ProductCard.jsx';


export const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text fontSize={"4xl"} fontWeight={"bold"} bgGradient={"linear(to-r, gray.900, gray.300)"} bgClip={"text"} textAlign={"center"}>Current products</Text>
        {products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"100%"}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
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
    </Container>
  )
}
