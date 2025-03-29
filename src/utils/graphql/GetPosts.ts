export const GET_POSTS = `
query GetPosts($first: Int!, $after: String) {
  posts(first: $first, after: $after) {
    nodes {
      id
      slug
      title
      excerpt
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;