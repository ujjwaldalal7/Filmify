import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Filmify | Movie Ticket System</p>
    </footer>
  );
}
