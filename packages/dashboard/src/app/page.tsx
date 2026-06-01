export default function HomePage() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Trewe Dashboard</h1>
      <p>Welcome to the Trewe merchant dashboard.</p>
      <p>
        API:{" "}
        <a href={process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:4000"}>
          {process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:4000"}
        </a>
      </p>
    </main>
  );
}
