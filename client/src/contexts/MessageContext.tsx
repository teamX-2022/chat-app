import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface IMessageContext {
    id: string;
    setId: Dispatch<SetStateAction<string>>;
}

export const MessageContext = createContext<IMessageContext>({
    id: '',
    setId: () => {},
});

export const useMessageContext = () => {
    return useContext(MessageContext);
};

const MessageContextProvider = ({ children }: { children: ReactNode }) => {
    const [id, setId] = useState('');

    const data = {
        id,
        setId,
    };
    return <MessageContext.Provider value={data}>{children}</MessageContext.Provider>;
};

export default MessageContextProvider;
