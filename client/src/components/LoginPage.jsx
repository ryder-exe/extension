import img from '../../public/icon.png';
import { auth, provider } from "../auth/AuthConfig.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('User info:', result.user);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error during login:", error.message);
        }
    };

    return (
        <>
            <div className="w-screen h-[100vh] flex items-end justify-center bg-black text-white">
                <div className="w-[100%] h-[20vh] bg-blue-500 blur-[200px]"></div>
            </div>
            <div className="w-[100%] absolute top-[30vh] flex flex-col justify-center items-center">
                <div className={`flex`}>
                    <img src={img} className={`w-[50px] mr-5`} />
                    <div className="text-white text-2xl font-bold mb-4">YOUTUBE CAPTION SUMMARIZER</div>
                </div>
                <button
                    onClick={handleGoogleLogin}
                    className="rounded-full bg-blue-500 text-white px-6 py-3 mt-[5vh] text-lg font-medium shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Login with Google
                </button>
            </div>
        </>
    );
}
