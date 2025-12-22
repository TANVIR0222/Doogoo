import * as Network from "expo-network";
import { useEffect, useState } from "react";

export default function useNetworkStatus() {
    const [isConnected, setIsConnected] = useState<boolean | undefined>(true);

    const checkNetwork = async () => {
        const status = await Network.getNetworkStateAsync();
        setIsConnected(status.isConnected && status.isInternetReachable);
    };

    useEffect(() => {
        checkNetwork();

        const interval = setInterval(() => {
            checkNetwork();
        }, 3000); // প্রতি ৩ সেকেন্ডে check

        return () => clearInterval(interval);
    }, []);

    return isConnected;
}
