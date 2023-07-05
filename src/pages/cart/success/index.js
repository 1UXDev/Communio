import { useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "@/db/globalstore";
import useSWR, { mutate } from "swr";

const Success = () => {
  const router = useRouter();

  const { data: productCounter } = useSWR("/api/users/productCounter");

  const setGlobalProductCounter = useStore(
    (state) => state.setGlobalProductCounter
  );

  useEffect(() => {
    if (setGlobalProductCounter) {
      setGlobalProductCounter([]);
    }

    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 10000);

    mutate("/api/users/productCounter", []);

    return () => clearTimeout(redirectTimer);
  }, [router, setGlobalProductCounter]);

  return (
    <div className="container">
      <div className="message">Success! Thank you for donating ❤️ </div>
      <p>Redirecting you to the homepage...</p>
      <style jsx>{`
        .container {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .message {
          font-size: 24px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Success;
