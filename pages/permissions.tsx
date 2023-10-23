
import { useEffect, useState } from "react"
import { IBrowser, IDevice, UAParser } from "ua-parser-js"

const Permissions = () => {

    const [location, setLocation] = useState("")
    const [notifications, setNotifications] = useState("")
    const [camera, setCamera] = useState("")
    const [browser, setBrowser] = useState<undefined | string>("")
    const [device, setDevice] = useState<undefined | string>("")

    const parser = new UAParser()

    useEffect(() => {

        console.log(navigator)
        console.log(parser.getResult())

        const userBrowser = parser.getBrowser().name
        const userDevice = parser.getDevice().model

        setBrowser(userBrowser)
        setDevice(userDevice)

        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              if (result.state === "granted") {
                //If granted then you can directly call your function here
                setLocation("granted")
                navigator.geolocation.getCurrentPosition(watchLocation);
              } else if (result.state === "prompt") {
                //If prompt then the user will be asked to give permission
                setLocation("prompt")
                navigator.geolocation.getCurrentPosition(watchLocation);
              } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
                setLocation("denied")
              }
            });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }

        navigator.permissions.query({ name: "notifications"}).then((result) => {
            if (result.state === "denied") {
                setNotifications("denied")
            } else if (result.state === "granted") {
                setNotifications("granted")
            } else if (result.state === "prompt") {
                setNotifications("prompt")
            }
        })

        // navigator.permissions.query({ name: "camera" }).then((result) => {
        //     if (result.state === "denied") {
        //         setCamera("denied")
        //     } else if (result.state === "granted") {
        //         setCamera("granted")
        //     } else if (result.state === "prompt") {
        //         setCamera("prompt")
        //     }
        // })
        
      }, []);

    const watchLocation = () => {
        console.log("Watching location")
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center flex-col">
            <h1>Permissions</h1>
            <div className="h-auto w-full flex items-center justify-center my-[50px]">
                <p className="mr-[20px] text-lg font-bold">Location</p>
                <p className="mr-[20px]">Current status: {location}</p>
                <button className="h-[40px] w-[200px] bg-black text-white font-bold" onClick={() => navigator.geolocation.getCurrentPosition(watchLocation)}>Request permission</button>
            </div>
            <div className="h-auto w-full flex items-center justify-center my-[20px]">
                <p className="mr-[20px] text-lg font-bold">Notifications</p>
                <p className="mr-[20px]">Current status: {notifications}</p>
                <button className="h-[40px] w-[200px] bg-black text-white font-bold" onClick={() => Notification.requestPermission()}>Request permission</button>
            </div>
            {/* <div className="h-auto w-full flex items-center justify-center my-[20px]">
                <p className="mr-[20px] text-lg font-bold">Camera</p>
                <p className="mr-[20px]">Current status: {camera}</p>
                <button className="h-[40px] w-[200px] bg-black text-white font-bold" onClick={() => navigator.mediaDevices.getUserMedia({ video: true })}>Request permission</button>
            </div> */}
            <p>{browser}</p>
            <p>{device}</p>

        </div>
    )
}

export default Permissions