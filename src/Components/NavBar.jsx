import React from 'react'

export default function NavBar() {
  return (
    <div>
      <nav className="w-full p-8 flex font-mono fixed justify-between z-50">
            <div className="brand text-2xl font-md">Thirtysixstudios</div>
            <div className="links flex gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
    </div>
  )
}
