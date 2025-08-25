import { Box, VStack, Heading, Text, HStack, IconButton, useToast } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { use } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { useProductStore } from '../store/product.js';

export const ProductCard = ({ product, onOpen, onDelete }) => {
    const bgColor = useColorModeValue('cyan.50', 'gray.700');
    const { deleteProduct} = useProductStore();
    const toast = useToast();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            }); 
        };
    };  

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} display="flex" flexDirection="column" justifyContent="space-between" bgColor={bgColor}>
        <div>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <VStack mt={4} align="start">
            <Heading fontSize="xl" fontWeight="bold">{product.name}</Heading>
            <Text fontSize="lg" color="gray.600">${product.price}</Text>
            </VStack>
        </div>
        <HStack spacing="2" mt="4">
            <IconButton icon={<EditIcon />} onClick={() => onOpen(product)} colorScheme='teal' />
            <IconButton icon={<DeleteIcon />} onClick={(() => handleDeleteProduct(product._id))} colorScheme='red' />
        </HStack>
        </Box>
    );
};