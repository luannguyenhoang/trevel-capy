export default function HeavyComponent() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Heavy Component</h2>
      <p>This component is loaded only when needed using dynamic import.</p>
      <p>For example, this could be a complex chart, a large form, or any component that is not needed on initial page load.</p>
    </div>
  );
} 