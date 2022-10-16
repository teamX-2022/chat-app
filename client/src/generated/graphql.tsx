import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Conversation = {
  __typename?: 'Conversation';
  _id?: Maybe<Scalars['ID']>;
  lastMessageId?: Maybe<Scalars['String']>;
  leaderId?: Maybe<Scalars['String']>;
  members: Array<Scalars['String']>;
  messages: Array<Message>;
  name?: Maybe<Scalars['String']>;
};

export type ConversationInput = {
  members: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateMessageInput = {
  conversationId: Scalars['String'];
  messageText: Scalars['String'];
};

export type Friend = {
  __typename?: 'Friend';
  _id: Scalars['ID'];
  userIds: Array<Scalars['String']>;
};

export type FriendRequestInput = {
  requestId: Scalars['String'];
  userId: Scalars['String'];
};

export type FriendRequestMutationResponse = IMutationResponse & {
  __typename?: 'FriendRequestMutationResponse';
  code: Scalars['Float'];
  friendRequest: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type IMutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  _id?: Maybe<Scalars['ID']>;
  conversationId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  userId: Scalars['ID'];
};

export type Message = {
  __typename?: 'Message';
  _id?: Maybe<Scalars['ID']>;
  conversationId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  messageText: Scalars['String'];
  senderId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend: Scalars['ID'];
  addLastMessageId: Scalars['Boolean'];
  addMember: Member;
  createConversation: Scalars['ID'];
  createGroupConversation: Scalars['ID'];
  createMessage: Message;
  deleteFriend: Scalars['Boolean'];
  login: UserMutationResponse;
  logout: UserMutationResponse;
  register: UserMutationResponse;
  sendRequest: FriendRequestMutationResponse;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationAddMemberArgs = {
  conversationId: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateConversationArgs = {
  conversation: ConversationInput;
};


export type MutationCreateGroupConversationArgs = {
  conversation: ConversationInput;
};


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLogoutArgs = {
  userId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationSendRequestArgs = {
  friendRequestInput: FriendRequestInput;
};

export type Query = {
  __typename?: 'Query';
  getConversationById: Conversation;
  getConversationIds: Array<Scalars['String']>;
  getFriends: Array<Friend>;
  getListConversation: Array<Conversation>;
  getMessages: Array<Message>;
  getMyFriendByConversationId: Member;
  getNameById: Scalars['String'];
  getUser: User;
  hello: Scalars['String'];
  isFriendExisted: Scalars['Boolean'];
  users: Array<User>;
};


export type QueryGetConversationByIdArgs = {
  conversationId: Scalars['String'];
};


export type QueryGetMessagesArgs = {
  conversationId: Scalars['String'];
};


export type QueryGetMyFriendByConversationIdArgs = {
  conversationId: Scalars['String'];
};


export type QueryGetNameByIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};


export type QueryIsFriendExistedArgs = {
  userId1: Scalars['String'];
  userId2: Scalars['String'];
};

export type RegisterInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSent: Message;
  messageSent2: Message;
};


export type SubscriptionMessageSentArgs = {
  topic: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  avatar?: Maybe<Scalars['String']>;
  coverPicture?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  tokenVersion: Scalars['Float'];
  username: Scalars['String'];
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  userId: Scalars['ID'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null } };

export type LogoutMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'UserMutationResponse', code: number, success: boolean } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, userId: string } };

export type GetListConversationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListConversationQuery = { __typename?: 'Query', getListConversation: Array<{ __typename?: 'Conversation', members: Array<string>, _id?: string | null, name?: string | null, lastMessageId?: string | null, leaderId?: string | null }> };

export type GetConversationByIdQueryVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type GetConversationByIdQuery = { __typename?: 'Query', getConversationById: { __typename?: 'Conversation', name?: string | null, _id?: string | null, lastMessageId?: string | null, leaderId?: string | null, members: Array<string> } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type GetMyFriendByConversationIdQueryVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type GetMyFriendByConversationIdQuery = { __typename?: 'Query', getMyFriendByConversationId: { __typename?: 'Member', _id?: string | null, conversationId: string, createdAt: any, name: string, userId: string } };

export type GetMessagesQueryVariables = Exact<{
  getMessagesConversationId2: Scalars['String'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: Array<{ __typename?: 'Message', _id?: string | null, conversationId: string, createdAt: any, messageText: string, senderId: string }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id?: string | null, username: string }> };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', _id?: string | null, name: string, username: string, avatar?: string | null, coverPicture?: string | null } };


export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    code
    success
    message
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($userId: ID!) {
  logout(userId: $userId) {
    code
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    code
    success
    message
    userId
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetListConversationDocument = gql`
    query GetListConversation {
  getListConversation {
    members
    _id
    name
    lastMessageId
    leaderId
  }
}
    `;

/**
 * __useGetListConversationQuery__
 *
 * To run a query within a React component, call `useGetListConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListConversationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListConversationQuery(baseOptions?: Apollo.QueryHookOptions<GetListConversationQuery, GetListConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListConversationQuery, GetListConversationQueryVariables>(GetListConversationDocument, options);
      }
export function useGetListConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListConversationQuery, GetListConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListConversationQuery, GetListConversationQueryVariables>(GetListConversationDocument, options);
        }
export type GetListConversationQueryHookResult = ReturnType<typeof useGetListConversationQuery>;
export type GetListConversationLazyQueryHookResult = ReturnType<typeof useGetListConversationLazyQuery>;
export type GetListConversationQueryResult = Apollo.QueryResult<GetListConversationQuery, GetListConversationQueryVariables>;
export const GetConversationByIdDocument = gql`
    query GetConversationById($conversationId: String!) {
  getConversationById(conversationId: $conversationId) {
    name
    _id
    lastMessageId
    leaderId
    members
  }
}
    `;

/**
 * __useGetConversationByIdQuery__
 *
 * To run a query within a React component, call `useGetConversationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConversationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConversationByIdQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetConversationByIdQuery(baseOptions: Apollo.QueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(GetConversationByIdDocument, options);
      }
export function useGetConversationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConversationByIdQuery, GetConversationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConversationByIdQuery, GetConversationByIdQueryVariables>(GetConversationByIdDocument, options);
        }
export type GetConversationByIdQueryHookResult = ReturnType<typeof useGetConversationByIdQuery>;
export type GetConversationByIdLazyQueryHookResult = ReturnType<typeof useGetConversationByIdLazyQuery>;
export type GetConversationByIdQueryResult = Apollo.QueryResult<GetConversationByIdQuery, GetConversationByIdQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const GetMyFriendByConversationIdDocument = gql`
    query GetMyFriendByConversationId($conversationId: String!) {
  getMyFriendByConversationId(conversationId: $conversationId) {
    _id
    conversationId
    createdAt
    name
    userId
  }
}
    `;

/**
 * __useGetMyFriendByConversationIdQuery__
 *
 * To run a query within a React component, call `useGetMyFriendByConversationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFriendByConversationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFriendByConversationIdQuery({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetMyFriendByConversationIdQuery(baseOptions: Apollo.QueryHookOptions<GetMyFriendByConversationIdQuery, GetMyFriendByConversationIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyFriendByConversationIdQuery, GetMyFriendByConversationIdQueryVariables>(GetMyFriendByConversationIdDocument, options);
      }
export function useGetMyFriendByConversationIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyFriendByConversationIdQuery, GetMyFriendByConversationIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyFriendByConversationIdQuery, GetMyFriendByConversationIdQueryVariables>(GetMyFriendByConversationIdDocument, options);
        }
export type GetMyFriendByConversationIdQueryHookResult = ReturnType<typeof useGetMyFriendByConversationIdQuery>;
export type GetMyFriendByConversationIdLazyQueryHookResult = ReturnType<typeof useGetMyFriendByConversationIdLazyQuery>;
export type GetMyFriendByConversationIdQueryResult = Apollo.QueryResult<GetMyFriendByConversationIdQuery, GetMyFriendByConversationIdQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($getMessagesConversationId2: String!) {
  getMessages(conversationId: $getMessagesConversationId2) {
    _id
    conversationId
    createdAt
    messageText
    senderId
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      getMessagesConversationId2: // value for 'getMessagesConversationId2'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    _id
    username
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUser(userId: $userId) {
    _id
    name
    username
    avatar
    coverPicture
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;