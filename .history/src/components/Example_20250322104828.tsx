import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import a heavy component
const HeavyComponent = dynamic(() => import('./templates'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Optional: disable server-side rendering
});

export default function Example() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <h1>Dynamic Import Example</h1>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? 'Hide Component' : 'Show Component'}
      </button>
      
      {showComponent && <HeavyComponent />}
    </div>
  );
} 