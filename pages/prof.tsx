import { Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

const ProfPage = () => {
  return (
    <Container maxW="container.lg" p={4} centerContent>
      <Heading>プロフィール</Heading>
      <HStack gap={4} mt={8}>
        <Image
          src="/images/profile.jpg"
          alt="Profile Image"
          width={250}
          height={250}
          style={{ borderRadius: "30px" }}
        />
        <Stack>
          <Text>Kentaro</Text>
          <Text>年齢: 35歳</Text>
          <Text>Webエンジニア</Text>
          <Text>趣味: プログラミング, 音楽, 映画鑑賞</Text>
          <Text>好きな言語: React、JavaScript</Text>
        </Stack>
      </HStack>
    </Container>
  );
};
export default ProfPage;
