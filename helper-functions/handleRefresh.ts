interface HandleRefreshHelperProps {
    setRefreshing: (value: boolean) => void;
    fetchFunction: () => Promise<void>;
    delay?: number;
}

export const handleRefreshHelper = async ({
    setRefreshing,
    fetchFunction,
    delay = 2000,
}: HandleRefreshHelperProps) => {
    console.log("refreshing data...");
    setRefreshing(true);
    try {
        await fetchFunction();
    } catch (error) {
        console.error("Error during refresh: ", error);
    } finally {
        setTimeout(() => {
            setRefreshing(false);
        }, delay);
    }
};
