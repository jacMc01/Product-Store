import { useState } from 'react';
import { Box, VStack, Heading, Text, HStack, IconButton, useToast, useColorModeValue, Modal, useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button, ModalFooter } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product.js';

export const ProductCard = ({ product, onOpen, onDelete }) => {
    const bgColor = useColorModeValue('cyan.50', 'gray.700');
    const { deleteProduct} = useProductStore();
    const toast = useToast();
    const {isOpen, onOpen: onOpenModal, onClose} = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState({});

    const handleDeleteProduct = async (pid) => {
        onClose();
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
            <IconButton icon={<DeleteIcon />} onClick={onOpenModal} colorScheme='red' />
        </HStack>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder="Product Name" value={updatedProduct.name} isDisabled />
                        <Input placeholder="Price" value={updatedProduct.price} type="number" isDisabled />
                        <Input placeholder="Image URL" value={updatedProduct.image} isDisabled />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={() => handleDeleteProduct(product._id)}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </Box>
    );
};