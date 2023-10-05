import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Text,
    Button
} from '@chakra-ui/react';
import { UserType } from '../../Types/User';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

interface MessageUserProps {
    profile: string;
    name?: string;
    message?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    design?: string;
    setId?: React.Dispatch<React.SetStateAction<number>>;
    id?: number;
    dm?: UserType;
    setUserDm?: React.Dispatch<React.SetStateAction<UserType | undefined>>;
    setTest?: React.Dispatch<React.SetStateAction<boolean>>;
    isUserDm?: boolean;
    setFirstLoad?: React.Dispatch<React.SetStateAction<string>>;
    render?: boolean;
    setRender?: React.Dispatch<React.SetStateAction<boolean>>;
    updateUser?: boolean;
    setUpdateUser?: React.Dispatch<React.SetStateAction<boolean>>;
    updateClass?: number;
    setUpdateClass?: React.Dispatch<React.SetStateAction<number | undefined>>;
    activeCard?: string;
}

const MessageUser = ({
    profile,
    name,
    message,
    children,
    design,
    setUserDm,
    dm,
    setFirstLoad,
    isUserDm,
    render,
    setRender,
    updateUser,
    setUpdateUser,
    updateClass,
    setUpdateClass,
    activeCard
}: MessageUserProps) => {
    const HandleDm = (id: number | undefined) => {
        console.log('Hellooo user', isUserDm);
        if (
            setUserDm &&
            dm &&
            setFirstLoad &&
            setUpdateUser &&
            setUpdateClass
        ) {
            console.log('Helloooooooooooooooo');
            setFirstLoad('firstLoad');
            setUserDm(dm);
            setUpdateUser(!updateUser);
            setUpdateClass(id);
        }
        console.log('Hellooo userDm', dm);
    };
    useEffect(() => {
        console.log('The update class', updateClass);
    }, [updateClass]);
    return (
        <div>
            <button onClick={() => HandleDm(dm?.id)} style={{ width: '100%' }}>
                <Card
                    className={activeCard}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow="hidden"
                    variant="outline"
                    bg={'#F5F5F5'}
                    boxShadow={'2xl'}
                    p={2}
                    h={'100px'}
                    w={'100%'}
                    style={{ boxShadow: 'none' }}
                    marginBottom={'0.5rem'}
                >
                    <Image
                        objectFit="cover"
                        width={'50px'}
                        height={'50px'}
                        marginTop={'18px'}
                        src={profile}
                        alt={name}
                        borderRadius={'30px'}
                    />

                    <Stack>
                        <CardBody>
                            <Heading
                                as="h6"
                                size="sm"
                                fontWeight="bold"
                                marginLeft={'-10px'}
                                marginTop={'8px'}
                                marginBottom={1}
                            >
                                {name}
                            </Heading>

                            <Text marginLeft={'-3.5rem'} color={'#808080'}>
                                {message}
                            </Text>
                        </CardBody>
                    </Stack>
                    <>{children}</>
                </Card>
            </button>
        </div>
    );
};

export default MessageUser;
