import { Icon, IconProps, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function Blur(props: IconProps) {
  const [colors, setColors] = useState({
    circle1: "#FF0000FF",
    circle2: "#ED64A6",
    circle3: "#ED64A6",
    circle4: "#ED8936",
    circle5: "#ECC94B",
    circle6: "#48BB78",
    circle7: "#4299E1",
  });

  useEffect(() => {
    const colorSets = {
      set1: ["#F56565", "#4299E1", "#00FF6AFF"],
      set2: ["#FF007BFF", "#F56565", "#ECC94B"],
      set3: ["#ED8936", "#ED64A6", "#FF0000FF"],
      set4: ["#ECC94B", "#00FF6AFF", "#FF0000FF"],
    };

    const cycleColors = (currentColor: string, colorSet: string[]) => {
      const index = colorSet.indexOf(currentColor);
      return colorSet[(index + 1) % colorSet.length];
    };

    const interval1 = setInterval(() => {
      setColors((prev) => ({
        ...prev,
        circle1: cycleColors(prev.circle1, colorSets.set1),
      }));
    }, 1000);

    const interval2 = setInterval(() => {
      setColors((prev) => ({
        ...prev,
        circle2: cycleColors(prev.circle2, colorSets.set2),
      }));
    }, 1010);

    const interval3 = setInterval(() => {
      setColors((prev) => ({
        ...prev,
        circle3: cycleColors(prev.circle3, colorSets.set2),
      }));
    }, 1020);

    const interval4 = setInterval(() => {
      setColors((prev) => ({
        ...prev,
        circle4: cycleColors(prev.circle4, colorSets.set3),
      }));
    }, 1030);

    const interval5 = setInterval(() => {
      setColors((prev) => ({
        ...prev,
        circle5: cycleColors(prev.circle5, colorSets.set4),
      }));
    }, 1040);

    const interval6 = setInterval(() => {
      setColors((prev) => ({
        ...prev,
        circle6: cycleColors(prev.circle6, colorSets.set3),
      }));
    }, 1050);

    const interval7 = setInterval(() => {
      setColors((prev) => ({
        ...prev,
        circle7: cycleColors(prev.circle7, colorSets.set1),
      }));
    }, 1060);

    // Clean up intervals
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
      clearInterval(interval5);
      clearInterval(interval6);
      clearInterval(interval7);
    };
  }, []);

  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "50vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="40px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="71"
        cy="61"
        r="111"
        fill={colors.circle1}
        style={{ transition: "fill 0.5s linear" }}
      />
      <circle
        cx="244"
        cy="106"
        r="139"
        fill={colors.circle2}
        style={{ transition: "fill 0.5s linear" }}
      />
      <circle
        cy="291"
        r="139"
        fill={colors.circle3}
        style={{ transition: "fill 0.5s linear" }}
      />
      <circle
        cx="80.5"
        cy="189.5"
        r="101.5"
        fill={colors.circle4}
        style={{ transition: "fill 0.5s linear" }}
      />
      <circle
        cx="196.5"
        cy="317.5"
        r="101.5"
        fill={colors.circle5}
        style={{ transition: "fill 0.5s linear" }}
      />
      <circle
        cx="70.5"
        cy="458.5"
        r="101.5"
        fill={colors.circle6}
        style={{ transition: "fill 0.5s linear" }}
      />
      <circle
        cx="426.5"
        cy="-0.5"
        r="101.5"
        fill={colors.circle7}
        style={{ transition: "fill 0.5s linear" }}
      />
    </Icon>
  );
}
