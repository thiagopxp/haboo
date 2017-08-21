import { config } from '../config';
import HabooSdk from '@haboo/haboo-sdk';

export default new HabooSdk(config.apiUrl, config.publicKey);