import Image from "next/image"

const Logo = () => {
  return (
    <div className=" flex items-center justify-center">
        <Image src={"/wallet.svg"} width={35} height={35} alt="image" className="" />
        <span className=" text-lg font-mono ml-2">Finance Tracker</span> 
    </div>
  )
}

export default Logo