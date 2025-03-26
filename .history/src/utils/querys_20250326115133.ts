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
export const GET_KHACHSAN = `
query MyQuery {
  allKhachSan {
    nodes {
      cardZoom {
        roomCardChild {
          cardContent {
            image {
              node {
                mediaItemUrl
              }
            }
            maxPrice
            minPrice
            zoomName
            time
            summaryOfContent
            m2
            people
            photos {
              child {
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
}
`;
export const GET_KHACHSAN_BY_ZOOMNAME = `
query MyQuery {
  allKhachSan {
    nodes {
      cardZoom {
        roomCardChild {
          cardContent {
            image {
              node {
                mediaItemUrl
              }
            }
            maxPrice
            minPrice
            zoomName
            time
            summaryOfContent
            m2
            people
            photos {
              child {
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
}
`;

const query = `

`;
