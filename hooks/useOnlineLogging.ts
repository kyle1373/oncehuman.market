import { useEffect } from "react";

const activateOnlineLogging = () => {
  useEffect(() => {
    let lastLoggedTime = Date.now();
    let isFirstTime = true

    const logStatus = async () => {
      const currentTime = Date.now();

      try {
        console.log(document.visibilityState);
        console.log(currentTime - lastLoggedTime);
        if (
          !isFirstTime && (document.visibilityState !== "visible" ||
          currentTime - lastLoggedTime < 50000)
        ) {
          return;
        }
        isFirstTime = false
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

    // Log status immediately on mount
    logStatus();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup interval and event listener on component unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};

export default activateOnlineLogging;
