export default function LoaderScreen() {
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Loading...</h1>
      <div className="animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16 mx-auto"></div>
    </div>
  );
}