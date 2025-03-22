export const replaceSeoRM = (input: string) => {
    input = input.replace(
      `link rel="canonical" href=" http://localhost:3000`,
      `link rel="canonical" href="https://eaof.vn`
    );
    
    input = input.replace(
      `meta property="og:url" content=" http://localhost:3000`,
      `meta property="og:url" content="https://eaof.vn`
    );
  
    input = input.replace(
      `"@id":" http://localhost:3000/#organization"`,
      `"@id":"https://eaof.vn/#organization"`
    );
  
    input = input.replace(
      ` http://localhost:3000/#logo`,
      `https://eaof.vn/#logo`
    );
  
    input = input.replace(
      ` http://localhost:3000/#website`,
      `https://eaof.vn/#website`
    );
    input = input.replace(
      ` http://localhost:3000/#webpage`,
      `https://eaof.vn/#webpage`
    );
    input = input.replace(
      `"url":" http://localhost:3000"`,
      `"url":"https://eaof.vn"`
    );
  
    input = input.replace(
      `"@type":"WebPage","@id":" http://localhost:3000`,
      `"@type":"WebPage","@id":"https://eaof.vn`
    );
  
    input = input.replace(
      `#webpage","url":" http://localhost:3000`,
      `#webpage","url":"https://eaof.vn`
    );
  
    input = input.replace(
      `"mainEntityOfPage":{"@id":" http://localhost:3000`,
      `"mainEntityOfPage":{"@id":"https://eaof.vn/`
    );
    input = input.replace(
      `"worksFor":{"@id":" http://localhost:3000/#organization`,
      `"worksFor":{"@id":"https://eaof.vn/#organization`
    );
  
    input = input.replace(
      `"sameAs":[" http://localhost:3000"]`,
      `"sameAs":["https://eaof.vn"]`
    );
    return input;
  };