export const replaceSeoRM = (input: string) => {
    input = input.replace(
      `link rel="canonical" href=" http://localhost:3000`,
      `link rel="canonical" href="du-lich-viet-nam.loca`
    );
    
    input = input.replace(
      `meta property="og:url" content=" http://localhost:3000`,
      `meta property="og:url" content="du-lich-viet-nam.loca`
    );
  
    input = input.replace(
      `"@id":" http://localhost:3000/#organization"`,
      `"@id":"du-lich-viet-nam.loca/#organization"`
    );
  
    input = input.replace(
      ` http://localhost:3000/#logo`,
      `du-lich-viet-nam.loca/#logo`
    );
  
    input = input.replace(
      ` http://localhost:3000/#website`,
      `du-lich-viet-nam.loca/#website`
    );
    input = input.replace(
      ` http://localhost:3000/#webpage`,
      `du-lich-viet-nam.loca/#webpage`
    );
    input = input.replace(
      `"url":" http://localhost:3000"`,
      `"url":"du-lich-viet-nam.loca"`
    );
  
    input = input.replace(
      `"@type":"WebPage","@id":" http://localhost:3000`,
      `"@type":"WebPage","@id":"du-lich-viet-nam.loca`
    );
  
    input = input.replace(
      `#webpage","url":" http://localhost:3000`,
      `#webpage","url":"du-lich-viet-nam.loca`
    );
  
    input = input.replace(
      `"mainEntityOfPage":{"@id":" http://localhost:3000`,
      `"mainEntityOfPage":{"@id":"du-lich-viet-nam.loca/`
    );
    input = input.replace(
      `"worksFor":{"@id":" http://localhost:3000/#organization`,
      `"worksFor":{"@id":"du-lich-viet-nam.loca/#organization`
    );
  
    input = input.replace(
      `"sameAs":[" http://localhost:3000"]`,
      `"sameAs":["du-lich-viet-nam.loca"]`
    );
    return input;
  };