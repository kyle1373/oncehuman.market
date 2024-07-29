import { useEffect } from "react";

const useOnlineLogging = () => {
  useEffect(() => {
    let lastLoggedTime = Date.now();

    const logStatus = async () => {
      const currentTime = Date.now();

      try {
        console.log(document.visibilityState);
        console.log(currentTime - lastLoggedTime);
        if (
          document.visibilityState !== "visible" ||
          currentTime - lastLoggedTime < 50000
        ) {
          return;
        }
        const response = await fetch("/api/log_status");

        if (!response.ok) {
          throw new Error("Failed to log status");
        }

        lastLoggedTime = Date.now();
      } catch (error) {
        console.error("Error logging status:", error);
      }
    };

    const handleVisibilityChange = () => {
      logStatus();
    };

    const intervalId = setInterval(() => {
      logStatus();
    }, 60000); // 60000ms = 1 minute

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup interval and event listener on component unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};

export default useOnlineLogging;
