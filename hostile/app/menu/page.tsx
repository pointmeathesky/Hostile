'use client'

import React from "react";
import Window from "../components/window";
import Desktop from "../page";
import ImageModal from "../components/ImageModal";

const Page = () => {
    const menuItems = [
        { label: "", url: "https://gavin-bowers.arcology.builders/", image: "entertainment.png" },
        { label: "", url: "", image: "health.png" }, // ask torsten for url
        { label: "", url: "https://lanchess.arcology.builders/", image: "games.png" },
        { label: "", url: "https://macin.arcology.builders/", image: "computing.png" },
        { label: "", url: "https://macin.arcology.builders/", image: "research.png" },
        { label: "", url: "/api/allusers", image: "connected.png" },
    ];

    const [showImageModal, setShowImageModal] = React.useState(false);
    const imageUrl = "/E-Mug-shot.jpg";

    const openImageModal = () => {
        setShowImageModal(true);
    };

    return (
        <div className="flex" style={{
            backgroundImage: 'url("/subtle-background.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <div className="flex-3" style={{ width: '100%' }}>
                <div className="menu">
                    <div>
                        <h2 className="text-6xl font-bold py-4 px-36 text-center">Channels</h2>
                    </div>
                    <div className="flex-1 flex justify-center pb-4">
                        <img
                            src="https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/at-t-the-first-banner-1994.png"
                            alt="The first web banner AT&amp;T 1994" title="The first web banner AT&amp;T 1994"
                        />
                    </div>
                    <div className="flex flex-wrap items-center">
                        {menuItems.map((item, index) => (
                            <div key={index} className="w-1/2 pr-8 pb-8 relative">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <div
                                        className="bg-bargray hover:bg-panelgray border-black border-2 text-white font-bold py-4 m-2 w-full"
                                        style={{
                                            height: "50px",
                                            boxShadow: "30px 35px 60px -15px rgba(0, 0, 0, 0.9)",
                                            backgroundImage: `url(/${item.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    >
                                        {item.label}
                                    </div>
                                </a>
                            </div>

                        ))}
                        <div
                            className="bannerAd flex items-center justify-center w-full h-full pb-6">
                            <a>
                                <img className="border border-black"
                                    src="https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/macromedia-flash-3-1998.gif"
                                    alt="Macromedia Flash 3.0 1998" title="Macromedia Flash 3.0 1998"
                                />
                            </a>
                        </div>

                    </div>
                    <div className="flex-1 flex justify-end pr-8 pb-4">
                        <div className="pr-4">
                            <img
                                src="https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/get-flash-player-1996.gif"
                                alt="Get Flash Player banner 1996" title="Get Flash Player 1996"/>
                        </div>
                        <div className="pr-4">
                            <img
                                src="https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/netscape-1995.gif"
                                alt="Netscape banner 1995"
                                title="Netscape 1995"
                            />
                        </div>
                        <div>
                            <div className="pr-4" onClick={openImageModal}>
                                <img
                                    src="https://www.webdesignmuseum.org/uploaded/exhibitions/web-banners-in-the-90s/internet-explorer-1996.gif"
                                    alt="Internet Explorer banner 1996"
                                    title="Internet Explorer 1996"
                                />
                            </div>
                            <ImageModal
                                isOpen={showImageModal}
                                onRequestClose={() => setShowImageModal(false)}
                                contentLabel={"Mug shot"}
                                imageUrl={imageUrl}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FullMenu = () => {
    return (
        <Desktop content={<Window content={<Page/>}/>}/>
    )
}

export default FullMenu;