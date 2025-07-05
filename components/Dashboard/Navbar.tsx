import CustomForm from "./CustomForm"
import Logo from "./Logo"

const Navbar = () => {
  return (
    <nav className=" fixed w-full top-0 left-0 z-50 bg-custom-bg/90 backdrop-blur-sm xl:px-4 xl:py-2 p-1">
            <div className=" flex justify-between h-12 w-full px-4">
                <div>
                    <Logo />
                </div>
                <div>
                    <CustomForm />
                </div>
            </div>
    </nav>
  )
}

export default Navbar