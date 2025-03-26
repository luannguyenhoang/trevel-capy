export const GET_GRAPHQL = `
query MyQuery {
  allGraphQL {
    nodes {
      graphqlItem {
        graphqlChild {
          a1 {
            image {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
}
`;
export const GET_HOME = `
query MyQuery {
  allGraphQL {
    nodes {
      graphqlItem {
        graphqlChild {
          a1 {
            image {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
}
`;
