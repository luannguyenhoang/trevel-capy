import { Icon, IconProps, useBreakpointValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

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
        sx={{ animation: `${colorChange1} 8s infinite` }}
      />
      <circle 
        cx="244" 
        cy="106" 
        r="139" 
        fill="#ED64A6" 
        sx={{ animation: `${colorChange2} 10s infinite` }}
      />
      <circle 
        cy="291" 
        r="139" 
        fill="#ED64A6" 
        sx={{ animation: `${colorChange2} 12s infinite` }}
      />
      <circle 
        cx="80.5" 
        cy="189.5" 
        r="101.5" 
        fill="#ED8936" 
        sx={{ animation: `${colorChange3} 9s infinite` }}
      />
      <circle 
        cx="196.5" 
        cy="317.5" 
        r="101.5" 
        fill="#ECC94B" 
        sx={{ animation: `${colorChange4} 11s infinite` }}
      />
      <circle 
        cx="70.5" 
        cy="458.5" 
        r="101.5" 
        fill="#48BB78" 
        sx={{ animation: `${colorChange3} 13s infinite` }}
      />
      <circle 
        cx="426.5" 
        cy="-0.5" 
        r="101.5" 
        fill="#4299E1" 
        sx={{ animation: `${colorChange1} 7s infinite` }}
      />
    </Icon>
  );
}