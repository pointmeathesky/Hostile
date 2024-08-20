
import Image from 'next/image';
export default function Page ()  {
    return(
        <div className=" bg-winyel flex h-screen w-screen justify-center items-center" >
            <div><h1 className="text-6xl ">Under Construction</h1></div>
            <div><Image id="animated" alt="construction worker" className="object-contain h-20" src="/constwrkr.png"/></div>
            
            
            {/* <p className="animate-test">test</p> */}
        </div>
        
    )
}

