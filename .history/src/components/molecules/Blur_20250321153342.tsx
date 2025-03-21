import { Icon, IconProps, useBreakpointValue } from "@chakra-ui/react";
import { keyframes, css } from "@emotion/react";

// Tạo keyframes animation cho các màu sắc thay đổi
const colorChange1 = keyframes`
  0% { fill: #F56565; }
  33% { fill: #4299E1; }
  66% { fill: #48BB78; }
  100% { fill: #F56565; }
`;

const colorChange2 = keyframes`
  0% { fill: #ED64A6; }
  33% { fill: #F56565; }
  66% { fill: #ECC94B; }
  100% { fill: #ED64A6; }
`;

const colorChange3 = keyframes`
  0% { fill: #ED8936; }
  33% { fill: #ED64A6; }
  66% { fill: #4299E1; }
  100% { fill: #ED8936; }
`;

const colorChange4 = keyframes`
  0% { fill: #ECC94B; }
  33% { fill: #48BB78; }
  66% { fill: #F56565; }
  100% { fill: #ECC94B; }
`;

// Tạo các CSS animations styles
const animation1 = css`animation: ${colorChange1} 8s infinite`;
const animation2 = css`animation: ${colorChange2} 10s infinite`;
const animation3 = css`animation: ${colorChange3} 9s infinite`;
const animation4 = css`animation: ${colorChange4} 11s infinite`;
const animation5 = css`animation: ${colorChange2} 12s infinite`;
const animation6 = css`animation: ${colorChange3} 13s infinite`;
const animation7 = css`animation: ${colorChange1} 7s infinite`;

export default function Blur(props: IconProps) {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "50vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="450px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle 
        cx="71" 
        cy="61" 
        r="111" 
        fill="#F56565" 
        css={animation1}
      />
      <circle 
        cx="244" 
        cy="106" 
        r="139" 
        fill="#ED64A6" 
        css={animation2}
      />
      <circle 
        cy="291" 
        r="139" 
        fill="#ED64A6" 
        css={animation5}
      />
      <circle 
        cx="80.5" 
        cy="189.5" 
        r="101.5" 
        fill="#ED8936" 
        css={animation3}
      />
      <circle 
        cx="196.5" 
        cy="317.5" 
        r="101.5" 
        fill="#ECC94B" 
        css={animation4}
      />
      <circle 
        cx="70.5" 
        cy="458.5" 
        r="101.5" 
        fill="#48BB78" 
        css={animation6}
      />
      <circle 
        cx="426.5" 
        cy="-0.5" 
        r="101.5" 
        fill="#4299E1" 
        css={animation7}
      />
    </Icon>
  );
}