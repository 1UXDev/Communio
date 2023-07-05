import { useEffect } from "react";
import { useRouter } from "next/router";

const Cancel = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/cart");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="container">
      <div className="message">That did not work, taking you back</div>
      <style jsx>{`
        .container {
          display: flex;
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

export default Cancel;
