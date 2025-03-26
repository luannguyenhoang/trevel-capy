import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center>
      <div className="device w-[100vh]">
        <div className="device__a">
          <div className="device__a-1"></div>
          <div className="device__a-2"></div>
        </div>
        <div className="device__b"></div>
        <div className="device__c"></div>
        <div className="device__d"></div>
        <div className="device__e"></div>
        <div className="device__f"></div>
        <div className="device__g"></div>
      </div>

      <style jsx>{`
        :root {
          --hue: 223;
          --bg: hsl(var(--hue), 10%, 90%);
          --fg: hsl(var(--hue), 10%, 10%);
          --trans-dur: 0.3s;
        }
        body {
          background-color: var(--bg);
          color: var(--fg);
          display: grid;
          place-items: center;
          font: 1em/1.5 sans-serif;
          height: 100vh;
          transition: background-color var(--trans-dur), color var(--trans-dur);
        }
        .device {
          position: relative;
          width: 4em;
          height: 4em;
        }
        .device__a,
        .device__a-1,
        .device__a-2,
        .device__b,
        .device__c,
        .device__d,
        .device__e,
        .device__f,
        .device__g {
          animation: device-a 3s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          position: absolute;
          transition: background-color var(--trans-dur), box-shadow var(--trans-dur);
        }
        .device__a,
        .device__d,
        .device__e {
          background-color: hsl(var(--hue), 10%, 70%);
          box-shadow: 0 0 0 0.25em inset;
        }
        .device__a {
          border-radius: 0.375em;
          top: 0;
          width: 4em;
          height: 2.5em;
          z-index: 1;
        }
        .device__a-1,
        .device__a-2,
        .device__b,
        .device__c,
        .device__f,
        .device__g {
          background-color: var(--fg);
          border-radius: 0.125em;
        }
        .device__b {
          top: 2.25em;
          left: 1.875em;
          width: 0.25em;
          height: 1em;
        }
        .device__c {
          top: 3em;
          left: 1em;
          width: 2em;
          height: 0.25em;
        }
        .device__d,
        .device__e {
          left: 1.25em;
          width: 1.5em;
          height: 0.875em;
          visibility: hidden;
        }
        .device__d {
          border-radius: 0.375em 0.375em 0 0;
          top: 0.75em;
        }
        .device__e {
          border-radius: 0 0 0.375em 0.375em;
          top: 1.625em;
        }
        .device__f,
        .device__g {
          bottom: 0;
          height: 0.25em;
        }
        .device__f {
          opacity: 0.5;
          left: 1em;
          width: 2em;
        }
        .device__g {
          opacity: 0;
          left: 0;
          width: 4em;
        }
        /* Dark theme */
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: hsl(var(--hue), 10%, 10%);
            --fg: hsl(var(--hue), 10%, 90%);
          }
          .device__a,
          .device__d,
          .device__e {
            background-color: hsl(var(--hue), 10%, 30%);
          }
        }
        /* Animations */
        @keyframes device-a {
          from,
          to {
            left: 0;
            width: 4em;
            height: 2.5em;
            transform: translateY(0);
          }
          12.5% {
            left: 0;
            width: 4em;
            height: 2.5em;
            transform: translateY(1.5em);
          }
          /* Additional keyframes... */
        }
        /* Add other keyframes as needed */
      `}</style>
    </Center>
  );
}
