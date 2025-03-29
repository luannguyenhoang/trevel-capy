export const GET_KHACHSAN_BY_ZOOMNAME = `
query MyQuery {
  allKhachSan {
    nodes {
      cardZoom {
        roomCardChild {
          cardContent {
          slug
            bathroom
            bed
            checkIn
            checkOut
            fieldGroupName
            hotelServices
            m2
            image {
              node {
                mediaItemUrl
              }
            }
            maxPrice
            minPrice
            people
            photos {
              child {
                node {
                  mediaItemUrl
                }
              }
            }
            roomAmenities
            summaryOfContent
            roomDirection
            time
            zoomName
          }
        }
      }
    }
  }
}
`;
