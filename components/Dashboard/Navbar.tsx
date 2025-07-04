import { Button } from "../ui/button"
import Logo from "./Logo"

const Navbar = () => {
  return (
    <nav className=" fixed w-full top-0 left-0 z-50 bg-custom-bg/90 backdrop-blur-sm xl:px-4 xl:py-2 p-1">
            <div className=" flex justify-between h-12 w-full px-4">
                <div>
                    <Logo />
                </div>
                <div className=" flex items-center justify-center gap-4">
                    <Button className=" from-slate-800 to-slate-900 border border-white hover:brightness-125 text-sm duration-100 ease-in-out bg-gradient-to-b text-white font-semibold rounded-md shadow-md">
                        Set Budget
                    </Button>
                    <Button className=" from-[#606adb] to-[#4b5ce6] hover:brightness-125 text-sm duration-100 ease-in-out bg-gradient-to-r text-white font-semibold rounded-md shadow-md">
                        <span className=" text-xl">+</span>
                        Add Transaction
                    </Button>
                </div>
            </div>
    </nav>
  )
}

export default Navbar