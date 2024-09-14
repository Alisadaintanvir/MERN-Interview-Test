function HomePage() {
  return (
    <main>
      <div className="container mx-auto py-20 space-y-14">
        <div className="title">
          <h2 className="text-4xl font-semibold">Drawing List</h2>
        </div>

        <div className="list grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="card h-48 border shadow-md"></div>
          <div className="card h-48 border shadow-md"></div>
          <div className="card h-48 border shadow-md"></div>
          <div className="card h-48 border shadow-md"></div>
          <div className="card h-48 border shadow-md"></div>
          <div className="card h-48 border shadow-md"></div>
          <div className="card h-48 border shadow-md"></div>
          <div className="card h-48 border shadow-md"></div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
