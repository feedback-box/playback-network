/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAIModel = /* GraphQL */ `
  query GetAIModel($id: ID!) {
    getAIModel(id: $id) {
      accuracy
      app
      createdAt
      description
      id
      name
      ownersWallet
      price
      published
      serialisedConfig
      status
      updatedAt
      __typename
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      balance
      createdAt
      ens
      id
      nftAddresses
      updatedAt
      verified
      wallet
      __typename
    }
  }
`;
export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      createdAt
      description
      id
      ownersWallet
      sizeGb
      status
      type
      updatedAt
      __typename
    }
  }
`;
export const getNFT = /* GraphQL */ `
  query GetNFT($id: ID!) {
    getNFT(id: $id) {
      blockAddress
      cid
      createdAt
      id
      metadata
      ownersWallet
      price
      sizeGb
      updatedAt
      __typename
    }
  }
`;
export const getSale = /* GraphQL */ `
  query GetSale($id: ID!) {
    getSale(id: $id) {
      aiModelId
      app
      buyersWallet
      createdAt
      id
      isAuction
      priceListed
      pricePaid
      published
      sellerssWallet
      status
      taskId
      transactionLedgerId
      updatedAt
      __typename
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      aiModelId
      app
      createdAt
      description
      difficulty
      id
      mediaId
      name
      ownersWallet
      priceListed
      published
      status
      updatedAt
      __typename
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      content
      createdAt
      id
      isDone
      updatedAt
      __typename
    }
  }
`;
export const listAIModels = /* GraphQL */ `
  query ListAIModels(
    $filter: ModelAIModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAIModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        accuracy
        app
        createdAt
        description
        id
        name
        ownersWallet
        price
        published
        serialisedConfig
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        balance
        createdAt
        ens
        id
        nftAddresses
        updatedAt
        verified
        wallet
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listMedia = /* GraphQL */ `
  query ListMedia(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedia(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        description
        id
        ownersWallet
        sizeGb
        status
        type
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listNFTS = /* GraphQL */ `
  query ListNFTS(
    $filter: ModelNFTFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNFTS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        blockAddress
        cid
        createdAt
        id
        metadata
        ownersWallet
        price
        sizeGb
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listSales = /* GraphQL */ `
  query ListSales(
    $filter: ModelSaleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSales(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aiModelId
        app
        buyersWallet
        createdAt
        id
        isAuction
        priceListed
        pricePaid
        published
        sellerssWallet
        status
        taskId
        transactionLedgerId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        aiModelId
        app
        createdAt
        description
        difficulty
        id
        mediaId
        name
        ownersWallet
        priceListed
        published
        status
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        content
        createdAt
        id
        isDone
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;