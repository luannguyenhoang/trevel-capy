export
 const query = `
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