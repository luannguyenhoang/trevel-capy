export const GET_KHACHSAN = `
query MyQuery {
  allKhachSan {
    nodes {
      slug
      cardZoom {
        roomCardChild {
          cardContent {
            
            image {
              node {
                mediaItemUrl
              }
            }
            slug
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