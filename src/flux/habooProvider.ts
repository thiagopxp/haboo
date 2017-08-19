import { config } from '../config/config.dev';
import HabooSdk from '@haboo/haboo-sdk';

export default new HabooSdk(config.apiUrl, config.publicKey);