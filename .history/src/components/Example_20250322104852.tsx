import { useState } from 'react';
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
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