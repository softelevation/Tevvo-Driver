import {Platform} from 'react-native';
import {hp, wp} from '../responsive';

export const title = 18;
export const header = 16;
export const body = 14;
export const caption = 12;
export const h1 = 26;
export const h2 = 20;
export const h3 = 18;

export const t1 = hp(1);
export const t2 = hp(2);
export const t3 = hp(3);
export const t4 = hp(4);
export const t5 = hp(5);
export const t6 = hp(6);
export const w1 = wp(1);
export const w2 = wp(2);
export const w3 = wp(3);
export const w4 = wp(4);
export const w5 = wp(5);
export const w6 = wp(6);

export const Bold = Platform.OS === 'ios' ? 'Roboto-Bold' : 'Roboto-Bold';
export const Regular =
  Platform.OS === 'ios' ? 'Roboto-Regular' : 'Roboto-Regular';
export const Medium = Platform.OS === 'ios' ? 'Roboto-Medium' : 'Roboto-Medium';
export const Thin = Platform.OS === 'ios' ? 'Roboto-Thin' : 'Roboto-Thin';
export const Light = Platform.OS === 'ios' ? 'Roboto-Light' : 'Roboto-Light';
