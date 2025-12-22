import tw from '@/src/lib/tailwind';
import React from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const getFormattedDate = (date: Date) => {
    return date.toISOString().split('T')[0];
};

// ✅ Mocked completed task dates from "database"
const completedDatesFromDB = [
    '2025-07-10',
    '2025-07-12',
    '2025-07-15',
    '2025-07-20'
];

const generateMarkedDates = (completedDates: string[]) => {
    const markedDates: any = {};

    // ✅ Loop over the completed dates and mark them red
    completedDates.forEach((dateStr) => {
        markedDates[dateStr] = {
            customStyles: {
                container: {
                    backgroundColor: '#D6DF22', // red background
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: '#D6DF22',
                },
                text: {
                    color: '#fff',
                    fontWeight: 'bold',
                },
            },
        };
    });

    // ✅ Mark today with yellow (optional)
    const today = getFormattedDate(new Date());
    if (!markedDates[today]) {
        markedDates[today] = {
            customStyles: {
                container: {
                    backgroundColor: '#D6DF22',
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: '#FCFCFC',
                },
                text: {
                    color: '#FCFCFC',
                    fontWeight: 'bold',
                },

            },
        };
    }

    return markedDates;
};

const CalendarView = () => {
    const markedDates = generateMarkedDates(completedDatesFromDB);

    return (
        <View >
            <View>
                <Text style={tw`text-lg  font-montserrat-700 text-blackText mb-4 text-center`}>
                    My Numbers
                </Text>
                <Text style={tw`text-lg font-montserrat-600 text-blackText mb-4`}>
                    Total Workout <Text style={tw`font-montserrat-700 text-yellowGreen`}>{new Date().getDate()}</Text>
                </Text>
            </View>

            <Calendar
                onDayPress={(day) => {
                    // console.log('Selected day:', day.dateString);
                }}
                style={{
                    backgroundColor: '#FCFCFC'

                }}
                markedDates={markedDates}
                markingType={'custom'}
                hideExtraDays={true}
                enableSwipeMonths={true}
                theme={{
                    calendarBackground: '#FCFCFC',
                    textSectionTitleColor: '#3E3E3F',
                    dayTextColor: '#3E3E3F',
                    textDisabledColor: '#BCBDC0',
                    arrowColor: '#D6DF22',
                }}
            />
        </View>
    );
};

export default CalendarView;
