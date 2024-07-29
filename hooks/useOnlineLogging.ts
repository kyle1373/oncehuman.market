import { useEffect } from "react";

const useOnlineLogging = () => {
  useEffect(() => {
    const logStatus = async () => {
      try {
        const response = await fetch("/api/log_status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to log status");
        }
      } catch (error) {
        console.error("Error logging status:", error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        logStatus();
      }
    };

    const intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        logStatus();
      }
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
