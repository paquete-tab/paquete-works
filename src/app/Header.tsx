import Image from "next/image"

const Header = () => {
  return (
    <nav className="h-14 bg-emerald-400/90 text-white flex items-center justify-between space-x-2 px-2 w-full shadow-md bg-gradient-to-br from-blue-500/80 to-purple-600/80 shadow-blue-500/30 backdrop-blur-sm fixed top-0 z-5">
      <h2 className="ml-4 px-4 py-1 font-semibold text-2xl bg-black rounded">Paquete&apos;s works</h2>
      <a className="mr-4" href="https://github.com/paquete-tab/paquete-works" target="_brank"><Image src={"/github-mark.svg"} alt="https://github.com/paquete-tab/paquete-works" width={40} height={40} /></a>
    </nav>
  )
}

export default Header