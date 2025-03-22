export const replaceSeoRM = (input: string) => {
    input = input.replace(
      `link rel="canonical" href=" http://localhost:3000`,
      `link rel="canonical" href="http://du-lich-viet-nam.local/wp-admin/`
    );
    
    input = input.replace(
      `meta property="og:url" content=" http://localhost:3000`,
      `meta property="og:url" content="http://du-lich-viet-nam.local/wp-admin/`
    );
  
    input = input.replace(
      `"@id":" http://localhost:3000/#organization"`,
      `"@id":"http://du-lich-viet-nam.local/wp-admin//#organization"`
    );
  
    input = input.replace(
      ` http://localhost:3000/#logo`,
      `http://du-lich-viet-nam.local/wp-admin//#logo`
    );
  
    input = input.replace(
      ` http://localhost:3000/#website`,
      `http://du-lich-viet-nam.local/wp-admin//#website`
    );
    input = input.replace(
      ` http://localhost:3000/#webpage`,
      `http://du-lich-viet-nam.local/wp-admin//#webpage`
    );
    input = input.replace(
      `"url":" http://localhost:3000"`,
      `"url":"http://du-lich-viet-nam.local/wp-admin/"`
    );
  
    input = input.replace(
      `"@type":"WebPage","@id":" http://localhost:3000`,
      `"@type":"WebPage","@id":"http://du-lich-viet-nam.local/wp-admin/`
    );
  
    input = input.replace(
      `#webpage","url":" http://localhost:3000`,
      `#webpage","url":"http://du-lich-viet-nam.local/wp-admin/`
    );
  
    input = input.replace(
      `"mainEntityOfPage":{"@id":" http://localhost:3000`,
      `"mainEntityOfPage":{"@id":"http://du-lich-viet-nam.local/wp-admin//`
    );
    input = input.replace(
      `"worksFor":{"@id":" http://localhost:3000/#organization`,
      `"worksFor":{"@id":"http://du-lich-viet-nam.local/wp-admin//#organization`
    );
  
    input = input.replace(
      `"sameAs":[" http://localhost:3000"]`,
      `"sameAs":["http://du-lich-viet-nam.local/wp-admin/"]`
    );
    return input;
  };