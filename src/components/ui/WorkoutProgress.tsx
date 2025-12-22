// import tw from '@/src/lib/tailwind';
// import { useGetAllhabitsCalanderQuery } from '@/src/redux/advanceFeaturesApi/advanceFeaturesApi';
// import React from 'react';
// import { Text, View } from 'react-native';

// interface ProgressItem {
//     label: string;
//     value: number;
//     color: string;
// }

// const progressData: { color: string }[] = [
//     { color: 'green-500' },
//     { color: 'orange-400' },
//     { color: 'sky-400' },
//     { color: 'pink-400' },
//     { color: 'gray' },
// ];

// const WorkoutProgress = () => {
//     const { data, refetch } = useGetAllhabitsCalanderQuery();
//     console.log(data?.data?.total_workout);

//     const progressWidth = Math.min((data?.data?.total_workout || 0) * 10, 100); // Assuming max 10 workouts for full bar


//     return (
//         <View style={tw``}>
//             {/* Header */}
//             <Text style={tw`text-lg font-montserrat-600 text-blackText mb-3`}>
//                 Total Workout <Text style={tw`font-montserrat-700 text-yellowGreen`}>{data?.data?.total_workout}</Text>
//             </Text>

//             {/* Progress Bar */}
//             <View style={tw`flex-row h-3 rounded  overflow-hidden mb-4`}>
//                 {/* {progressData.map((item, index) => (
//                     <View
//                         key={`progress-${index}`}
//                         style={[
//                             { width: `${(data?.data?.total_workout ) * 100}%` },
//                             tw`h-full`,
//                             { backgroundColor: tw.color(item.color) }
//                         ]}
//                     />
//                 ))} */}
//                 <View
//                     style={[
//                         { width: `${progressWidth}%` },
//                         tw`h-full rounded-full`,
//                         { backgroundColor: tw.color('green-500') },
//                     ]}
//                 />

//             </View>

//             {/* Labels */}
//             <View style={tw``}>
//                 {data?.data?.result?.map((item, index) => (
//                     <View
//                         key={`label-${index}`}
//                         style={tw`flex-row items-center gap-3 justify-between`}
//                     >
//                         <View style={tw`flex-row items-center mb-2`}>
//                             {/* Colored Dot */}
//                             <View
//                                 style={[
//                                     tw`w-2.5 h-2.5 rounded-full mr-2.5`,
//                                     { backgroundColor: tw.color(progressData[index % progressData.length].color) }
//                                 ]}
//                             />
//                             <Text style={tw`text-sm text-blackText`}>{item?.habit_name}</Text>
//                         </View>

//                         <Text style={[tw`text-sm font-montserrat-500`, { color: tw.color(progressData[index % progressData.length].color) }]}>
//                             {item?.total_complete_count}
//                         </Text>
//                     </View>
//                 ))}

//             </View>
//         </View>
//     );
// };

// export default WorkoutProgress;


import tw from '@/src/lib/tailwind';
import { useGetAllhabitsCalanderQuery } from '@/src/redux/advanceFeaturesApi/advanceFeaturesApi';
import React from 'react';
import { Text, View } from 'react-native';

const progressColors = ['green-500', 'orange-400', 'sky-400', 'pink-400', 'gray'];

const progressData: { color: string }[] = [
    { color: 'green-500' },
    { color: 'orange-400' },
    { color: 'sky-400' },
    { color: 'pink-400' },
    { color: 'gray' },
];

const WorkoutProgress = () => {
    const { data } = useGetAllhabitsCalanderQuery();

    const totalWorkout = Number(data?.data?.total_workout || 0);
    const maxWorkout = 100;


    return (
        <View style={tw``}>
            {/* Header */}
            <Text style={tw`text-lg font-montserrat-600 text-blackText mb-3`}>
                Total Workout{' '}
                <Text style={tw`font-montserrat-700 text-yellowGreen`}>
                    {totalWorkout}
                </Text>
            </Text>

            {/* Progress Bar */}
            <View style={tw`flex-row h-3 rounded overflow-hidden mb-4 bg-[#E5E7EB]`}>
                {data?.data?.result?.map((habit, index) => {
                    const totalComplete = habit.total_complete_count;
                    const progressWidth = Math.min((totalComplete / maxWorkout) * 100, 100);
                    const color = progressColors[index % progressColors.length];

                    return (
                        <View
                            key={`progress-${index}`}
                            style={[
                                { width: `${progressWidth}%` }, // habit অনুযায়ী width
                                tw`h-full`,
                                { backgroundColor: tw.color(color) },
                            ]}
                        />
                    );
                })}
            </View>



            {/* Habit Labels */}
            <View>
                {data?.data?.result?.map((item, index) => {
                    const color = progressData[index % progressData.length].color;

                    return (
                        <View
                            key={`label-${index}`}
                            style={tw`flex-row items-center gap-3 justify-between mb-2`}
                        >
                            <View style={tw`flex-row items-center`}>
                                {/* Colored Dot */}
                                <View
                                    style={[
                                        tw`w-2.5 h-2.5 rounded-full mr-2.5`,
                                        { backgroundColor: tw.color(color) },
                                    ]}
                                />
                                <Text style={tw`text-sm text-blackText`}>
                                    {item?.habit_name}
                                </Text>
                            </View>

                            {/* Total Completed Count */}
                            <Text
                                style={[
                                    tw`text-sm font-montserrat-500`,
                                    { color: tw.color(color) },
                                ]}
                            >
                                {item?.total_complete_count}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default WorkoutProgress;
