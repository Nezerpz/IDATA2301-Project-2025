import { createContext } from 'react';

const today = new Date();
const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(today.getDate() + 7);

export const defaultTimespan = {
    dateFrom: today.toISOString().split('T')[0],
    dateTo: oneWeekFromNow.toISOString().split('T')[0],
    timeFrom: '08:00',
    timeTo: '17:00',
};

export const CarContext = createContext([defaultTimespan, () => {}]);