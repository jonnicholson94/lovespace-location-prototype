import { useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

export default function Callback() {

    const router = useRouter()

    const { box_id } = router.query

    console.log(box_id)

    useEffect(() => {
        setTimeout(() => {
            router.push("/success")
        }, 5000)
    }, [])

    return (
        <div className="h-screen w-screen flex items-center justify-center flex-col">
            <p className="w-[80%] text-center text-[32px] font-bold mb-[20px]">Simulating network request processing</p>
            { box_id ? 
            <p className="w-[80%] text-center text-[24px] mb-[20px]">You scanned box: {box_id}</p> : 
            <p className="w-[80%] text-center text-[24px] mb-[20px]">No box scanned</p> }
            <Image className="mb-[20px] animate-spin" height={30} width={30} src="/loader-dark.svg" alt="Bla" />
            <p>Page will redirect in 5 seconds</p>
        </div>
    )
}