import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Gatepass Management System</h1>
      <p>Select a section to continue:</p>

      <nav style={{ marginTop: "30px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px" }}>
            <Link href="/login">Login Page</Link>
          </li>
          <li style={{ margin: "10px" }}>
            <Link href="/signup">Signup Page</Link>
          </li>
          <li style={{ margin: "10px" }}>
            <Link href="/gatepass">Gatepass Page</Link>
          </li>
          <li style={{ margin: "10px" }}>
            <Link href="/guestupdate">Guest Update Page</Link>
          </li>
          <li style={{ margin: "10px" }}>
            <Link href="/addmore">Add More Page</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
