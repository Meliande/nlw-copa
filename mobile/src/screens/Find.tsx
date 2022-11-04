import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";
import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

import { api } from "../services/api";


export function Find(){

    const [code, setCode] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const { navigate } = useNavigation();

    async function handleJoinPolls() {
        try {
            setIsLoading(true);

            if (!code.trim()){
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    color: 'red.500'
                })
            } 

            await api.post('/polls/join', { code });

            toast.show({
                title: 'Você entrou no bolão com sucesso!',
                placement: 'top',
                color: 'green.500'
            })

            navigate('polls');



            console.log()

        } catch (error) {
            console.log(error);
            setIsLoading(false);

            if (error.response?.data?.message === 'Poll not found') {
                return toast.show({
                    title:'Bolão não encontrado',
                    placement: 'top',
                    color: 'red.500',
                });
            }

            if (error.response?.data?.message === 'You are already participating') {
                return toast.show({
                    title:'Você já está participando do bolão!',
                    placement: 'top',
                    color: 'red.500',
                });
            }

        }
    }
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton></Header>

            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através do seu código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                />

                <Button
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPolls}
                />
            </VStack>
        </VStack>
    )
}