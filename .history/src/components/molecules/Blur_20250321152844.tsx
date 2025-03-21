import { Icon, IconProps, useBreakpointValue,  usePrefersReducedMotion } from "@chakra-ui/react";
import { keyframes, css } from "@emotion/react";

export default function Blur(props: IconProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const float = keyframes`
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(2deg); }
    50% { transform: translateY(0) rotate(0deg); }
    75% { transform: translateY(10px) rotate(-2deg); }
    100% { transform: translateY(0) rotate(0deg); }
  `;

  const pulse = keyframes`
    0% { opacity: 0.8; r: 111; }
    50% { opacity: 0.4; r: 125; }
    100% { opacity: 0.8; r: 111; }
  `;

  const animation = prefersReducedMotion
    ? undefined
    : `${float} 8s ease-in-out infinite`;
    
  const circleAnimation1 = prefersReducedMotion
    ? undefined
    : `${pulse} 7s ease-in-out infinite`;
    
  const circleAnimation2 = prefersReducedMotion
    ? undefined
    : `${pulse} 10s ease-in-out infinite`;
    
  const circleAnimation3 = prefersReducedMotion
    ? undefined
    : `${pulse} 9s ease-in-out infinite`;

  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "50vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animation={animation}
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" style={{ animation: circleAnimation1 }} />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" style={{ animation: circleAnimation2 }} />
      <circle cy="291" r="139" fill="#ED64A6" style={{ animation: circleAnimation3 }} />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" style={{ animation: circleAnimation1 }} />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" style={{ animation: circleAnimation2 }} />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" style={{ animation: circleAnimation3 }} />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" style={{ animation: circleAnimation1 }} />
    </Icon>
  );
}
