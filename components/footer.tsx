export default function Footer() {
  return (
    <footer className="bg-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2023 CineDiscover. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:text-white transition duration-300 mr-4">Privacy Policy</a>
          <a href="#" className="hover:text-white transition duration-300 mr-4">Terms of Service</a>
          <a href="#" className="hover:text-white transition duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}