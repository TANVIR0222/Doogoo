import { useCheckPremiumUserQuery } from '../redux/advanceFeaturesApi/advanceFeaturesApi';


export const usePlanFeatures = () => {
    // 1. Destructure the query results
    const { data: responseData, isLoading, refetch, error } = useCheckPremiumUserQuery();
    const featuresList = responseData?.data?.current_plan?.features || [];
    const unlimitedHabits = featuresList.filter((item: string) => item === 'Unlimited habits tracking');
    const unlimitedHabitsTracking = featuresList.filter((item: string) => item === 'Creating a challenge group');
    const unlimitedSayNo = featuresList.filter((item: string) => item === 'Unlimited Say No');
    const advancedGraph = featuresList.filter((item: string) => item === 'Advanced graphical analytics');
    const rewardRedemption = featuresList.filter((item: string) => item === 'Reward redemption by point');
    const rewardRedemptionPremium = rewardRedemption?.includes("Reward redemption by point")
    const advancedAnalytics = advancedGraph?.includes("Advanced graphical analytics")

    // console.log('------------------', rewardRedemptionPremium);






    return {
        features: featuresList, // The array of features
        isLoading,
        error,
        refetch,
        unlimitedHabits,
        unlimitedHabitsTracking,
        unlimitedSayNo,
        advancedAnalytics,
        rewardRedemptionPremium
    };
}

