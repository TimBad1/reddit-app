import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import './main.global.css';
import { Layout } from './shared/Layout/Layout';
import { Header } from './shared/Header/Header';
import { Content } from './shared/Content/Content';
import { CardsList } from './shared/CardsList/CardsList';
import { generateId } from './utils/generateRandomIndex';
import { useToken } from './hooks/useToken';
import { tokenContext } from './shared/context/tokenContext';
import { UserContentProvider } from './shared/context/userContext';
import { PostsContentProvider } from './shared/context/postsContext';
import { commentContext} from './shared/context/commentContext';
import { createStore } from 'redux';

const store = createStore(() => {})

// const LIST = [
//     { As: 'li' as const, text: 'some' },
//     { As: 'li' as const, text: 'other some' },
//     { As: 'li' as const, text: 'some' },
// ].map(generateId)

function AppComponent() {
    const [commentValue, setCommentValue] = useState('');

    const [token] = useToken();
    
    const CommentProvider = commentContext.Provider;
    
    return (
        <CommentProvider value={{
            value: commentValue,
            onChange: setCommentValue
        }}>
            <tokenContext.Provider value={token}>
                <UserContentProvider>
                    <Layout>
                        <Header />
                        <Content>
                            <PostsContentProvider>
                                <CardsList />
                            </PostsContentProvider>
                        </Content>
                    </Layout>
                </UserContentProvider>
            </tokenContext.Provider>
        </CommentProvider>
    )
}

export const App = hot(() => <AppComponent />);