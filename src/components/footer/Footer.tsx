import {GithubLogoIcon} from "@phosphor-icons/react";
import logo from "../../assets/commit8logo.png";
import type { ReactNode } from "react";

function Footer() {
    const data = new Date().getFullYear();

    const component: ReactNode = (
        <footer
            className="w-full bg-[linear-gradient(135deg,#333333_20%,#4F4F4F_60%,#6D6D6D_100%)] text-white text-sm py-3"
        >
            <div className="max-w-full mx-auto flex items-center justify-between px-6 my-1" >
                {/* "max-w-full mx-auto flex items-center justify-between px-6" */}
                <div className="flex items-center gap-4">
                    <img
                        src={logo}
                        alt="Logo Commit8"
                        className="w-9 h-9 object-contain"
                    />
                    <p className="font-bold text-base bg-linear-to-r">
                        UpBody | &copy; Commit8 {data}
                    </p>
                    
                </div>
                <div className="flex items-center gap-4 ">
                    <p className="font-bold text-base ">Venha nos conhecer</p>

                    <a
                        href="https://github.com/Commit8"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GithubLogoIcon
                            size={24}
                            weight="bold"
                            className="transition-transform duration-300 hover:scale-125"
                        />
                    </a>                    
                </div>
            </div>
        </footer>
    );

    return <>{component}</>;
}

export default Footer;